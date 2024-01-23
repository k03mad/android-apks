import {logError} from '@k03mad/simple-log';

import env from '../../../../env.js';
import {getAllLinksFromSelector} from '../../../../utils/cheerio.js';
import {getUa, req} from '../../../../utils/request.js';

const UA = 'mobile';

const reqOpts = {
    headers: {
        'user-agent': getUa(UA),
    },
    rps: 2,
};

const urls = {
    web: 'https://4pda.to/forum/index.php',
    dl: 'https://4pda.to/forum/dl/post/',
    topic: topicId => `${urls.web}?showtopic=${topicId}`,
};

const selectors = {
    post: {
        main: '[data-post]',
        byId: postId => `[data-post="${postId}"]`,
    },
};

/**
 * @param {string|number} topicId
 * @returns {Promise<object>}
 */
const getTopic = topicId => req(urls.topic(topicId), {
    headers: reqOpts.headers,
}, {rps: reqOpts.rps});

/**
 * @param {string|number} topicId
 * @param {string|number} postId
 * @returns {Promise<object>}
 */
const getTopicPost = (topicId, postId) => req(urls.web, {
    searchParams: {
        showtopic: topicId,
        view: 'findpost',
        p: postId,
    },
    headers: reqOpts.headers,
}, {rps: reqOpts.rps});

/**
 * @param {Array<{name: string, showtopic: number, filter: {include: RegExp, exclude: RegExp}}>} apps
 */
export const getApkFrom4Pda = async apps => {
    const links = await Promise.all(apps.map(async ({name, filter, showtopic}) => {
        try {
            // забираем все ссылки на другие посты из шапки темы
            // часть из них — на посты со скачиванием версии приложения
            const {body: topicBody} = await getTopic(showtopic);
            const mainPostLinks = getAllLinksFromSelector(topicBody, selectors.post.main);

            // сортируем по айдишнику поста — выше айдишник больше, значит пост свежее
            const postsLinks = mainPostLinks
                .filter(elem => elem.includes(showtopic))
                .sort((a, b) => b.split('=').at(-1) - a.split('=').at(-1))
                || [];

            // идём по каждой сохраненной ссылке на пост, начиная с самой свежей
            // если там есть ссылка на скачивание apk, возвращаем её
            for (const postsLink of postsLinks) {
                const postId = postsLink.split('=').at(-1);
                const {url, body: postBody} = await getTopicPost(showtopic, postId);

                let apkLinks = getAllLinksFromSelector(postBody, selectors.post.byId(postId))
                    .filter(elem => elem.endsWith('.apk'));

                if (filter?.include) {
                    apkLinks = apkLinks.filter(elem => filter.include.test(elem));
                }

                if (filter?.exclude) {
                    apkLinks = apkLinks.filter(elem => !filter.exclude.test(elem));
                }

                if (apkLinks.length > 0) {
                    return apkLinks.map(link => ({
                        link,
                        homepage: url,
                        opts: {
                            header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                            ua: UA,
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
