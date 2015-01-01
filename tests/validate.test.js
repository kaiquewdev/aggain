// file: tests/validate.test.js - created at 2015-01-01, 08:34
var should = require('should');
var agni = require('../lib');
var path = require('path');

describe('validate', function () {
  var dir = path.resolve(process.cwd(), './test/case');
  var dotAgniLocation = path.resolve(dir, '.agni');

  it('should be validate a label with dash', function (done) {
    agni.validate('label', 'test-case').should.be.ok;
    done();
  });

  it('should be validate a label with camel case pattern', function (done) {
    agni.validate('label', 'testCase').should.be.not.ok;
    done();
  });

  it('should not be validate a label with space', function (done) {
    agni.validate('label', 'test case').should.be.not.ok;
    done();
  });
});
