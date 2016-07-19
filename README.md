# base-target [![NPM version](https://img.shields.io/npm/v/base-target.svg?style=flat)](https://www.npmjs.com/package/base-target) [![NPM downloads](https://img.shields.io/npm/dm/base-target.svg?style=flat)](https://npmjs.org/package/base-target) [![Build Status](https://img.shields.io/travis/node-base/base-target.svg?style=flat)](https://travis-ci.org/node-base/base-target)

Plugin that adds support for defining declarative `target` configurations that directly map to functional tasks.

You might also be interested in [expand-target](https://github.com/jonschlinkert/expand-target).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-target
```

## Usage

Can be used with [gulp](http://gulpjs.com) or any supporting [base application](#compatibility).

```js
var target = require('base-target');
var each = require('base-files-each'); 
var Base = require('base-app');
var app = new Base();
app.use(target());
app.use(each());

// create a "target" configuration
var site = app.target('site', {
  options: {
    data: {
      site: { title: 'My Blog' }
    }
  },
  src: 'templates/*.hbs',
  dest: 'site',
});

// build the target
app.task('default', function(cb) {
  app.each(site, cb);
});
```

See the [expand-target](https://github.com/jonschlinkert/expand-target) library for additional information and API documentation.

## API

### [.isTarget](index.js#L47)

Returns true if the given value is a valid `Target`.

**Params**

* `val` **{any}**
* `returns` **{Boolean}**

**Example**

```js
app.isTarget('foo');
//=> false

var Target = require('expand-target');
var target = new Target();
app.isTarget(target);
//=> true
```

### [.target](index.js#L71)

Get target `name` from `app.targets`, or set target `name` with the given `config`.

**Params**

* `name` **{String|Object|Function}**
* `config` **{Object|Fucntion}**
* `returns` **{Object}**: Returns the app instance when setting a target, or the target instance when getting a target.

**Example**

```js
app.target('foo', {
  options: {},
  files: {
    src: ['*'],
    dest: 'foo'
  }
});

// or
var target = app.target('foo');
```

### [.setTarget](index.js#L101)

Add target `name` to `app.targets`.

**Params**

* `name` **{String}**
* `config` **{Object|Function}**

**Example**

```js
app.addTarget('foo', {
  options: {},
  files: {
    src: ['*'],
    dest: 'foo'
  }
});
```

### [.getTarget](index.js#L134)

Get target `name` from `app.targets`, or return a normalized instance of `Target` if an object or function is passed.

**Params**

* `name` **{String}**
* `options` **{Object}**

**Example**

```js
var target = app.getTarget('foo');

// or create an instance of `Target` using the given object
var target = app.getTarget({
  options: {},
  files: {
    src: ['*'],
    dest: 'foo'
  }
});
```

### [app.Target](index.js#L217)

Get or set the `Target` constructor. Exposed as a getter/setter to allow it to be customized before or after instantiation.

**Example**

```js
// set
app.Target = require('expand-target'); // or something custom

// get
var target = new app.Target();
```

## Compatibility

This plugin can be used with [base](https://github.com/node-base/base), or any of the following [base](https://github.com/node-base/base) applications:

* [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
* [update](https://www.npmjs.com/package/update): Be scalable! Update is a new, open source developer framework and CLI for automating updates… [more](https://github.com/update/update) | [homepage](https://github.com/update/update "Be scalable! Update is a new, open source developer framework and CLI for automating updates of any kind in code projects.")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

## About

### Related projects

* [base-boilerplate](https://www.npmjs.com/package/base-boilerplate): Plugin that adds support for generating project files from a declarative boilerplate configuration. | [homepage](https://github.com/node-base/base-boilerplate "Plugin that adds support for generating project files from a declarative boilerplate configuration.")
* [base-scaffold](https://www.npmjs.com/package/base-scaffold): Base plugin that adds support for generating files from a declarative scaffold configuration. | [homepage](https://github.com/node-base/base-scaffold "Base plugin that adds support for generating files from a declarative scaffold configuration.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-target/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 18, 2016._