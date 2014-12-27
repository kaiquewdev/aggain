// file: modules/start.js - created at 2014-12-27, 08:21
var debug = require('debug')('agni');
var path = require('path');
var modules = require('./');
var fs = require('fs');

function startHandler(dir, name, fn) {
  debug('start handler');
  var err = null;
  var structureLocation = path.resolve(dir, name);
  
  fn = fn || function upCallbackHandler (err) {};

  if (!modules.hasStructureSetup(dir, name)) {
    fs.mkdirSync(structureLocation); 
    modules.up(structureLocation, fn);
  } else {
    fn.call(exports, 'Check the previous structure who still exists.');
  }
}
module.exports = exports = startHandler;
