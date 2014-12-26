// file: modules/has-setup.js - created at 2014-12-26, 04:05
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');

function hasSetupHandler(type, dir) {
  debug('private has setup handler');
  var dirLocation = path.resolve(dir, type);
  return fs.existsSync(dirLocation);
}
module.exports = exports = hasSetupHandler;
