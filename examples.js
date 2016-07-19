'use strict';

var target = require('./');
var Base = require('base-app');
var each = require('base-files-each');
var app = new Base({isApp: true});
var targets = require('./targets');
var gulp = require('gulp');

app.use(target());
app.use(each());

app.target('site', {
  options: {dot: true},
  files: {
    src: ['*.*'],
    dest: 'site'
  }
});

app.task('default', function(cb) {
  targets.stream(app, target)
    .on('error', cb)
    .on('end', cb);
});

