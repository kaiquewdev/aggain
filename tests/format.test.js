// file: tests/format.test.js - created at 2015-01-01, 08:28
var should = require('should');
var agni = require('../lib');
var path = require('path');

describe('format', function () {
  var dir = path.resolve(process.cwd(), './test/case');
  var dotAgniLocation = path.resolve(dir, '.agni');

  it('should be transform label into a valid pattern', function (done) {
    agni.format('variable', 'test-case').should.be.eql('testCase');
    agni.format('variable', 'test_case').should.be.eql('testCase');
    agni.format('method', 'test-case').should.be.eql('testCaseHandler');
    agni.format('method', 'test_case').should.be.eql('testCaseHandler');
    agni.format('class', 'person').should.be.eql('Person');
    agni.format('class', 'test_case-class').should.be.eql('TestCaseClass');
    done();
  });
});
