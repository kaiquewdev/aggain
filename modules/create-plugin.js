// file: modules/create-plugin.js - created at 2014-12-27, 08:08
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createPluginHandler(dir, name, fn) {
  debug('create plugin handler');
  var err = null;
  var hasFile = modules.hasFile('plugins', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createPluginsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the plugins/ directory.', timestamp);
  }

  modules.createLocation('plugins', dir);
  modules.createIndex('plugins', dir);
  modules.createFile('plugins', dir, name, fn);

  return exports;
}
module.exports = exports = createPluginHandler;
