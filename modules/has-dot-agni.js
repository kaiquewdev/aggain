// file: modules/has-dot-agni.js - created at 2014-12-26, 05:16
var debug = require('debug')('agni');
var fs = require('fs');
var modules = require('./');

function hasDotAgniHandler(dir) {
  debug('has dot agni handler');
  var dotAgniLocation = modules.dotAgniLocation(dir);
  return fs.existsSync(dotAgniLocation);
}
module.exports = exports = hasDotAgniHandler;
