// file: lib/index.js
// third-party modules
var debug = require('debug')('agni');
var mustache = require('mustache');
var moment = require('moment');
// core modules
var util = require('util');
var fs = require('graceful-fs');
var path = require('path');
// modules
var modules = require('../modules');

// private methods

function _dotAgniLocationHandler(dir) {
  return modules.dotAgniLocation(dir);
}

function _hasStructureSetupHandler(dir, name) {
  return modules.hasStructureSetup(dir, name);
}

function _hasSetupHandler(type, dir) {
  return modules.hasSetup(type, dir);
}

function _hasIndexSetupHandler(type, dir) {
  return modules.hasIndexSetup(type, dir);
}

function _hasFileHandler(type, dir, name) {
  return modules.hasFile(type, dir, name);
}

function _createLocationHandler(type, dir) {
  return modules.createLocation(type, dir); 
}

function _createIndexHandler(type, dir) {
  return modules.createIndex(type, dir); 
}

function _createFileHandler(type, dir, name, fn) {
  return modules.createFile(type, dir, name, fn);
}

function _manualUpperCaseHandler(word) {
  return modules.manualUpperCase(word); 
}

// public methods 
function hasDotAgniHandler(dir) {
  debug('has dot agni handler');
  var dotAgniLocation = _dotAgniLocationHandler(dir);
  return fs.existsSync(dotAgniLocation);
}
exports.hasDotAgni = hasDotAgniHandler;

function formatHandler(type, input) {
  var out = input;
  var rSplit = /\-|\_/;
  var joinSign = '';

  type = type || 'variable';

  function variableMapHandler(word, idx) {
    if (idx) {
      return _manualUpperCaseHandler(word);
    } else {
      return word;
    }
  }

  function classMapHandler(word, idx) {
    return _manualUpperCaseHandler(word);
  }

  if (type === 'variable') {
    out = input
            .split(rSplit)
            .map(variableMapHandler)
            .join(joinSign);  
  } else if (type === 'method') {
    out = input
          .split(rSplit)
          .map(variableMapHandler)
          .join(joinSign) + 'Handler';
  } else if (type === 'class') {
    out = input
          .split(rSplit)
          .map(classMapHandler)
          .join(joinSign);
  }

  return out;
}
exports.format = formatHandler;

function validateHandler(type, input) {
  debug('validate handler');
  var out = false;
  var rLabel = new RegExp('^([a-z0-9\-]+)$');
  
  type = type || 'label';

  if (type === 'label' && (rLabel.test(input))) {
    out = true;
  }

  return out;
}
exports.validate = validateHandler;

function upHandler(dir, fn) {
  debug('up handler');
  var err = null;
  var dotAgniLocation = _dotAgniLocationHandler(dir);
  
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

  if (!hasDotAgniHandler(dir)) {
    fs.mkdir(dotAgniLocation, completeHandler);
  } else {
    fn.call(exports, '.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
  }

  return exports;
}
exports.up = upHandler;

function startHandler(dir, name, fn) {
  debug('start handler');
  var err = null;
  var structureLocation = path.resolve(dir, name);
  
  fn = fn || function upCallbackHandler (err) {};

  if (!_hasStructureSetupHandler(dir, name)) {
    fs.mkdirSync(structureLocation); 
    upHandler(structureLocation, fn);
  } else {
    fn.call(exports, 'Check the previous structure who still exists.');
  }
}
exports.start = startHandler;

function createModuleHandler(dir, name, fn) {
  debug('create module handler');
  var err = null;
  var hasFile = _hasFileHandler('modules', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createModulesCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the modules/ directory.', timestamp);
  }

  _createLocationHandler('modules', dir);
  _createIndexHandler('modules', dir);
  _createFileHandler('modules', dir, name, fn);

  return exports;
}
exports.createModule = createModuleHandler;

function createMiddlewareHandler(dir, name, fn) {
  debug('create middlewares handler');
  var err = null;
  var hasFile = _hasFileHandler('middlewares', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createMiddlewaresCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the middlewares/ directory.', timestamp);
  }

  _createLocationHandler('middlewares', dir);
  _createIndexHandler('middlewares', dir);
  _createFileHandler('middlewares', dir, name, fn);

  return exports;
}
exports.createMiddleware = createMiddlewareHandler;

function createModelHandler(dir, name, fn) {
  debug('create models handler');
  var err = null;
  var hasFile = _hasFileHandler('models', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createModelsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the models/ directory.', timestamp);
  }

  _createLocationHandler('models', dir);
  _createIndexHandler('models', dir);
  _createFileHandler('models', dir, name, fn);

  return exports;
}
exports.createModel = createModelHandler;

function createPluginHandler(dir, name, fn) {
  debug('create plugin handler');
  var err = null;
  var hasFile = _hasFileHandler('plugins', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createPluginsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the plugins/ directory.', timestamp);
  }

  _createLocationHandler('plugins', dir);
  _createIndexHandler('plugins', dir);
  _createFileHandler('plugins', dir, name, fn);

  return exports;
}
exports.createPlugin = createPluginHandler;

function createControllerHandler(dir, name, fn) {
  debug('create controller handler');
  var err = null;
  var hasFile = _hasFileHandler('controllers', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createControllersCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the controllers/ directory.', timestamp);
  }

  _createLocationHandler('controllers', dir);
  _createIndexHandler('controllers', dir);
  _createFileHandler('controllers', dir, name, fn);

  return exports;
}
exports.createController = createControllerHandler;

function createConfigHandler(dir, name, fn) {
  debug('create config handler');
  var err = null;
  var hasFile = _hasFileHandler('configs', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createConfigCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the configs/ directory.', timestamp);
  }

  _createLocationHandler('configs', dir);
  _createIndexHandler('configs', dir);
  _createFileHandler('configs', dir, name, fn);

  return exports;
}
exports.createConfig = createConfigHandler;

function createTestHandler(dir, name, fn) {
  debug('create test handler');
  var err = null;
  var hasFile = _hasFileHandler('tests', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createTestsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the tests/ directory.', timestamp);
  }

  _createLocationHandler('tests', dir);
  _createIndexHandler('tests', dir);
  _createFileHandler('tests', dir, name, fn);

  return exports;
}
exports.createTest = createTestHandler;

function createJobProcessHandler(dir, name, fn) {
  debug('create job process handler');
  var err = null;
  var hasFile = _hasFileHandler('jobs', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createJobProcessCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the jobs/ directory.', timestamp);
  }

  _createLocationHandler('jobs', dir);
  _createIndexHandler('jobs', dir);
  _createFileHandler('jobs', dir, name, fn);

  return exports;
}
exports.createJobProcess = createJobProcessHandler;
