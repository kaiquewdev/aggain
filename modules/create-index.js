// file: modules/create-index.js - created at 2014-12-26, 04:13
var debug = require('debug')('agni');
var path = require('path');
var fs = require('fs');

function createIndexHandler(type, dir) {
  debug('private create index handler');
  var out = false;
  var indexFileCopyLocation = path.resolve(dir, type + '/index.js');
  var hasIndexSetup = _hasIndexSetupHandler(type, dir);
  var headerData = '// file: ' + type + '/index.js\n';
  var envData = 'var env = process.env.NODE_ENV || \'development\';\n';

  if (!hasIndexSetup) {
    fs.writeFileSync(indexFileCopyLocation, headerData);
    (type === 'configs' ? fs.appendFileSync(indexFileCopyLocation, envData) : null);
    out = true;
  }

  return out;
}
module.exports = exports = createIndexHandler;
