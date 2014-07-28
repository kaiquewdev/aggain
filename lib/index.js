// file: lib/index.js
// third-party modules
var debug = require('debug')('agni');
var mustache = require('mustache');
var moment = require('moment');
// core modules
var util = require('util');
var fs = require('fs');
var path = require('path');

function _dotAgniLocationHandler(dir) {
  debug('private dot agni location handler');
  dir = path.resolve(process.cwd(), dir || '');
  return path.resolve(dir, '.agni');
}

function hasDotAgniHandler(dir) {
  debug('has dot agni handler');
  var dotAgniLocation = _dotAgniLocationHandler(dir);
  return fs.existsSync(dotAgniLocation);
}
exports.hasDotAgni = hasDotAgniHandler;

function startHandler(dir, fn) {
  debug('start handler');
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
exports.start = startHandler;

function _hasModuleSetupHandler(dir) {
  debug('private has module setup handler');
  var modulesLocation = path.resolve(dir, 'modules');
  return fs.existsSync(modulesLocation); 
}

function _hasModuleIndexSetupHandler(dir) {
  debug('private has module index handler');
  var modulesLocation = path.resolve(dir, 'modules');
  var indexLocation = path.resolve(modulesLocation, 'index.js');
  return fs.existsSync(indexLocation);
}

function _hasModuleFileHandler(dir, name) {
  debug('private has module file handler');
  var moduleFileLocation = path.resolve(dir, 'modules/' + name + '.js');
  return fs.existsSync(moduleFileLocation);
}

function createModuleHandler(dir, name, fn) {
  debug('create module handler');
  var err = null;
  var modulesLocation = path.resolve(dir, 'modules/');
  var indexFileCopyLocation = path.resolve(dir, 'modules/index.js');
  var moduleFileCopyLocation = path.resolve(dir, 'modules/' + name + '.js');
  var moduleFileCopyData = null;
  var moduleFileLocation = path.resolve(dir, '.agni/templates/modules/module.js');
  var moduleFile = null;
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');
  var hasModuleSetup = _hasModuleSetupHandler(dir);
  var hasModuleIndexSetup = _hasModuleIndexSetupHandler(dir);
  var moduleData = 'exports.' + name + ' = require(\'./' + name + '\');\n';

  dir = dir || '';
  name = name || '';
  fn = fn || function startCallbackHandler (err, timestamp) {};

  if (!hasModuleSetup) {
    fs.mkdirSync(modulesLocation);
  } if (!hasModuleIndexSetup) {
    fs.writeFileSync(indexFileCopyLocation, '// file: modules/index.js\n');
  } if (!_hasModuleFileHandler(dir, name)) {
    fs.appendFileSync(indexFileCopyLocation, moduleData);
    moduleFile = fs.readFileSync(moduleFileLocation, 'utf-8');
    moduleFileCopyData = mustache.render(moduleFile, { name: name, timestamp: timestamp });
    fs.writeFileSync(moduleFileCopyLocation, moduleFileCopyData);
    fn.call(exports, err, timestamp);
  } else {
    fn.call(exports, 'Unknow error', timestamp);
  }

  return exports;
}
exports.createModule = createModuleHandler;
