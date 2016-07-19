/*!
 * base-target (https://github.com/node-base/base-target)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(config) {
  return function(app) {
    if (!utils.isValid(this, 'base-target')) return;

    /**
     * Targets cache
     */

    this.targets = this.targets || {};
    var Target;

    /**
     * Add methods to the API
     */

    this.define({

      /**
       * Returns true if the given value is a valid `Target`.
       *
       * ```js
       * app.isTarget('foo');
       * //=> false
       *
       * var Target = require('expand-target');
       * var target = new Target();
       * app.isTarget(target);
       * //=> true
       * ```
       * @name .isTarget
       * @param {any} `val`
       * @return {Boolean}
       * @api public
       */

      isTarget: utils.Target.isTarget,

      /**
       * Get target `name` from `app.targets`, or set target `name` with the given `config`.
       *
       * ```js
       * app.target('foo', {
       *   options: {},
       *   files: {
       *     src: ['*'],
       *     dest: 'foo'
       *   }
       * });
       *
       * // or
       * var target = app.target('foo');
       * ```
       * @name .target
       * @param {String|Object|Function} `name`
       * @param {Object|Fucntion} `config`
       * @return {Object} Returns the app instance when setting a target, or the target instance when getting a target.
       * @api public
       */

      target: function(name, config) {
        if (!config && typeof name === 'string' || utils.isObject(name)) {
          return this.getTarget(name);
        }

        this.setTarget.apply(this, arguments);
        if (typeof name === 'string') {
          return this.getTarget(name);
        }
        return this;
      },

      /**
       * Add target `name` to `app.targets`.
       *
       * ```js
       * app.addTarget('foo', {
       *   options: {},
       *   files: {
       *     src: ['*'],
       *     dest: 'foo'
       *   }
       * });
       * ```
       * @name .setTarget
       * @param {String} `name`
       * @param {Object|Function} `config`
       * @api public
       */

      setTarget: function(name, target) {
        if (typeof name !== 'string') {
          throw new TypeError('expected the first argument to be a string');
        }
        if (utils.isObject(target)) {
          target.name = name;
        }
        this.targets[name] = target;
        return this;
      },

      /**
       * Get target `name` from `app.targets`, or return a normalized instance of `Target`
       * if an object or function is passed.
       *
       * ```js
       * var target = app.getTarget('foo');
       *
       * // or create an instance of `Target` using the given object
       * var target = app.getTarget({
       *   options: {},
       *   files: {
       *     src: ['*'],
       *     dest: 'foo'
       *   }
       * });
       * ```
       * @name .getTarget
       * @param {String} `name`
       * @param {Object} `options`
       * @api public
       */

      getTarget: function(name, options) {
        if (utils.isObject(name) && typeof options === 'function') {
          return this.getTarget(options, name);
        }

        var config;
        switch (utils.typeOf(name)) {
          case 'function':
            config = name;
            break;
          case 'object':
            config = name;
            name = config.name;
            break;
          case 'string':
          default: {
            config = this.targets[name];
            if (typeof config === 'undefined') {
              throw new Error(`target "${name}" is not registered`);
            }
            break;
          }
        }

        var opts = utils.merge({}, this.options, options);
        if (typeof name === 'string') {
          opts.name = name;
        }

        if (typeof config === 'function') {
          config = config.call(this, opts);
        }

        if (!utils.isObject(config)) {
          throw new TypeError('expected config to be an object');
        }

        var Target = this.get('Target');

        // if `config` is not an instance of Target, make it one
        if (!(config instanceof Target)) {
          var target = new Target(opts);
          target.options = utils.merge({}, this.options, target.options, options);
          if (typeof name === 'string') {
            target.name = name;
          }
          this.emit('target', target);
          target.on('files', this.emit.bind(this, 'files'));
          config = target.addFiles(config);
        }

        // otherwise, ensure options are merged onto the target,
        // and all targets are emitted
        else {
          config.options = utils.merge({}, this.options, config.options, options);
          if (typeof name === 'string') {
            config.name = name;
          }
          this.emit('target', config);
        }

        if (typeof this.run === 'function') {
          this.run(config);
        }
        return config;
      }
    });

    /**
     * Get or set the `Target` constructor. Exposed as a getter/setter to allow it to be
     * customized before or after instantiation.
     *
     * ```js
     * // set
     * app.Target = require('expand-target'); // or something custom
     *
     * // get
     * var target = new app.Target();
     * ```
     * @name app.Target
     * @api public
     */

    Object.defineProperty(this, 'Target', {
      configurable: true,
      set: function(val) {
        if (typeof val !== 'function') {
          throw new TypeError('expected Files to be a constructor function');
        }
        Target = val;
      },
      get: function() {
        return Target || this.options.Target || utils.Target;
      }
    });
  };
};
