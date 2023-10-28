import _ from 'lodash';

const uaChromeVersion = () => _.random(100, 120);

const ua = () => ({
    desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
               + 'AppleWebKit/537.36 (KHTML, like Gecko) '
               + `Chrome/${uaChromeVersion()}.0.0.0 Safari/537.36`,

    mobile: 'Mozilla/5.0 (Linux; Android 10; K) '
              + 'AppleWebKit/537.36 (KHTML, like Gecko) '
              + `Chrome/${uaChromeVersion()}.0.0.0 Mobile Safari/537.36`,

    empty: '',
});

/**
 * @param {'desktop'|'mobile'|'empty'} type
 */
export const getUa = (type = 'mobile') => ua()[type];
