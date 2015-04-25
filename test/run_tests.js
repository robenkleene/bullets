#!/usr/bin/env node

var path = require('path');

var htmlFilePath = path.join(__dirname,'lib/index.html')
var spawn = require('child_process').spawn;
spawn('mocha-phantomjs', [htmlFilePath], { stdio: 'inherit' });