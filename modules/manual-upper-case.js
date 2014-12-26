// file: modules/manual-upper-case.js - created at 2014-12-26, 04:16
var debug = require('debug')('agni');

function manualUpperCaseHandler(word) {
  debug('manual upper case handler');
  function replaceHandler(c) {
    return String.fromCharCode(c.charCodeAt(0) & ~32);
  }
  return word.replace(/^[a-z]/, replaceHandler);
}
module.exports = exports = manualUpperCaseHandler;
