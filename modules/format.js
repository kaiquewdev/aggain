// file: modules/format.js - created at 2014-12-26, 05:11
var debug = require('debug')('agni');
var modules = require('./');

function formatHandler(type, input) {
  debug('format handler');
  var out = input;
  var rSplit = /\-|\_/;
  var joinSign = '';

  type = type || 'variable';

  function variableMapHandler(word, idx) {
    if (idx) {
      return modules.manualUpperCase(word);
    } else {
      return word;
    }
  }

  function classMapHandler(word, idx) {
    return modules.manualUpperCase(word);
  }

  if (type === 'variable') {
    out = input
            .split(rSplit)
            .map(variableMapHandler)
            .join(joinSign);  
  } else if (type === 'method') {
    out = input
          .split(rSplit)
          .map(variableMapHandler)
          .join(joinSign) + 'Handler';
  } else if (type === 'class') {
    out = input
          .split(rSplit)
          .map(classMapHandler)
          .join(joinSign);
  }

  return out;
}
module.exports = exports = formatHandler;
