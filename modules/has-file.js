// file: modules/has-file.js - created at 2014-12-26, 04:09
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');

function hasFileHandler(type, dir, name) {
  debug('private has file handler');
  var dirFileLocation = path.resolve(dir, type + '/' + (type === 'tests' ? (name + '.test') : name ) + '.js');
  return fs.existsSync(dirFileLocation);
}
module.exports = exports = hasFileHandler;
