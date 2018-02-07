// file: tests/validate.test.js - created at 2015-01-01, 08:34
const should = require('should');
const aggain = require('../lib');
const path = require('path');

describe('validate', function () {
  before(() => {
    this.dir = path.resolve(process.cwd(), './test/case');
    this.dotAgniLocation = path.resolve(dir, '.agni');
  });

  it('should be validate a label with dash', done => {
    aggain.validate('label', 'test-case').should.be.ok;
    done();
  });

  it('should be validate a label with camel case pattern', done => {
    aggain.validate('label', 'testCase').should.be.not.ok;
    done();
  });

  it('should not be validate a label with space', done => {
    aggain.validate('label', 'test case').should.be.not.ok;
    done();
  });
});
