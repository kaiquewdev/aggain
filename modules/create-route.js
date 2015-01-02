// file: modules/create-route.js - created at 2015-01-02, 01:08
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createRouteHandler(dir, name, fn) {
  debug('create route handler');
  var err = null;
  var hasFile = modules.hasFile('routes', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createJobProcessCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the routes/ directory.', timestamp);
  }

  modules.createLocation('routes', dir);
  modules.createIndex('routes', dir);
  modules.createFile('routes', dir, name, fn);

  return exports;
}
module.exports = exports = createRouteHandler;
