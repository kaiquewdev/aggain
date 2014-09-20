// file: lib/index.js
// third-party modules
var debug = require('debug')('agni');
var mustache = require('mustache');
var moment = require('moment');
// core modules
var util = require('util');
var fs = require('graceful-fs');
var path = require('path');

// private methods

function _dotAgniLocationHandler(dir) {
  debug('private dot agni location handler');
  dir = path.resolve(process.cwd(), dir || '');
  return path.resolve(dir, '.agni');
}

function _hasStructureSetupHandler(dir, name) {
  debug('private structure setup handler');
  var structureLocation = path.resolve(dir, name);
  return fs.existsSync(structureLocation);
}

function _hasSetupHandler(type, dir) {
  debug('private has setup handler');
  var dirLocation = path.resolve(dir, type);
  return fs.existsSync(dirLocation); 
}

function _hasIndexSetupHandler(type, dir) {
  debug('private has index handler');
  var dirLocation = path.resolve(dir, type);
  var indexLocation = path.resolve(dirLocation, 'index.js');
  return fs.existsSync(indexLocation);
}

function _hasFileHandler(type, dir, name) {
  debug('private has file handler');
  var dirFileLocation = path.resolve(dir, type + '/' + (type === 'tests' ? (name + '.test') : name )+ '.js');
  return fs.existsSync(dirFileLocation);
}

function _createLocationHandler(type, dir) {
  debug('private create location handler');
  var out = false;
  var dirLocation = path.resolve(dir, type);
  var hasSetup = _hasSetupHandler(type, dir);

  if (!hasSetup) {
    out = fs.mkdirSync(dirLocation);
  }

  return out;
}

function _createIndexHandler(type, dir) {
  debug('private create index handler');
  var out = false;
  var indexFileCopyLocation = path.resolve(dir, type + '/index.js');
  var hasIndexSetup = _hasIndexSetupHandler(type, dir);
  var headerData = '// file: ' + type + '/index.js\n';
  var envData = 'var env = process.env.NODE_ENV || \'development\';\n';

  if (!hasIndexSetup) {
    fs.writeFileSync(indexFileCopyLocation, headerData);
    (type === 'configs' ? fs.appendFileSync(indexFileCopyLocation, envData) : null);
    out = true;
  }

  return out;
}

function _createFileHandler(type, dir, name, fn) {
  debug('private create file handler');
  var out = false;
  var err = null;
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');
  var varName = formatHandler('variable', name);
  var methodName = formatHandler('method', name);
  var className = formatHandler('class', name);
  var indexFileCopyLocation = path.resolve(dir, type + '/index.js');
  var fileNameWithExt = type.slice(0, type.length - 1);
  var fileLocation = path.resolve(dir, '.agni/templates/' + type + '/' + fileNameWithExt + '.js');
  var fileCopyLocation = path.resolve(dir, type + '/' + (type === 'tests' ? (name + '.test') : name) + '.js');
  var file = null;
  var fileCopyData = null;
  var indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '\');\n';
  var hasFile = _hasFileHandler(type, dir, name);

  if (type === 'configs') {
    indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '\')(env);\n';
  } else if (type === 'models') {
    indexAppendData = 'exports.' + className + ' = require(\'./' + name + '\');\n';
  } else if (type === 'tests') {
    indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '.test' + '\');\n';
  }

  fn = fn || function createModulesCallbackHandler (err, timestamp) {};

  if (!hasFile) {
    fs.appendFileSync(indexFileCopyLocation, indexAppendData);
    file = fs.readFileSync(fileLocation, 'utf-8');
    fileCopyData = mustache.render(file, {
      name: name,
      variableName: varName,
      methodName: methodName,
      className: className,
      timestamp: timestamp
    });
    fs.writeFileSync(fileCopyLocation, fileCopyData);
    fn.call(exports, err, timestamp);
  }

  return out;
}

function _manualUpperCaseHandler(word) {
  function replaceHandler(c) {
    return String.fromCharCode(c.charCodeAt(0) & ~32);
  }
  return word.replace(/^[a-z]/, replaceHandler);
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
