// file: tests/has-dot-agni-location.test.js - created at 2015-01-01, 08:25
var should = require('should');
var agni = require('../lib');
var path = require('path');

describe('hasDotAgniLocation', function () {
  var dir = path.resolve(process.cwd(), './test/case');
  var dotAgniLocation = path.resolve(dir, '.agni');

  it('should be has dot agni dir', function () {
    agni.hasDotAgni('./tests/case').should.not.be.ok;
  });
});
