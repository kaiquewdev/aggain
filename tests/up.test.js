// file: tests/up.test.js - created at 2015-01-01, 08:36
var should = require('should');
var agni = require('../lib');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

describe('up', function () {
  var dir = path.resolve(process.cwd(), './tests/case');
  var dotAgniLocation = path.resolve(dir, '.agni');

  global.fs = fs;
  global.path = path;
  global.agni = agni;
  global.dir = dir;
  global.dotAgniLocation = dotAgniLocation;

  /*it('fire up the egine', function (done) {
    agni.up('./tests/case', function(err) {
      should.not.exist(err);
      fs.existsSync(dotAgniLocation).should.be.ok;
      fs.existsSync(path.resolve(dotAgniLocation, 'templates')).should.be.ok;
      done();
    });
  });

  it('has dot agni location', function () {
    agni.hasDotAgni('./tests/case').should.be.ok;
  });*/

  //require('./cases');

  /*it('fail to create dot agni dir in an existing context with up', function (done) {
    agni.up('./tests/case', function (err) {
      fs.existsSync(dotAgniLocation).should.be.ok;
      err.should.be.eql('.agni exists in the ' + dotAgniLocation.replace('/.agni', ''));
      done();
    });
  });

  after(function () {
    exec('rm -rf ' + dotAgniLocation, console.log.bind(console));
    exec('rm -rf ' + dir + '/*', console.log.bind(console));
  });*/
});
