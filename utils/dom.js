import {JSDOM} from 'jsdom';

/**
 * @param {string} body
 * @param {string} selector
 * @param {Function} filterFn
 */
export const getSelectorHrefs = (body, selector, filterFn = () => true) => {
    const dom = new JSDOM(body);

    const hrefs = [...dom.window.document.querySelectorAll(selector)]
        .filter(filterFn)
        .map(elem => elem.getAttribute('href'))
        .filter(Boolean);

    return [...new Set(hrefs)];
};
