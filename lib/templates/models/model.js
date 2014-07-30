// file: models/{{name}}.js - created at {{timestamp}}
function {{name}}Handler() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var schema = null;

  schema = new Schema({
    // start with schema here
  });

  return mongoose.model('{{name}}', schema);
}
module.exports = exports = {{name}}Handler();
