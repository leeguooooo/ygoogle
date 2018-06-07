'use strict';
console.log('=> 搜索数据写入脚本执行。');
const fs = require('fs');
const path = require('path');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');
const colors = require('colors');
const URL = require('url');
const xml2js = require('xml2js');

const config = require('./config.js');

const fetch = (url, cb) => {
    request(url, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            cb(body);
        } else {
            console.log(`X Fetch ${url} Error!`.red);
            cb(null);
        }
    });
};

let results = {};

// Docs

let fetchDoc = (url, cb) => {
    if (url[url.length - 1] === '/') {
        url += 'index.html';
    }
    if (results[url]) {
        cb();
        return;
    }
    fetch(url , (body) => {
        let links = [];
        if (body) {
            let $ = cheerio.load(body),
                title = $('title').text();
            if (!results[url]) {
                results[url] = title;
            }
            $('.ydoc-nav li a').each((i, item) => {
                let text = $(item).text(),
                    target = $(item).attr('target'),
                    href = URL.resolve(url, $(item).attr('href'));
                if (target !== '_blank') {
                    links.push(href);
                }
            });
            $('.content-left li a').each((i, item) => {
                let text = $(item).text(),
                    href = $(item).attr('href');
                if (href[0] === '#') {
                    if (!results[url + href]) {
                        results[url + href] = `${title} - ${text}`;
                    }
                } else {
                    href = URL.resolve(url, href);
                    if (!results[href]) {
                        results[href] = `${title} - ${text}`;
                    }
                }
            });
            fetchDocs(links, cb);
        } else {
            cb();
        }
    });
};

let fetchDocs = (docs, cb) => {
    async.eachSeries(docs, fetchDoc, cb);
};

// Blogs
let fetchBlog = (url, cb) => {
    fetch(URL.resolve(url, 'sitemap.xml'), (body) => {
        if (body) {
            xml2js.parseString(body, (err, result) => {
                if (err) {
                    cb();
                } else {
                    let links = [];
                    result.urlset.url.forEach((item) => {
                        let loc = item.loc[0];
                        // if (loc.indexOf('20') > -1) {
                            links.push(loc);
                        // }
                    });
                    async.eachSeries(links, (url, cb) => {
                        fetch(url, (body) => {
                            if (body) {
                                let $ = cheerio.load(body);
                                if (!results[url]) {
                                    results[url] = $('title').text();
                                }
                            }
                            cb();
                        })
                    }, cb);
                }
            })
        } else {
            cb();
        }
    });
}

let fetchBlogs = (blogs, cb) => {
    async.eachSeries(blogs, fetchBlog, cb);
};

// Navigations

let fetchNav = (nav, cb) => {
    fetch(nav.url, (body) => {
        if (body) {
            let ret = nav.exec(cheerio.load(body), body);
            Object.keys(ret).forEach((url) => {
                if (!results[url] && url.indexOf('//') > -1){
                    results[url] = ret[url];
                }
            });
        }
        cb();
    });
};

let fetchNavs = (navigations, cb) => {
    async.eachSeries(navigations, fetchNav, cb);
};

// Queue
async.series([
    (cb) => fetchDocs(config.docs, cb),
    (cb) => fetchBlogs(config.blogs, cb),
    (cb) => fetchNavs(config.navigations, cb),
    (cb) => {
        config.sites.forEach((item) => {
            if (!results[item.url]) {
                results[item.url] = item.title;
            }
        });
        cb();
    }
], () => {
    let searchData = [];
    Object.keys(results).forEach((key) => {
        searchData.push({
            title: results[key],
            url: key
        });
    });
    fs.writeFileSync(path.join(__dirname, '../../MyPage/statics/data.js'), 'var searchData = ' + JSON.stringify(searchData) + ';', 'UTF-8');
    fs.writeFileSync(path.join(__dirname, '../public/data.json'), JSON.stringify(searchData), 'UTF-8');
    console.log('=> 脚本执行完毕。');
});
