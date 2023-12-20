import env from '../../../../env.js';
import {logError} from '../../../../utils/logs.js';
import {req} from '../../../../utils/request.js';

const POST_LINK_RE = /[^"]+p=\d+/g;
const DOWNLOAD_APK_LINK_RE = /[^"]+apk/g;

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

            for (const link of postsLinks) {
                const postId = link.split('=').at(-1);
                const {body: postBody} = await getTopicPost(topicId, postId);

                const apkLink = postBody
                    ?.match(DOWNLOAD_APK_LINK_RE)
                    ?.filter(elem => elem.includes(urls.dl))
                    ?.at(-1);

                if (apkLink) {
                    return {
                        link: apkLink,
                        homepage: `${urls.web}?showtopic=${topicId}`,
                        opts: {
                            header: `Cookie: member_id=${env['4pda'].memberId}; pass_hash=${env['4pda'].passHash}`,
                            ua: 'mobile',
                        },
                    };
                }
            }
        } catch (err) {
            logError(err);
        }
    }));

    return links.filter(elem => elem.link);
};
