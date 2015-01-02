var should = require('should');

it('create a module if not exists module dir or index file', function (done) {
  agni.createModule(dir, 'test-case', function (err, timestamp) {
    should.not.exist(err); 
    should.exist(timestamp);
    console.log(timestamp);
    fs.existsSync(path.resolve(dir, 'modules/index.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'modules/index.js'), 'utf-8').should.be.eql(
      '// file: modules/index.js\n' +
      'exports.testCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'modules/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'modules/test-case.js'), 'utf-8').should.be.eql(
      '// file: modules/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler() {\n' +
      '  // start here with test-case.js\n' + 
      '}\n' +
      'module.exports = exports = testCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'modules/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'modules/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: modules/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler() {\n' +
      '  // start here with test-another-case.js\n' + 
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'middlewares/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'middlewares/test-case.js'), 'utf-8').should.be.eql(
      '// file: middlewares/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler(req, res, next) {\n' +
      '  // start here with test-case.js\n' + 
      '}\n' +
      'module.exports = exports = testCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'middlewares/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'middlewares/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: middlewares/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler(req, res, next) {\n' +
      '  // start here with test-another-case.js\n' + 
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler;\n' 
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
      'exports.TestCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'models/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'models/test-case.js'), 'utf-8').should.be.eql(
      '// file: models/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler() {\n' +
      '  var mongoose = require(\'mongoose\');\n' +
      '  var Schema = mongoose.Schema;\n' +
      '  var schema = null;\n' +
      '\n' +
      '  schema = new Schema({\n' +
      '    // start with schema here\n' +
      '  });\n' +
      '\n' +
      '  return mongoose.model(\'TestCase\', schema);\n' +
      '}\n' +
      'module.exports = exports = testCaseHandler();\n' 
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
      'exports.TestCase = require(\'./test-case\');\n' + 
      'exports.TestAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'models/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'models/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: models/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler() {\n' +
      '  var mongoose = require(\'mongoose\');\n' +
      '  var Schema = mongoose.Schema;\n' +
      '  var schema = null;\n' +
      '\n' +
      '  schema = new Schema({\n' +
      '    // start with schema here\n' +
      '  });\n' +
      '\n' +
      '  return mongoose.model(\'TestAnotherCase\', schema);\n' +
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler();\n'
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
      'exports.testCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'plugins/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'plugins/test-case.js'), 'utf-8').should.be.eql(
      '// file: plugins/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler(schema, options) {\n' +
      '  options = options || {};\n' +
      '\n' +
      '  // start with plugin here\n' +
      '}\n' +
      'module.exports = exports = testCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'plugins/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'plugins/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: plugins/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler(schema, options) {\n' +
      '  options = options || {};\n' +
      '\n' +
      '  // start with plugin here\n' +
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler;\n'
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
      'exports.testCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'controllers/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'controllers/test-case.js'), 'utf-8').should.be.eql(
      '// file: controllers/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler(req, res) {\n' +
      '  res.send(\'test-case\');\n' +
      '}\n' +
      'module.exports = exports = testCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'controllers/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'controllers/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: controllers/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler(req, res) {\n' +
      '  res.send(\'test-another-case\');\n' +
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler;\n'
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
      'exports.testCase = require(\'./test-case\')(env);\n'  
    );
    fs.existsSync(path.resolve(dir, 'configs/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'configs/test-case.js'), 'utf-8').should.be.eql(
      '// file: configs/test-case.js - created at ' + timestamp + '\n' + 
      'function testCaseHandler(env) {\n' +
      '  var config = {\n' +
      '    development: {},\n' +
      '    production: {},\n' +
      '  };\n' +
      '\n' +
      '  return config[env];\n' +
      '}\n' +
      'module.exports = exports = testCaseHandler;\n' 
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
      'exports.testCase = require(\'./test-case\')(env);\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\')(env);\n'
    );
    fs.existsSync(path.resolve(dir, 'configs/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'configs/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: configs/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCaseHandler(env) {\n' +
      '  var config = {\n' +
      '    development: {},\n' +
      '    production: {},\n' +
      '  };\n' +
      '\n' +
      '  return config[env];\n' +
      '}\n' +
      'module.exports = exports = testAnotherCaseHandler;\n'
    );
    done();
  });
});

