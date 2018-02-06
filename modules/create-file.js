// file: modules/create-file.js - created at 2014-12-26, 04:14
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var modules = require('./');

function createFileHandler(type, dir, name, fn) {
  // start here with create-file.js
  debug('private create file handler');
  var out = false;
  var err = null;
  var timestamp = moment().format('YYYY-MM-DD, hh:mm');
  var varName = modules.format('variable', name);
  var methodName = modules.format('method', name);
  var className = modules.format('class', name);
  var fileName = type.slice(0, type.length - 1);
  var fileLocation = path.resolve(dir, '.agni/templates/' + type + '/' + fileName + (type === 'bins' ? '' : '.js'));
  var fileCopyName = (type === 'tests' ? (name + '.test') : name);
  var fileCopyLocation = path.resolve(dir, type + '/' + fileCopyName + (type === 'bins' ? '' : '.js'));
  var file = null;
  var fileCopyData = null;
  var indexFileCopyLocation = path.resolve(dir, type + '/index.js');
  var indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '\');\n';
  var hasFile = modules.hasFile(type, dir, name);

  if (type === 'configs') {
    indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '\')(env);\n';
  } else if (type === 'models') {
    indexAppendData = 'exports.' + className + ' = require(\'./' + name + '\');\n';
  } else if (type === 'tests') {
    indexAppendData = 'exports.' + varName + ' = require(\'./' + name + '.test' + '\');\n';
  }

  fn = fn || function createModulesCallbackHandler (err, timestamp) {};

  if (type !== 'app' && (!hasFile)) {
    fs.appendFileSync(indexFileCopyLocation, indexAppendData);
  } if (!hasFile) {
    modules.copyFile(fileLocation, fileCopyLocation, {
      name: name,
      variableName: varName,
      methodName: methodName,
      className: className,
      timestamp: timestamp
    }); 
    fn.call(exports, err, timestamp);
  }

  return out;
}
module.exports = exports = createFileHandler;
