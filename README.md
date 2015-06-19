# broccolify

Use `require('modules')` in the browser with
[browersify](https://https://github.com/substack/node-browserify)
and [broccoli](https://github.com/joliss/broccoli)

## Install

```
npm install --save-dev broccolify
```


## Example

```js
var browserify = require('broccolify');
tree = browserify(tree, options);
```


## API

### browserify(tree, options)

* `tree`: A [broccoli tree](https://github.com/broccolijs/broccoli#plugin-api-specification) or a directory path as a string

####Options

* `entries` : (default `[]`) Array of files to be used as entry points
* `outputFile`: (default `"./browserify.js"`) Output file
* `browserify` : (default `{}`) Options passed to the [browserify constructor](https://github.com/substack/node-browserify#var-b--browserifyfiles-or-opts)
* `require`: (default []) An array of file, option pairs
passed to [browserify require
method](https://github.com/substack/node-browserify#brequirefile-opts)

## Changelog

### 0.1.0

* Updated to use broccoli-writer instead of deprecated broccoli-transform (thanks mjijackson)
* Added require option to call browserify.require()
* Improved Readme file

### 0.0.1

* Initial release


## Contributors

* [Gareth Andrew](http://github.com/gingerhendrix)
* [Michael Jackson](http://github.com/mjijackson)
* [Derek Kastner](https://github.com/dkastner)


## License

MIT © Gareth Andrew