it('create a test if not exists test dir or index file', function (done) {
  agni.createTest(dir, 'test-case', function (err, timestamp) {
    should.not.exist(err); 
    should.exist(timestamp);
    console.log(timestamp);
    fs.existsSync(path.resolve(dir, 'tests/index.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'tests/index.js'), 'utf-8').should.be.eql(
      '// file: tests/index.js\n' +
      'exports.testCase = require(\'./test-case.test\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'tests/test-case.test.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'tests/test-case.test.js'), 'utf-8').should.be.eql(
      '// file: tests/test-case.test.js - created at ' + timestamp + '\n' + 
      'var should = require(\'should\');\n' +
      '\n' +
      'describe(\'testCase\', function () {\n' +
      '  it(\'\', function () {});\n' +
      '});\n'
    );
    done();
  });
});

it('fail to create test file on the structure', function (done) {
  agni.createTest(dir, 'test-case', function (err, timestamp) {
    err.should.be.eql('Impossible to create the file on that structure, verify the tests/ directory.'); 
    should.exist(timestamp);
    done();
  });
});

it('create a test if exists test dir or index file', function (done) {
  agni.createTest(dir, 'test-another-case', function (err, timestamp) {
    should.not.exist(err); 
    should.exist(timestamp);
    console.log(timestamp);
    fs.existsSync(path.resolve(dir, 'tests/index.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'tests/index.js'), 'utf-8').should.be.eql(
      '// file: tests/index.js\n' +
      'exports.testCase = require(\'./test-case.test\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case.test\');\n'
    );
    fs.existsSync(path.resolve(dir, 'tests/test-another-case.test.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'tests/test-another-case.test.js'), 'utf-8').should.be.eql(
      '// file: tests/test-another-case.test.js - created at ' + timestamp + '\n' + 
      'var should = require(\'should\');\n' +
      '\n' +
      'describe(\'testAnotherCase\', function () {\n' +
      '  it(\'\', function () {});\n' +
      '});\n'
    );
    done();
  });
});

it('create a job process if not exists job process dir or index file', function (done) {
  agni.createJobProcess(dir, 'test-case', function (err, timestamp) {
    should.not.exist(err); 
    should.exist(timestamp);
    console.log(timestamp);
    fs.existsSync(path.resolve(dir, 'jobs/index.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'jobs/index.js'), 'utf-8').should.be.eql(
      '// file: jobs/index.js\n' +
      'exports.testCase = require(\'./test-case\');\n'  
    );
    fs.existsSync(path.resolve(dir, 'jobs/test-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'jobs/test-case.js'), 'utf-8').should.be.eql(
      '// file: jobs/test-case.js - created at ' + timestamp + '\n' + 
      'function testCase(job, done) {\n' +
      '\n' +
      '}\n' +
      'module.exports = exports = testCase;\n'
    );
    done();
  });
});

it('fail to create job process file on the structure', function (done) {
  agni.createJobProcess(dir, 'test-case', function (err, timestamp) {
    err.should.be.eql('Impossible to create the file on that structure, verify the jobs/ directory.'); 
    should.exist(timestamp);
    done();
  });
});

it('create a job process if exists job dir or index file', function (done) {
  agni.createJobProcess(dir, 'test-another-case', function (err, timestamp) {
    should.not.exist(err); 
    should.exist(timestamp);
    console.log(timestamp);
    fs.existsSync(path.resolve(dir, 'jobs/index.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'jobs/index.js'), 'utf-8').should.be.eql(
      '// file: jobs/index.js\n' +
      'exports.testCase = require(\'./test-case\');\n' + 
      'exports.testAnotherCase = require(\'./test-another-case\');\n'
    );
    fs.existsSync(path.resolve(dir, 'jobs/test-another-case.js')).should.be.ok;
    fs.readFileSync(path.resolve(dir, 'jobs/test-another-case.js'), 'utf-8').should.be.eql(
      '// file: jobs/test-another-case.js - created at ' + timestamp + '\n' + 
      'function testAnotherCase(job, done) {\n' +
      '\n' +
      '}\n' +
      'module.exports = exports = testAnotherCase;\n'
    );
    done();
  });
});
