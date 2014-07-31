var fs = require('fs');
var mkdirp = require('mkdirp');
'use strict';

exports.emptyDirectory = function (path, fn) {
  fs.readdir(path, function(err, files) {
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

exports.write = function (path, str, mode) {
  fs.writeFile(path, str, {
    mode: mode || 0666
  });
  console.log('    [\x1b[32mcreate\x1b[0m] ' + path);
}

exports.mkdir = function (path, fn) {
  mkdirp(path, 0755, function(err) {
    if (err) throw err;
    console.log('    [\033[32mcreate\033[0m] ' + path);
    fn && fn();
  });
}

exports.abort = function (str) {
  console.error(str);
  process.exit(1);
}
