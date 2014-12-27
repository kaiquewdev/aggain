// file: lib/index.js
// third-party modules
var debug = require('debug')('agni');
// core modules
var util = require('util');
var fs = require('graceful-fs');
var path = require('path');
// modules
var modules = require('../modules');

// public methods 
function hasDotAgniHandler(dir) {
  return modules.hasDotAgni(dir);
}
exports.hasDotAgni = hasDotAgniHandler;

function formatHandler(type, input) {
  return modules.format(type, input);
}
exports.format = formatHandler;

function validateHandler(type, input) {
  return modules.validate(type, input); 
}
exports.validate = validateHandler;

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
exports.up = upHandler;

exports.start = modules.start;
exports.createModule = modules.createModule;
exports.createMiddleware = modules.createMiddleware;
exports.createModel = modules.createModel;
exports.createPlugin = modules.createPlugin;
exports.createController = modules.createController;
exports.createConfig = modules.createConfig;
exports.createTest = modules.createTest;
exports.createJobProcess = modules.createJob;
