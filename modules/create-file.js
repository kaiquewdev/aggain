// file: modules/create-file.js - created at 2014-12-26, 04:14
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
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
  var indexFileCopyLocation = path.resolve(dir, type + '/index.js');
  var fileNameWithExt = type.slice(0, type.length - 1);
  var fileLocation = path.resolve(dir, '.agni/templates/' + type + '/' + fileNameWithExt + '.js');
  var fileCopyLocation = path.resolve(dir, type + '/' + (type === 'tests' ? (name + '.test') : name) + '.js');
  var file = null;
  var fileCopyData = null;
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

  if (!hasFile) {
    fs.appendFileSync(indexFileCopyLocation, indexAppendData);
    file = fs.readFileSync(fileLocation, 'utf-8');
    fileCopyData = mustache.render(file, {
      name: name,
      variableName: varName,
      methodName: methodName,
      className: className,
      timestamp: timestamp
    });
    fs.writeFileSync(fileCopyLocation, fileCopyData);
    fn.call(exports, err, timestamp);
  }

  return out;
}
module.exports = exports = createFileHandler;
