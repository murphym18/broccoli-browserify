var fs = require('fs');
var path = require('path');
var RSVP = require('rsvp');
var mkdirp = require('mkdirp');
var browserify = require('browserify')
var Writer = require('broccoli-writer');
var _ = require('underscore');

function BrowserifyWriter(inputTree, options) {
   if (!(this instanceof BrowserifyWriter)) {
      return new BrowserifyWriter(inputTree, options);
   }

   options = options || {};

   this.entries = options.entries || [];
   this.outputFile = options.outputFile || '/browserify.js';
   this.browserifyOptions = options.browserify || {};
   this.requireOptions = options.require || {};
   this.ignoreOptions = options.ignore || [];
   this.excludeOptions = options.exclude || [];
   this.transformOptions = options.transform || [];
   this.inputTree = inputTree;
}

BrowserifyWriter.prototype = Object.create(Writer.prototype);
BrowserifyWriter.prototype.constructor = BrowserifyWriter;

BrowserifyWriter.prototype.write = function(readTree, destDir) {
   var entries = this.entries;
   var outputFile = this.outputFile;
   var browserifyOptions = this.browserifyOptions;
   var requireOptions = this.requireOptions;
   var ignoreOptions = this.ignoreOptions;
   var excludeOptions = this.excludeOptions;
   var transformOptions = this.transformOptions;

   return readTree(this.inputTree).then(function(srcDir) {
      mkdirp.sync(path.join(destDir, path.dirname(outputFile)));

      browserifyOptions.basedir = srcDir;
      var b = browserify(browserifyOptions);

      for (var i = 0; i < entries.length; i++) {
         b.add(entries[i]);
      }
      for (var i = 0; i < requireOptions.length; i++) {
         b.require.apply(b, requireOptions[i]);
      }
      for (var i = 0; i < ignoreOptions.length; i++) {
         b.ignore(ignoreOptions[i]);
      }
      for (var i = 0; i < excludeOptions.length; i++) {
         b.exclude(excludeOptions[i]);
      }
      for (var i = 0; i < transformOptions.length; i++) {
         var element = transformOptions[i];
         if (_.isFunction(element)) {
            b.transform(element);
         } else if (_.isObject(element) && _.has(element, "tr")) {
            if (_.has(element, "options")) {
               b.transform(element.tr, element.options);
            } else {
               b.transform(element);
            }
         } else {
            throw new Error("Invalid element in transformOptions");
         }
      }

      return new RSVP.Promise(function(resolve, reject) {
         b.bundle(function(err, data) {
            if (err) {
               reject(err);
            } else {
               fs.writeFileSync(path.join(destDir,
                  outputFile), data);
               resolve(destDir);
            }
         });
      });
   });
};

module.exports = BrowserifyWriter;
