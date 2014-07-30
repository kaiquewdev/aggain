// file: configs/{{name}}.js - created at {{timestamp}}
function {{name}}Handler(env) {
  var config = {
    development: {},
    production: {},
  };

  return config[env];
}
module.exports = exports = {{name}}Handler;
