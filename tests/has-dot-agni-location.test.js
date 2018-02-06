// file: tests/has-dot-aggain-location.test.js - created at 2015-01-01, 08:25
const should = require('should');
const aggain = require('../lib');
const path = require('path');

describe('hasDotAgniLocation', () => {
  before(() => {
  	this.dir = path.resolve(process.cwd(), './test/case');
  	this.dotAgniLocation = path.resolve(dir, '.agni');
  });

  it('should be has dot agni dir', () => {
    aggain.hasDotAgni('./tests/case').should.not.be.ok;
  });
});
