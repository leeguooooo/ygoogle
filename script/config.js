'use strict';

const fs = require('fs');
const path = require('path');

const mergeConfig = (key) => {
    let configPath = path.join(__dirname, '../config', key);
    return fs.readdirSync(configPath).reduce((ret, item) => {
        return ret.concat(require(path.join(configPath, item)));
    }, []);
};

module.exports = {
    "docs": require('../config/docs.js'),
    "blogs": require('../config/blogs.js'),
    // "navigations": mergeConfig('navigations'),
    "sites": mergeConfig('sites')
};
