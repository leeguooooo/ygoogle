#!/usr/bin/bash

cd $(cd `dirname $0`; pwd)

echo "【YGoogle Fetch】"

if [ ! -d "node_modules" ]; then
  npm install --registry=http://npmrepo.corp.qunar.com > /dev/nul
fi

node script/fetch.js

git status

# git commit -a -m 'crontab: 定时更新数据' > /dev/null

# git push > /dev/null
