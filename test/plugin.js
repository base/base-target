'use strict';

require('mocha');
var assert = require('assert');
var targets = require('..');
var App = require('base-app');
var app;

describe('.target', function() {
  beforeEach(function() {
    app = new App({isApp: true});
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'base-target') {
          count++;
        }
      });
      app.use(targets());
      app.use(targets());
      app.use(targets());
      assert.equal(count, 1);
      cb();
    });
  });
});

