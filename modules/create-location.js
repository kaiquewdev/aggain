// file: modules/create-location.js - created at 2014-12-26, 04:11
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');
var modules = require('./');

function createLocationHandler(type, dir) {
  debug('private create location handler');
  var out = false;
  var dirLocation = path.resolve(dir, type);
  var hasSetup = modules.hasSetup(type, dir);

  if (!hasSetup) {
    out = fs.mkdirSync(dirLocation);
  }

  return out;
}
module.exports = exports = createLocationHandler;
