'use strict';

require('mocha');
var assert = require('assert');
var baseTarget = require('./');

describe('base-target', function() {
  it('should export a function', function() {
    assert.equal(typeof baseTarget, 'function');
  });

  it('should export an object', function() {
    assert(baseTarget);
    assert.equal(typeof baseTarget, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      baseTarget();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
