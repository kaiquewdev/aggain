// file: modules/create-model.js - created at 2014-12-27, 08:06
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createModelHandler(dir, name, fn) {
  // start here with create-model.js
  debug('create models handler');
  var err = null;
  var hasFile = modules.hasFile('models', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createModelsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the models/ directory.', timestamp);
  }

  modules.createLocation('models', dir);
  modules.createIndex('models', dir);
  modules.createFile('models', dir, name, fn);

  return exports;
}
module.exports = exports = createModelHandler;
