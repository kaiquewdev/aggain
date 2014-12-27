// file: modules/create-test.js - created at 2014-12-27, 08:13
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createTestHandler(dir, name, fn) {
  debug('create test handler');
  var err = null;
  var hasFile = modules.hasFile('tests', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createTestsCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the tests/ directory.', timestamp);
  }

  modules.createLocation('tests', dir);
  modules.createIndex('tests', dir);
  modules.createFile('tests', dir, name, fn);

  return exports;
}
module.exports = exports = createTestHandler;
