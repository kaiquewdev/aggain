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

function startHandler(dir, name, fn) {
  /*debug('start handler');
  var err = null;
  var structureLocation = path.resolve(dir, name);
  
  fn = fn || function upCallbackHandler (err) {};

  if (!modules.hasStructureSetup(dir, name)) {
    fs.mkdirSync(structureLocation); 
    upHandler(structureLocation, fn);
  } else {
    fn.call(exports, 'Check the previous structure who still exists.');
  }*/
  modules.start(dir, name, fn);
}
exports.start = startHandler;

function createModuleHandler(dir, name, fn) {
  return modules.createModule(dir, name, fn);
}
exports.createModule = createModuleHandler;

function createMiddlewareHandler(dir, name, fn) {
  return modules.createMiddleware(dir, name, fn);
}
exports.createMiddleware = createMiddlewareHandler;

function createModelHandler(dir, name, fn) {
  return modules.createModel(dir, name, fn);
}
exports.createModel = createModelHandler;

function createPluginHandler(dir, name, fn) {
  return modules.createPlugin(dir, name, fn);
}
exports.createPlugin = createPluginHandler;

function createControllerHandler(dir, name, fn) {
  return modules.createController(dir, name, fn);
}
exports.createController = createControllerHandler;

function createConfigHandler(dir, name, fn) {
  return modules.createConfig(dir, name, fn);
}
exports.createConfig = createConfigHandler;

function createTestHandler(dir, name, fn) {
  return modules.createTest(dir, name, fn);
}
exports.createTest = createTestHandler;

function createJobProcessHandler(dir, name, fn) {
  return modules.createJob(dir, name, fn);
}
exports.createJobProcess = createJobProcessHandler;
