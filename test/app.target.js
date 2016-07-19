'use strict';

require('mocha');
var assert = require('assert');
var Target = require('expand-target');
var isObject = require('isobject');
var targets = require('..');
var App = require('base-app');
var app, target;

describe('.target', function() {
  beforeEach(function() {
    app = new App({isApp: true});
    app.use(targets());
  });

  describe('Target', function() {
    it('should return an instance of Target', function() {
      target = app.target({src: 'b.txt'});
      assert(target instanceof Target);
    });
  });

  describe('properties', function() {
    it('should set `target.name` when defined as a function', function() {
      target = app.target('abc', function(options) {
        return {
          options: options,
          foo: {src: 'b.txt'}
        };
      });
      assert.strictEqual(target.name, 'abc');
    });

    it('should set `target.name` when defined as a function with an instance of Target', function() {
      target = app.target('abc', function(options) {
        return new Target({
          options: options,
          foo: {src: 'b.txt'}
        });
      });
      assert.strictEqual(target.name, 'abc');
    });

    it('should set `target.name` when defined as a plain object', function() {
      target = app.target('abc', {src: 'b.txt'});
      assert.strictEqual(target.name, 'abc');
    });

    it('should set `target.name` when defined as an instance of Target', function() {
      target = app.target('abc', new Target({src: 'b.txt'}));
      assert.strictEqual(target.name, 'abc');
    });

    it('should return a target configuration when name is not a string', function() {
      target = app.target(new Target({src: 'b.txt'}));
      assert.equal(target.files[0].src, 'b.txt');
    });
  });

  describe('events', function() {
    it('should emit `target` when defined as a function', function() {
      var count = 0;
      app.on('target', function() {
        count++;
      });

      target = app.target('abc', function(options) {
        return {
          options: options,
          foo: {src: 'b.txt'}
        };
      });

      assert.equal(count, 1);
    });

    it('should have `target.name` when defined as a function', function() {
      var count = 0;
      app.on('target', function(target) {
        assert.equal(target.name, 'abc');
        count++;
      });

      target = app.target('abc', function(options) {
        return {
          options: options,
          foo: {src: 'b.txt'}
        };
      });

      assert.equal(count, 1);
    });

    it('should emit `target` when defined as a function with an instance of Target', function() {
      var count = 0;
      app.on('target', function() {
        count++;
      });

      target = app.target('abc', function(options) {
        return new Target({
          options: options,
          foo: {src: 'b.txt'}
        });
      });

      assert.equal(count, 1);
    });

    it('should have `target.name` when defined as an instance with a function', function() {
      var count = 0;
      app.on('target', function(target) {
        assert.equal(target.name, 'abc');
        count++;
      });

      target = app.target('abc', function(options) {
        return new Target({
          options: options,
          foo: {src: 'b.txt'}
        });
      });

      assert.equal(count, 1);
    });

    it('should have `target.name` when defined as a plain object', function() {
      var count = 0;
      app.on('target', function(target) {
        assert.equal(target.name, 'abc');
        count++;
      });

      target = app.target('abc', {src: 'b.txt'});
      assert.equal(count, 1);
    });

    it('should have `target.name` when defined as an instance of Target', function() {
      var count = 0;
      app.on('target', function(target) {
        assert.equal(target.name, 'abc');
        count++;
      });

      target = app.target('abc', new Target({src: 'b.txt'}));
      assert.equal(count, 1);
    });
  });

  describe('plain object', function() {
    it('should get a target from `app.target`', function() {
      app.target('abc', {src: 'b.txt'});
      assert(isObject(app.target('abc')));
      assert.strictEqual(app.target('abc').name, 'abc');
    });
  });

  describe('instance', function() {
    it('should get an instance of Target', function() {
      app.target('abc', new Target({src: 'b.txt'}));
      target = app.target('abc');
      assert(target instanceof Target);
    });
  });

  describe('function', function() {
    it('should create an instance from a function', function() {
      app.target('abc', function(options) {
        return {
          options: options,
          foo: {src: 'b.txt'}
        };
      });
      target = app.target('abc');
      assert(target instanceof Target);
    });

    it('should create an instance from a plain object', function() {
      app.target('abc', {src: 'b.txt'});
      target = app.target('abc');
      assert(target instanceof Target);
    });
  });
});

