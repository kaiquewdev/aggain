// file: modules/up.js - created at 2014-12-27, 07:12
var debug = require('debug')('agni');
var modules = require('./');
var util = require('util');
var fs = require('fs');
var path = require('path');

function upHandler(dir, fn) {
  debug('up handler');
  var err = null;
  var dotAgniLocation = modules.dotAgniLocation(dir);
  
  fn = fn || function startCallbackHandler (err) {};

  function completeHandler(err) {
    debug('complete mkdir handler');
    debug(util.inspect(err));
    fs.symlinkSync(
      path.resolve(__dirname, 'templates'),
      path.resolve(dotAgniLocation, 'templates'),
      'dir'
    );
    fn.call(exports, err); 
  }

  if (!modules.hasDotAgni(dir)) {
    fs.mkdir(dotAgniLocation, completeHandler);
  } else {
    fn.call(exports, '.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
  }

  return exports;
}
module.exports = exports = upHandler;
