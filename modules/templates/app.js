// file: {{name}}.js - created at {{timestamp}}
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var {{variableName}} = express();

//var routes = require('./routes');

{{variableName}}.use(logger('dev'));
{{variableName}}.use(bodyParser.json());
{{variableName}}.use(bodyParser.urlencoded({ extended: false }));
{{variableName}}.use(cookieParser());

if ({{variableName}}.get('env') === 'development') {
  {{variableName}}.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}

{{variableName}}.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = {{variableName}};
