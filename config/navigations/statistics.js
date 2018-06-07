'use strict';

module.exports = [{
    "url": "http://ystats.corp.qunar.com/statistics/equipment/os",
    "exec": ($) => {
        let results = {};
        $('.statistics-subnav a').each((i, item) => {
            results['http://ystats.corp.qunar.com' + $(item).attr('href')] = 'YStats 终端统计 - ' + $(item).text();
        });
        return results;
    }
}, {
    "url": "http://ystats.corp.qunar.com/statistics/projects/build",
    "exec": ($) => {
        let results = {};
        $('.statistics-subnav a').each((i, item) => {
            results['http://ystats.corp.qunar.com' + $(item).attr('href')] = 'YStats 项目统计 - ' + $(item).text();
        });
        return results;
    }
}];
