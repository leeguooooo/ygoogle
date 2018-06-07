'use strict';

module.exports = {
    "url": "http://platform.qunar.com/static/html/index.html",
    "exec": ($) => {
        let results = {};
        $('#productsModal a').each((i, item) => {
            if ($(item).text() !== '热更新') {
                results['http://platform.qunar.com' + $(item).attr('href')] = '开放平台 - ' + $(item).text();
            }
        });
        return results;
    }
};
