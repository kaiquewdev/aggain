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

  it('start structure', function (done) {
    agni.start('./test/case', function(err) {
      should.not.exist(err);
      fs.existsSync(dotAgniLocation).should.be.ok;
      fs.existsSync(path.resolve(dotAgniLocation, 'templates')).should.be.ok;
      done();
    });
  });

  it('has dot agni location', function () {
    agni.hasDotAgni('./test/case').should.be.ok;
  });

  it('fail to create dot agni dir in an existing context', function (done) {
    agni.start('./test/case', function (err) {
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

  after(function () {
    exec('rm -rf ' + dotAgniLocation, console.log.bind(console));
    exec('rm -rf ' + dir + '/*', console.log.bind(console));
  });
});
