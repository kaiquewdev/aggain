// file: modules/dot-agni-location.js - created at 2014-12-26, 03:57
var debug = require('debug')('agni');
var path = require('path');

function dotAgniLocationHandler(dir) {
  debug('private dot agni location handler');
  dir = path.resolve(process.cwd(), dir || '');
  return path.resolve(dir, '.agni');
}
module.exports = exports = dotAgniLocationHandler;
