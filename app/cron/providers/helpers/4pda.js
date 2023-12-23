import env from '../../../../env.js';
import {getAllLinksFromSelector} from '../../../../utils/cheerio.js';
import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

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
const getTopic = topicId => req(urls.topic(topicId));

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
});

/**
 * @param {Array<{name: string, showtopic: number, re: {include: RegExp, exclude: RegExp}}>} apps
 */
export const getApkFrom4Pda = async apps => {
    const links = await Promise.all(apps.map(async ({name, re, showtopic}) => {
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
                const {body: postBody} = await getTopicPost(showtopic, postId);

                const postLinks = getAllLinksFromSelector(postBody, selectors.post.byId(postId));

                let filteredLinks = postLinks.filter(elem => elem.endsWith('.apk'));

                if (filteredLinks.length > 0) {
                    if (re?.include) {
                        filteredLinks = filteredLinks.filter(elem => re.include.test(elem));
                    }

                    if (re?.exclude) {
                        filteredLinks = filteredLinks.filter(elem => !re.exclude.test(elem));
                    }

                    return filteredLinks.map(link => ({
                        link,
                        homepage: urls.topic(showtopic),
                        opts: {
                            header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                            ua: 'mobile',
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
