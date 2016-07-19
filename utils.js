'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('is-valid-app', 'isValid');
require('isobject', 'isObject');
require('kind-of', 'typeOf');
require('mixin-deep', 'merge');
require('expand-target', 'Target');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
