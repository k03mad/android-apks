import env from '../../../../env.js';
import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

const POST_LINK_RE = /[^"]+p=\d+/g;
const POST_ID_RE = /post\/(\d+)\//;
const DOWNLOAD_APK_LINK_RE = /[^"]+apk/g;

const MAX_POSTS_PARSE = 5;

const urls = {
    web: 'https://4pda.to/forum/index.php',
    dl: 'https://4pda.to/forum/dl/post/',
};

/**
 * @param {string|number} id
 * @returns {Promise<object>}
 */
const getTopic = id => req(urls.web, {
    searchParams: {
        showtopic: id,
    },
});

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
            const {body: topicBody} = await getTopic(topicId);

            const postsLinks = topicBody
                ?.match(POST_LINK_RE)
                ?.filter(elem => elem.includes(topicId))
                ?.sort((a, b) => b.split('=').at(-1) - a.split('=').at(-1))
                || [];

            const apkLinks = new Set();

            for (let i = 0; i < postsLinks.length && i < MAX_POSTS_PARSE; i++) {
                const postId = postsLinks[i].split('=').at(-1);
                const {body: postBody} = await getTopicPost(topicId, postId);

                const apkLink = postBody
                    ?.match(DOWNLOAD_APK_LINK_RE)
                    ?.filter(elem => elem.includes(urls.dl))
                    ?.at(-1);

                if (apkLink) {
                    apkLinks.add(apkLink);
                }
            }

            if (apkLinks.size > 0) {
                const apkLink = [...apkLinks]
                    .sort((a, b) => b.match(POST_ID_RE)?.[1] - a.match(POST_ID_RE)?.[1])[0];

                return {
                    link: apkLink,
                    homepage: `${urls.web}?showtopic=${topicId}`,
                    opts: {
                        header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                        ua: 'mobile',
                    },
                };
            }
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem.link);
};
