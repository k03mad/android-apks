import * as cheerio from 'cheerio';

/**
 * @param {string} html
 * @param {string} selector
 */
export const getAllLinksFromSelector = (html, selector) => {
    const $ = cheerio.load(html);

    const hrefsElem = $(selector)
        .find('a')
        .map((i, el) => $(el).attr('href'));

    return [...new Set(hrefsElem)];
};
