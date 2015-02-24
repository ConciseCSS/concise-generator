var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

// Check if the directory is empty

exports.emptyDirectory = function (path, fn) {
  fs.readdir(path, function(err, files) {
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

// Write the template file and output a colored message

exports.write = function (path, str, mode) {
  fs.writeFile(path, str, {
    mode: mode || 0666
  });
  console.log('    [\x1b[32mcreate\x1b[0m] ' + path);
}

// Create the templates folder and output a colored message

exports.mkdir = function (path, fn) {
  mkdirp(path, 0755, function(err) {
    if (err) throw err;
    console.log('    [\033[32mcreate\033[0m] ' + path);
    fn && fn();
  });
}

// Abort the generation

exports.abort = function (str) {
  console.error(str);
  process.exit(1);
}

// Load templates files

exports.loadTemplate = function (name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

// Load files from Concise

exports.loadConcise = function (name) {
  return fs.readFileSync(path.join(__dirname, '..', 'concise.css/dist', name), 'utf-8');
}
