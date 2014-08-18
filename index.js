#!/usr/bin/env node
'use strict';

var program = require('commander');
var path = require('path');
var fs = require('fs');

var util = require('./lib/util');
var pkg = require('./package');

program
  .usage('[folder]')
  .version(pkg.version)
  .option('-p, --prod', 'use production version')
  .parse(process.argv);

var destinationPath = program.args.shift() || '.';

var index   = fs.readFileSync(__dirname + '/templates/index.html');
var edicon  = fs.readFileSync(__dirname + '/templates/.editorconfig');
var ignore  = fs.readFileSync(__dirname + '/templates/.gitignore');
var css     = fs.readFileSync(__dirname + '/templates/concise-css/concise.css')
var cssMin  = fs.readFileSync(__dirname + '/templates/concise-css/concise.min.css')
var js      = fs.readFileSync(__dirname + '/templates/js/concise.js');
var jsMin   = fs.readFileSync(__dirname + '/templates/js/concise.min.js');

(function generateApp(path) {
  util.emptyDirectory(path, function(empty) {
    if (empty || program.force) {
      createApp(path);
    } else {
      program.confirm('destination path is not empty, are you sure to continue?', function(ok) {
        if (ok) {
          process.stdin.destroy();
          createApp(path);
        } else {
          util.abort('Process canceled!')
        }
      });
    }
  });
})(destinationPath);

function createApp(path) {
  util.mkdir(path, function() {
    util.mkdir(path + '/css');
    util.mkdir(path + '/images');
    util.mkdir(path + '/js');

    util.write(path + '/index.html', index);
    util.write(path + '/.editorconfig', edicon);
    util.write(path + '/.gitignore', ignore);

    if (program.prod) {
      util.write(path + '/css/concise.css', css)
      util.write(path + '/js/concise.js', js);
    } else {
      util.write(path + '/css/concise.min.css', cssMin)
      util.write(path + '/js/concise.min.js', jsMin);
    }
  });
}
