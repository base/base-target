'use strict';

require('mocha');
var assert = require('assert');
var Target = require('expand-target');
var isObject = require('isobject');
var targets = require('..');
var App = require('base-app');
var app;

describe('.setTarget', function() {
  beforeEach(function() {
    app = new App({isApp: true});
    app.use(targets());
  });

  it('should set an instance of Target on app.targets', function() {
    app.setTarget('abc', new Target({src: 'b.txt'}));
    assert(app.targets.abc instanceof Target);
  });

  it('should not create an instance from a plain object', function() {
    app.setTarget('abc', {src: 'b.txt'});
    assert(!(app.targets.abc instanceof Target));
  });

  it('should get a target config from `app.targets`', function() {
    app.target('abc', {src: 'b.txt'});
    assert(isObject(app.targets.abc));
    assert.strictEqual(app.targets.abc.name, 'abc');
  });
});

