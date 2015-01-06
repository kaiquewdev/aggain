// file: modules/create-app.js - created at 2015-01-01, 08:18
var debug = require('debug')('agni');
var moment = require('moment');
var modules = require('./');
var path = require('path');

function createAppHandler(dir, name, fn) {
  debug('create app handler');
  var err = null;
  var hasFile = modules.hasFile('./', dir, name);
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');
  var varName = modules.format('variable', name);
  var methodName = modules.format('method', name);
  var className = modules.format('class', name);
  var src = path.resolve(dir, '.agni/templates/app.js');
  var dst = path.resolve(dir, name + '.js');

  dir = dir || '';
  name = name || '';
  fn = fn || function createAppCallbackHandler (err, timestamp) {};

  if (hasFile) {
    fn.call(exports, 'Impossible to create the file on that structure, verify the ./ directory.', timestamp);
  }

  modules.copyFile(src, dst, {
    name: name,
    variableName: varName,
    methodName: methodName,
    className: className,
    timestamp: timestamp, 
  });

  fn.call(exports, err, timestamp);

  return exports;
}
module.exports = exports = createAppHandler;
