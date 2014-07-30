var should = require('should');
var agni = require('../lib');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var moment = require('moment');

describe('Agni', function () {
  var dir = path.resolve(process.cwd(), './test/case');
  var dotAgniLocation = path.resolve(dir, '.agni');

  it('has dot agni location', function () {
    agni.hasDotAgni('./test/case').should.not.be.ok;
  });

  it('fire up the egine', function (done) {
    agni.up('./test/case', function(err) {
      should.not.exist(err);
      fs.existsSync(dotAgniLocation).should.be.ok;
      fs.existsSync(path.resolve(dotAgniLocation, 'templates')).should.be.ok;
      done();
    });
  });

  it('start up the structure', function (done) {
    agni.start('./test/case', 'new-structure', function(err) {
      should.not.exist(err);
      fs.existsSync(path.resolve(dir, 'new-structure')).should.be.ok;
      fs.existsSync(path.resolve(dir, 'new-structure/.agni')).should.be.ok;
      done();
    });
  });

  it('has dot agni location', function () {
    agni.hasDotAgni('./test/case').should.be.ok;
  });

  it('fail to create dot agni dir in an existing context with up', function (done) {
    agni.up('./test/case', function (err) {
      fs.existsSync(dotAgniLocation).should.be.ok;
      err.should.be.eql('.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
      done();
    });
  });

  it('create a module if not exists module dir or index file', function (done) {
    agni.createModule(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'modules/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'modules/index.js'), 'utf-8').should.be.eql(
        '// file: modules/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n'  
      );
      fs.existsSync(path.resolve(dir, 'modules/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'modules/test-case.js'), 'utf-8').should.be.eql(
        '// file: modules/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler() {\n' +
        '  // start here with test-case.js\n' + 
        '}\n' +
        'module.exports = exports = test-caseHandler;\n' 
      );
      done();
    });
  });

  it('fail to create module file on the structure', function (done) {
    agni.createModule(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the modules/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a module if exists module dir or index file', function (done) {
    agni.createModule(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'modules/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'modules/index.js'), 'utf-8').should.be.eql(
        '// file: modules/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n' + 
        'exports.test-another-case = require(\'./test-another-case\');\n'
      );
      fs.existsSync(path.resolve(dir, 'modules/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'modules/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: modules/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler() {\n' +
        '  // start here with test-another-case.js\n' + 
        '}\n' +
        'module.exports = exports = test-another-caseHandler;\n' 
      );
      done();
    });
  });

  it('create a middleware if not exists middleware dir or index file', function (done) {
    agni.createMiddleware(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'middlewares/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'middlewares/index.js'), 'utf-8').should.be.eql(
        '// file: middlewares/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n'  
      );
      fs.existsSync(path.resolve(dir, 'middlewares/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'middlewares/test-case.js'), 'utf-8').should.be.eql(
        '// file: middlewares/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler(req, res, next) {\n' +
        '  // start here with test-case.js\n' + 
        '}\n' +
        'module.exports = exports = test-caseHandler;\n' 
      );
      done();
    });
  });

  it('fail to create middleware file on the structure', function (done) {
    agni.createMiddleware(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the middlewares/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a middleware if exists middleware dir or index file', function (done) {
    agni.createMiddleware(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'middlewares/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'middlewares/index.js'), 'utf-8').should.be.eql(
        '// file: middlewares/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n' + 
        'exports.test-another-case = require(\'./test-another-case\');\n'
      );
      fs.existsSync(path.resolve(dir, 'middlewares/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'middlewares/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: middlewares/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler(req, res, next) {\n' +
        '  // start here with test-another-case.js\n' + 
        '}\n' +
        'module.exports = exports = test-another-caseHandler;\n' 
      );
      done();
    });
  });

  it('create a model if not exists model dir or index file', function (done) {
    agni.createModel(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'models/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'models/index.js'), 'utf-8').should.be.eql(
        '// file: models/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n'  
      );
      fs.existsSync(path.resolve(dir, 'models/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'models/test-case.js'), 'utf-8').should.be.eql(
        '// file: models/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler() {\n' +
        '  var mongoose = require(\'mongoose\');\n' +
        '  var Schema = mongoose.Schema;\n' +
        '  var schema = null;\n' +
        '\n' +
        '  schema = new Schema({\n' +
        '    // start with schema here\n' +
        '  });\n' +
        '\n' +
        '  return mongoose.model(\'test-case\', schema);\n' +
        '}\n' +
        'module.exports = exports = test-caseHandler();\n' 
      );
      done();
    });
  });

  it('fail to create model file on the structure', function (done) {
    agni.createModel(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the models/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a model if exists model dir or index file', function (done) {
    agni.createModel(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'models/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'models/index.js'), 'utf-8').should.be.eql(
        '// file: models/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n' + 
        'exports.test-another-case = require(\'./test-another-case\');\n'
      );
      fs.existsSync(path.resolve(dir, 'models/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'models/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: models/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler() {\n' +
        '  var mongoose = require(\'mongoose\');\n' +
        '  var Schema = mongoose.Schema;\n' +
        '  var schema = null;\n' +
        '\n' +
        '  schema = new Schema({\n' +
        '    // start with schema here\n' +
        '  });\n' +
        '\n' +
        '  return mongoose.model(\'test-another-case\', schema);\n' +
        '}\n' +
        'module.exports = exports = test-another-caseHandler();\n'
      );
      done();
    });
  });

  it('create a plugin if not exists plugin dir or index file', function (done) {
    agni.createPlugin(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'plugins/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'plugins/index.js'), 'utf-8').should.be.eql(
        '// file: plugins/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n'  
      );
      fs.existsSync(path.resolve(dir, 'plugins/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'plugins/test-case.js'), 'utf-8').should.be.eql(
        '// file: plugins/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler(schema, options) {\n' +
        '  options = options || {};\n' +
        '\n' +
        '  // start with plugin here\n' +
        '}\n' +
        'module.exports = exports = test-caseHandler;\n' 
      );
      done();
    });
  });

  it('fail to create plugin file on the structure', function (done) {
    agni.createPlugin(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the plugins/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a plugin if exists plugin dir or index file', function (done) {
    agni.createPlugin(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'plugins/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'plugins/index.js'), 'utf-8').should.be.eql(
        '// file: plugins/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n' + 
        'exports.test-another-case = require(\'./test-another-case\');\n'
      );
      fs.existsSync(path.resolve(dir, 'plugins/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'plugins/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: plugins/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler(schema, options) {\n' +
        '  options = options || {};\n' +
        '\n' +
        '  // start with plugin here\n' +
        '}\n' +
        'module.exports = exports = test-another-caseHandler;\n'
      );
      done();
    });
  });

  it('create a controller if not exists controller dir or index file', function (done) {
    agni.createController(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'controllers/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'controllers/index.js'), 'utf-8').should.be.eql(
        '// file: controllers/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n'  
      );
      fs.existsSync(path.resolve(dir, 'controllers/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'controllers/test-case.js'), 'utf-8').should.be.eql(
        '// file: controllers/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler(req, res) {\n' +
        '  res.send(\'test-case\');\n' +
        '}\n' +
        'module.exports = exports = test-caseHandler;\n' 
      );
      done();
    });
  });

  it('fail to create controller file on the structure', function (done) {
    agni.createController(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the controllers/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a controller if exists controller dir or index file', function (done) {
    agni.createController(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'controllers/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'controllers/index.js'), 'utf-8').should.be.eql(
        '// file: controllers/index.js\n' +
        'exports.test-case = require(\'./test-case\');\n' + 
        'exports.test-another-case = require(\'./test-another-case\');\n'
      );
      fs.existsSync(path.resolve(dir, 'controllers/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'controllers/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: controllers/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler(req, res) {\n' +
        '  res.send(\'test-another-case\');\n' +
        '}\n' +
        'module.exports = exports = test-another-caseHandler;\n'
      );
      done();
    });
  });

  it('create a config if not exists config dir or index file', function (done) {
    agni.createConfig(dir, 'test-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'configs/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'configs/index.js'), 'utf-8').should.be.eql(
        '// file: configs/index.js\n' +
        'var env = process.env.NODE_ENV || \'development\';\n' +
        'exports.test-case = require(\'./test-case\')(env);\n'  
      );
      fs.existsSync(path.resolve(dir, 'configs/test-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'configs/test-case.js'), 'utf-8').should.be.eql(
        '// file: configs/test-case.js - created at ' + timestamp + '\n' + 
        'function test-caseHandler(env) {\n' +
        '  var config = {\n' +
        '    development: {},\n' +
        '    production: {},\n' +
        '  };\n' +
        '\n' +
        '  return config[env];\n' +
        '}\n' +
        'module.exports = exports = test-caseHandler;\n' 
      );
      done();
    });
  });

  it('fail to create config file on the structure', function (done) {
    agni.createConfig(dir, 'test-case', function (err, timestamp) {
      err.should.be.eql('Impossible to create the file on that structure, verify the configs/ directory.'); 
      should.exist(timestamp);
      done();
    });
  });

  it('create a config if exists config dir or index file', function (done) {
    agni.createConfig(dir, 'test-another-case', function (err, timestamp) {
      should.not.exist(err); 
      should.exist(timestamp);
      console.log(timestamp);
      fs.existsSync(path.resolve(dir, 'configs/index.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'configs/index.js'), 'utf-8').should.be.eql(
        '// file: configs/index.js\n' +
        'var env = process.env.NODE_ENV || \'development\';\n' +
        'exports.test-case = require(\'./test-case\')(env);\n' + 
        'exports.test-another-case = require(\'./test-another-case\')(env);\n'
      );
      fs.existsSync(path.resolve(dir, 'configs/test-another-case.js')).should.be.ok;
      fs.readFileSync(path.resolve(dir, 'configs/test-another-case.js'), 'utf-8').should.be.eql(
        '// file: configs/test-another-case.js - created at ' + timestamp + '\n' + 
        'function test-another-caseHandler(env) {\n' +
        '  var config = {\n' +
        '    development: {},\n' +
        '    production: {},\n' +
        '  };\n' +
        '\n' +
        '  return config[env];\n' +
        '}\n' +
        'module.exports = exports = test-another-caseHandler;\n'
      );
      done();
    });
  });

  after(function () {
    exec('rm -rf ' + dotAgniLocation, console.log.bind(console));
    exec('rm -rf ' + dir + '/*', console.log.bind(console));
  });
});
