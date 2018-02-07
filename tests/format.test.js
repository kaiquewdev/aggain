// file: tests/format.test.js - created at 2015-01-01, 08:28
const should = require('should');
const aggain = require('../lib');
const path = require('path');

describe('format', function () {
  before(() => {
    this.dir = path.resolve(process.cwd(), './test/case');
    this.dotAgniLocation = path.resolve(dir, '.agni');
  });

  it('should be transform label into a valid pattern', function (done) {
    aggain.format('variable', 'test-case').should.be.eql('testCase');
    aggain.format('variable', 'test_case').should.be.eql('testCase');
    aggain.format('method', 'test-case').should.be.eql('testCaseHandler');
    aggain.format('method', 'test_case').should.be.eql('testCaseHandler');
    aggain.format('class', 'person').should.be.eql('Person');
    aggain.format('class', 'test_case-class').should.be.eql('TestCaseClass');
    done();
  });

  it('should be transform a label into a valid pattern based on variable', done => {
    aggain.format('variable', 'test-case').should.be.eql('testCase');
    aggain.format('variable', 'test_case').should.be.eql('testCase');
    done();
  });

  it('should be transform a label in a valid pattern based on method', done => {
    aggain.format('method', 'test-case').should.be.eql('testCaseHandler');
    aggain.format('method', 'test_case').should.be.eql('testCaseHandler');
    done();
  });
});
