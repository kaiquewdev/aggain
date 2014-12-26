// file: modules/has-structure-setup.js - created at 2014-12-26, 04:02
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');

function hasStructureSetupHandler(dir, name) {
  debug('private structure setup handler');
  var structureLocation = path.resolve(dir, name);
  return fs.existsSync(structureLocation);
}
module.exports = exports = hasStructureSetupHandler;
