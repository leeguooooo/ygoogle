'use strict';

module.exports = {
    "url": "https://github.com/doyoe/html-css-guide",
    "exec": ($) => {
        let results = {};
        $('ol a').each((i, item) => {
            results['https://github.com/doyoe/html-css-guide' + $(item).attr('href')] = 'HTML/CSS 开发规范指南 - ' + $(item).text();
        });
        return results;
    }
};
