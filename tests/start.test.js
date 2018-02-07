// file: tests/start.test.js - created at 2015-01-01, 08:38
const should = require('should');
const agni = require('../lib');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

describe('start', () => {
  let dir = path.resolve(process.cwd(), './tests/case/new-structure');
  let dotAgniLocation = path.resolve(dir, '.agni');

  global.fs = fs;
  global.path = path;
  global.agni = agni;
  global.dir = dir;
  global.dotAgniLocation = dotAgniLocation;

  /*it('start up the structure', function (done) {
    agni.start('./tests/case', 'new-structure', function(err) {
      should.not.exist(err);
      fs.existsSync(path.resolve(dir)).should.be.ok;
      fs.existsSync(path.resolve(dir, '.agni')).should.be.ok;
      done();
    });
  });*/

  //require('./cases');

  /*it('has dot agni location', function () {
    agni.hasDotAgni('./tests/case/new-structure').should.be.ok;
  });

  after(function () {
    exec('rm -rf ' + dotAgniLocation, console.log.bind(console));
    exec('rm -rf ' + dir + '/*', console.log.bind(console));
    exec('rm -rf ' + dir, console.log.bind(console));
  });*/
});
