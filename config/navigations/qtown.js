'use strict';

module.exports = {
    "url": "http://qtown.corp.qunar.com/api/online/list?pageNo=1&pageSize=10000",
    "exec": ($, body) => {
        let results = {};
        JSON.parse(body).data.list.forEach((item) => {
            results['http://qtown.corp.qunar.com/online/detail.html?courseId=' + item.courseId] = '大讲堂 - ' + item.courseName;
        });
        return results;
    }
};
