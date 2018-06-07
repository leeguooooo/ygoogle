'use strict';

module.exports = [{
    "url": "http://cm.corp.qunar.com/",
    "exec": ($) => {
        let results = {};
        $('a.website').each((i, item) => {
            results[$(item).attr('href')] = $(item).text();
        });
        return results;
    }
}, {
    "url": "http://it.corp.qunar.com/itworkstation/it/mainindex.html",
    "exec": ($) => {
        let results = {};
        $($('#centerWrapper')[0]).find('.tile.tileFlip').each((i, item) => {
            results[$(item).attr('href')] = $(item).find('h4').text();
        });
        return results;
    }
}];
