// file: modules/create-job.js - created at 2014-12-27, 08:16
var debug = require('debug')('agni');
var modules = require('./');
var moment = require('moment');

function createJobHandler(dir, name, fn) {
  debug('create job process handler');
  var err = null;
  var hasFile = modules.hasFile('jobs', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');

  dir = dir || '';
  name = name || '';
  fn = fn || function createJobProcessCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the jobs/ directory.', timestamp);
  }

  modules.createLocation('jobs', dir);
  modules.createIndex('jobs', dir);
  modules.createFile('jobs', dir, name, fn);

  return exports;
}
module.exports = exports = createJobHandler;
