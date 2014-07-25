// file: lib/index.js
// third-party modules
var debug = require('debug')('agni');
var mustache = require('mustache');
// core modules
var util = require('util');
var fs = require('fs');
var path = require('path');

function hasDotAgniHandler() {
  var dotAgniLocation = path.resolve(process.cwd(), '.agni');
  return fs.existsSync(dotAgniLocation);
}
exports.hasDotAgni = hasDotAgniHandler;

function startHandler(fn) {
  debug('start handler');
  var err = null;
  var dotAgniLocation = path.resolve(process.cwd(), '.agni');

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

  if (!hasDotAgniHandler()) {
    fs.mkdir(dotAgniLocation, completeHandler);
  } else {
    fn.call(exports, '.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
  }
}
exports.start = startHandler;
