// file: modules/create-controller.js - created at 2014-12-27, 08:10
var debug = require('debug')('agni');
var moment = require('moment');
var modules = require('./');

function createControllerHandler(dir, name, fn) {
  // start here with create-controller.js
  debug('create controller handler');
  var err = null;
  var hasFile = modules.hasFile('controllers', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createControllersCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the controllers/ directory.', timestamp);
  }

  modules.createLocation('controllers', dir);
  modules.createIndex('controllers', dir);
  modules.createFile('controllers', dir, name, fn);

  return exports;
}
module.exports = exports = createControllerHandler;
