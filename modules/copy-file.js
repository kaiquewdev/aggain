// file: modules/copy-file.js - created at 2015-01-06, 10:46
var debug = require('debug')('agni');
var fs = require('fs');
var mustache = require('mustache');

function copyFileHandler(src, dst, ctx) {
  debug('copy file handler');
  var file = fs.readFileSync(src, 'utf-8');
  var data = mustache.render(file, ctx);

  fs.writeFileSync(dst, data);

  return exports;
}
module.exports = exports = copyFileHandler;
