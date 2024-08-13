import {logError} from '@k03mad/simple-log';

import env from '../../../../env.js';
import {getSelectorHrefs} from '../../../../utils/dom.js';
import {getUa, req} from '../../../../utils/request.js';

const UA = 'mobile';

const reqOpts = async () => ({
    headers: {
        'user-agent': await getUa(UA),
    },
    rps: 2,
});

const urls = {
    web: 'https://4pda.to/forum/index.php',
    dl: 'https://4pda.to/forum/dl/post/',
    topic: topicId => `${urls.web}?showtopic=${topicId}`,
};

const selectors = {
    post: {
        main: '[data-post] a',
        byId: postId => `[data-post="${postId}"] a`,
    },
};

/**
 * @param {string|number} topicId
 * @returns {Promise<object>}
 */
const getTopic = async topicId => {
    const opts = await reqOpts();

    return req(urls.topic(topicId), {
        headers: opts.headers,
    }, {
        rps: opts.rps,
    });
};

/**
 * @param {string|number} topicId
 * @param {string|number} postId
 * @returns {Promise<object>}
 */
const getTopicPost = async (topicId, postId) => {
    const opts = await reqOpts();

    return req(urls.web, {
        searchParams: {
            showtopic: topicId,
            view: 'findpost',
            p: postId,
        },
        headers: opts.headers,
    }, {
        rps: opts.rps,
    });
};

/**
 * @param {Array<{
 * name: string,
 * showtopic: number,
 * filter: {file: boolean, include: RegExp, exclude: RegExp}
 * opts: {ua: string, proxy: boolean, semVerRemovePatch: boolean}
 * }>} apps
 */
export const getApkFrom4Pda = async apps => {
    const links = await Promise.all(apps.map(async ({name, filter, showtopic, opts = {}}) => {
        try {
            // забираем все ссылки на другие посты из шапки темы
            // часть из них — на посты со скачиванием версии приложения
            const {body: topicBody} = await getTopic(showtopic);

            // сортируем по айдишнику поста — выше айдишник больше, значит пост свежее
            const postsLinks = getSelectorHrefs(topicBody, selectors.post.main)
                .filter(elem => elem.includes(showtopic))
                .sort((a, b) => b.split('=').at(-1) - a.split('=').at(-1))
                || [];

            // идём по каждой сохраненной ссылке на пост, начиная с самой свежей
            // если там есть ссылка на скачивание apk, возвращаем её
            for (const postsLink of postsLinks) {
                const postId = postsLink.split('=').at(-1);
                const {url, body: postBody} = await getTopicPost(showtopic, postId);

                let apkLinks = getSelectorHrefs(postBody, selectors.post.byId(postId))
                    .filter(elem => elem.endsWith('.apk'));

                if (filter?.include) {
                    apkLinks = apkLinks.filter(elem => filter.file
                        ? filter.include.test(elem.split('/').at(-1))
                        : filter.include.test(elem),
                    );
                }

                if (filter?.exclude) {
                    apkLinks = apkLinks.filter(elem => filter.file
                        ? !filter.exclude.test(elem.split('/').at(-1))
                        : !filter.exclude.test(elem),
                    );
                }

                if (apkLinks.length > 0) {
                    return apkLinks.map(link => ({
                        link,
                        homepage: url,
                        opts: {
                            header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                            ua: UA,
                            ...opts,
                        },
                    }));
                }
            }

            throw new Error(`[4PDA] No apk link found\n${name} ${urls.topic(showtopic)}`);
        } catch (err) {
            logError(err);
        }
    }));

    return links.flat().filter(elem => elem?.link);
};
