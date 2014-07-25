var should = require('should');
var agni = require('../lib');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

describe('Agni', function () {
  var dotAgniLocation = path.resolve(process.cwd(), '.agni');

  it('has dot agni location', function () {
    agni.hasDotAgni().should.not.be.ok;
  });

  it('start structure', function (done) {
    agni.start(function(err) {
      should.not.exist(err);
      fs.existsSync(dotAgniLocation).should.be.ok;
      fs.existsSync(path.resolve(dotAgniLocation, 'templates')).should.be.ok;
      done();
    });
  });

  it('has dot agni location', function () {
    agni.hasDotAgni().should.be.ok;
  });

  it('fail to create dot agni dir in an existing context', function (done) {
    agni.start(function (err) {
      fs.existsSync(dotAgniLocation).should.be.ok;
      err.should.be.eql('.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
      done();
    });
  });

  after(function () {
    exec('rm -rf ./.agni', console.log.bind(console));
  });
});
