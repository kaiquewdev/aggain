// file: modules/validate.js - created at 2014-12-26, 05:18
var debug = require('debug')('agni');

function validateHandler(type, input) {
  // start here with validate.js
  debug('validate handler');
  var out = false;
  var rLabel = new RegExp('^([a-z0-9\-]+)$');
  
  type = type || 'label';

  if (type === 'label' && (rLabel.test(input))) {
    out = true;
  }

  return out;
}
module.exports = exports = validateHandler;
