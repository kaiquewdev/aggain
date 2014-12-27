// file: modules/create-module.js - created at 2014-12-27, 07:56
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createModuleHandler(dir, name, fn) {
  debug('create module handler');
  var err = null;
  var hasFile = modules.hasFile('modules', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createModulesCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the modules/ directory.', timestamp);
  }

  modules.createLocation('modules', dir);
  modules.createIndex('modules', dir);
  modules.createFile('modules', dir, name, fn);

  return exports;
}
module.exports = exports = createModuleHandler;
