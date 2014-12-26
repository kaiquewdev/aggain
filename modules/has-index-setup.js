// file: modules/has-index-setup.js - created at 2014-12-26, 04:08
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');

function hasIndexSetupHandler(type, dir) {
  debug('private has index handler');
  var dirLocation = path.resolve(dir, type);
  var indexLocation = path.resolve(dirLocation, 'index.js');
  return fs.existsSync(indexLocation);
}
module.exports = exports = hasIndexSetupHandler;
