// file: modules/create-bin.js - created at 2015-01-06, 04:36
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createBinHandler(dir, name, fn) {
  debug('create bin handler');
  var err = null;
  var hasFile = modules.hasFile('bins', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createConfigCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the bins/ directory.', timestamp);
  }

  modules.createLocation('bins', dir);
  modules.createIndex('bins', dir);
  modules.createFile('bins', dir, name, fn);

  return exports;
}
module.exports = exports = createBinHandler;
