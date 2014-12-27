// file: modules/create-middleware.js - created at 2014-12-27, 08:00
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createMiddlewareHandler(dir, name, fn) {
  // start here with create-middleware.js
  debug('create middlewares handler');
  var err = null;
  var hasFile = modules.hasFile('middlewares', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createMiddlewaresCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the middlewares/ directory.', timestamp);
  }

  modules.createLocation('middlewares', dir);
  modules.createIndex('middlewares', dir);
  modules.createFile('middlewares', dir, name, fn);

  return exports;
}
module.exports = exports = createMiddlewareHandler;
