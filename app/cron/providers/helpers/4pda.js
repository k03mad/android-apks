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

const POST_ID_RE = /post\/(\d+)\//;

const MAX_POSTS_PARSE = 10;

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
 * @param {Array<string|number>} topicIds
 */
export const getApkFromTopicIds = async topicIds => {
    const links = await Promise.all(topicIds.map(async topicId => {
        try {
            // забираем все ссылки на другие посты из шапки темы (часть из них — на посты со скачиванием версии приложения)
            const {body: topicBody} = await getTopic(topicId);
            const mainPostLinks = new Set(getAllLinksFromSelector(topicBody, selectors.post.main));

            // сортируем по айдишнику поста — выше айдишник больше, значит пост новее
            const postsLinks = [...mainPostLinks]
                ?.filter(elem => elem.includes(topicId))
                ?.sort((a, b) => b.split('=').at(-1) - a.split('=').at(-1))
                || [];

            const apkLinks = new Set();

            // идём по каждой ссылке на пост в теме и забираем все ссылки на apk именно из этого поста
            for (let i = 0; i < postsLinks.length && i < MAX_POSTS_PARSE; i++) {
                const postId = postsLinks[i].split('=').at(-1);
                const {body: postBody} = await getTopicPost(topicId, postId);

                const postLinks = new Set(getAllLinksFromSelector(postBody, selectors.post.byId(postId)));

                const apkLink = [...postLinks]
                    ?.filter(elem => elem.endsWith('.apk'))
                    ?.at(-1);

                if (apkLink) {
                    apkLinks.add(apkLink);
                }
            }

            if (apkLinks.size > 0) {
                // сортируем по айдишнику поста в ссылке загрузки и забираем первую ссылку
                // выше айдишник больше, значит ссылка свежее
                const apkLink = [...apkLinks]
                    .sort((a, b) => b.match(POST_ID_RE)?.[1] - a.match(POST_ID_RE)?.[1])[0];

                return {
                    link: apkLink,
                    homepage: urls.topic(topicId),
                    opts: {
                        header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                        ua: 'mobile',
                    },
                };
            }

            throw new Error(`No apk link found\n${urls.topic(topicId)}`);
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem?.link);
};
