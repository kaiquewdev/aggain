// file: modules/create-config.js - created at 2014-12-27, 08:12
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createConfigHandler(dir, name, fn) {
  debug('create config handler');
  var err = null;
  var hasFile = modules.hasFile('configs', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createConfigCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the configs/ directory.', timestamp);
  }

  modules.createLocation('configs', dir);
  modules.createIndex('configs', dir);
  modules.createFile('configs', dir, name, fn);

  return exports;
}
module.exports = exports = createConfigHandler;
