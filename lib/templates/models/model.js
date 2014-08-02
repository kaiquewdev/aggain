// file: models/{{name}}.js - created at {{timestamp}}
function {{methodName}}() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var schema = null;

  schema = new Schema({
    // start with schema here
  });

  return mongoose.model('{{className}}', schema);
}
module.exports = exports = {{methodName}}();
