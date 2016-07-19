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
    app.setTarget('abc', new Target({foo: {src: 'b.txt'}}));
    assert(app.targets.abc instanceof Target);
  });

  it('should not create an instance from a plain object', function() {
    app.setTarget('abc', {foo: {src: 'b.txt'}});
    assert(!(app.targets.abc instanceof Target));
  });

  it('should set a target config on `app.targets`', function() {
    app.target('abc', {foo: {src: 'b.txt'}});
    assert(isObject(app.targets.abc));
    assert.strictEqual(app.targets.abc.name, 'abc');
  });
});

