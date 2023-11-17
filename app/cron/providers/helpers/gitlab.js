import {getReleases, urls} from '../../../../utils/gitlab.js';

const APPS_FILTER_DEFAULT_RE = /\((.+\.apk)\)/;

/**
 * @param {Array<{name: string, re: {include: RegExp, exclude: RegExp}}>} repos
 * @returns {Promise<Array<{link: string, homepage: string}>>}
 */
export const getApkFromGlRepos = async repos => {
    const links = await Promise.all(repos.flat().map(async ({name, re}) => {
        const {body} = await getReleases(name);

        let apkUrls = body?.[0]?.description?.split('\n')
            .filter(elem => APPS_FILTER_DEFAULT_RE.test(elem))
            .map(elem => `${urls.web}/${name}${elem.match(APPS_FILTER_DEFAULT_RE)[1]}`);

        if (apkUrls.length > 1) {
            if (re?.include) {
                const reIncludeFiltered = apkUrls.filter(elem => re.include.test(elem));

                if (reIncludeFiltered.length > 0) {
                    apkUrls = reIncludeFiltered;
                }
            }

            if (re?.exclude) {
                const reExcludeFiltered = apkUrls.filter(elem => !re.exclude.test(elem));

                if (reExcludeFiltered.length > 0) {
                    apkUrls = reExcludeFiltered;
                }
            }
        }

        return apkUrls.map(link => ({link, homepage: `${urls.web}/${name}`}));
    }));

    return links.flat().filter(elem => elem.link);
};
