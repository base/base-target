# base-target [![NPM version](https://img.shields.io/npm/v/base-target.svg?style=flat)](https://www.npmjs.com/package/base-target) [![NPM downloads](https://img.shields.io/npm/dm/base-target.svg?style=flat)](https://npmjs.org/package/base-target) [![Build Status](https://img.shields.io/travis/node-base/base-target.svg?style=flat)](https://travis-ci.org/node-base/base-target)

Plugin that adds support for defining declarative `target` configurations that directly map to functional tasks.

You might also be interested in [expand-target](https://github.com/jonschlinkert/expand-target).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-target
```

## Usage

Can be used with any [base](https://github.com/node-base/base) application. See example [base applications](#base-apps).

```js
var target = require('base-target');
```

## Example

This example shows [generate](https://github.com/generate/generate), but this plugin can be used with any [base](https://github.com/node-base/base) application.

```js
var Generate = require('generate');
var Scaffold = require('target');
var target = new Scaffold();
var app = generate();

/**
 * Add a basic "target" to our target. Scaffolds are like
 * grunt "tasks" and can have any number of targets
 */

target.addTarget('abc', {
  options: {
    pipeline: generate.renderFile,
    data: {
      site: { title: 'My Blog' }
    }
  },
  src: 'templates/*.hbs',
  dest: 'site',
});

/**
 * Template engine for rendering handlebars templates
 */

app.engine('hbs', require('engine-handlebars'));

/**
 * Generate the target!
 */

app.target(target)
  .on('error', console.error)
  .on('data', console.log)
  .on('end', function() {
    console.log('done!');
  });
```

See the [expand-target](https://github.com/jonschlinkert/expand-target) library for additional information and API documentation.

## API

### [.isTarget](index.js#L53)

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

### [.target](index.js#L77)

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

### [.setTarget](index.js#L107)

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

### [.getTarget](index.js#L140)

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

### [.targetSeries](index.js#L223)

Asynchronously generate files from a declarative [target](https://github.com/jonschlinkert/expand-target) configuration.

**Params**

* `target` **{Object}**: Target configuration object.
* `next` **{Function}**: Optional callback function. If not passed, `.targetStream` will be called and a stream will be returned.

**Example**

```js
var Target = require('target');
var target = new Target({
  options: {cwd: 'source'},
  src: ['content/*.md']
});

app.targetSeries(target, function(err) {
  if (err) console.log(err);
});
```

### [.targetStream](index.js#L260)

Generate files from a declarative [target](https://github.com/jonschlinkert/expand-target) configuration.

**Params**

* `target` **{Object}**: [target](https://github.com/jonschlinkert/expand-target) configuration object.
* `returns` **{Stream}**: returns a stream with all processed files.

**Example**

```js
var Target = require('target');
var target = new Target({
  options: {},
  files: {
    src: ['*'],
    dest: 'foo'
  }
});

app.targetStream(target)
  .on('error', console.error)
  .on('end', function() {
    console.log('done!');
  });
```

### [Files](index.js#L280)

Get or set the `Files` constructor. Exposed as a getter/setter to allow it to be customized before or after instantiation.

**Example**

```js
// set
app.Files = CustomFilesFn;

// get
var target = new app.Files();
```

## Compatibility

This plugin can be used with [base](https://github.com/node-base/base), or any of the following [base](https://github.com/node-base/base) applications:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API docum")
* [generate](https://www.npmjs.com/package/generate): The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind of required file or document from any given templates or source materials.")
* [update](https://www.npmjs.com/package/update): Easily keep anything in your project up-to-date by installing the updaters you want to use… [more](https://github.com/update/update) | [homepage](https://github.com/update/update "Easily keep anything in your project up-to-date by installing the updaters you want to use and running `update` in the command line! Update the copyright date, licence type, ensure that a project uses your latest eslint or jshint configuration, remove dep")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

## Related projects

You might also be interested in these projects:

* [base-boilerplate](https://www.npmjs.com/package/base-boilerplate): Plugin that adds support for generating project files from a declarative boilerplate configuration. | [homepage](https://github.com/node-base/base-boilerplate "Plugin that adds support for generating project files from a declarative boilerplate configuration.")
* [base-scaffold](https://www.npmjs.com/package/base-scaffold): Base plugin that adds support for generating files from a declarative scaffold configuration. | [homepage](https://github.com/node-base/base-scaffold "Base plugin that adds support for generating files from a declarative scaffold configuration.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

_(This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-target/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 30, 2016._