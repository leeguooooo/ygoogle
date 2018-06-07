'use strict';

module.exports = {
    "url": "http://caniuse.com/#index",
    "exec": ($) => {
        let results = {};
        $('.ciu-panel-wrap a').each((i, item) => {
            let href = $(item).attr('href');
            results['http://caniuse.com' + (href[0] == '/' ? href : '/#feat=' + href)] = 'Can I Use - ' + $(item).text();
        });
        return results;
    }
};
