(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Module dependencies.
 */

var rework = require('rework');
var vars = require('rework-vars')();
var extend = require('rework').extend();
var ruleBinding = require('rework-rule-binding');
var autoprefixer = require('autoprefixer');


/**
 * Exporse `Yacp`.
 */

module.exports = Yacp;


/**
 * Initialize a new Yacp with the given css `str`.
 *
 * @param {String} str
 * @param {Object} options
 */

function Yacp(str, options) {
  if (!(this instanceof Yacp)) {
    return new Yacp(str, options);
  }

  options = options || {};

  this.str = str;
  this.rework = rework(str);
  this.delegate(['use']);
}


/**
 * Delegate `methods` to rework.
 *
 * @return {String}
 */

Yacp.prototype.delegate = function(methods) {
  var self = this;
  methods.forEach(function(method) {
    self[method] = self.rework[method].bind(self.rework);
  });
}


/**
 * Return the compiled CSS.
 *
 * @return {String}
 */

Yacp.prototype.toString = function() {
  var self = this;
  if (checkDeclarations(self.rework)) {
    this.use(vars);
    this.use(extend);
    this.use(ruleBinding);

    var res = self.rework.toString();
    return autoprefixer().process(res);
  }
}


function checkDeclarations(reworkObj) {
  var check = 1;
  reworkObj.obj.stylesheet.rules.forEach(function(rule) {
    rule.declarations.forEach(function(declaration) {
      if (declaration.property.match(/^(inherit|extend)s?$/i)) {
        if (!declaration.value.match(/^\%.+?/)) {
          check = 0;
        }
      } else {
        return;
      }
    });
  });
  if (check) {
    return true;
  } else {
    var err =  new Error('YACP: only placeholder selectors can inherit.');
    throw err;
  }
}

},{"autoprefixer":4,"rework":72,"rework-rule-binding":69,"rework-vars":70}],2:[function(require,module,exports){
(function() {
  module.exports = {
    android: {
      prefix: "-webkit-",
      minor: true,
      versions: [4.4, 4.3, 4.2, 4.1, 4, 3, 2.3, 2.2, 2.1],
      popularity: [0.342673, 0.89871, 0.89871, 2.22414, 0.92457, 0.00646552, 1.15086, 0.0711207, 0.0258621]
    },
    bb: {
      prefix: "-webkit-",
      minor: true,
      versions: [10, 7],
      popularity: [0, 0.13409]
    },
    chrome: {
      prefix: "-webkit-",
      future: [36, 35, 34],
      versions: [33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4],
      popularity: [28.4597, 1.56618, 1.07395, 0.253572, 0.440022, 0.201366, 0.328152, 0.193908, 0.089496, 0.052206, 0.067122, 0.126786, 0.454938, 0.03729, 0.029832, 0.067122, 0.022374, 0.03729, 0.052206, 0.044748, 0.044748, 0.052206, 0.119328, 0.029832, 0.014916, 0.022374, 0.022374, 0.029832, 0.022374, 0.022374]
    },
    ff: {
      prefix: "-moz-",
      future: [31, 30, 29],
      versions: [28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3.6, 3.5, 3, 2],
      popularity: [1.82721, 10.2175, 0.454938, 0.171534, 0.238656, 0.119328, 0.11187, 0.156618, 0.096954, 0.082038, 0.089496, 0.11187, 0.156618, 0.096954, 0.067122, 0.067122, 0.156618, 0.067122, 0.082038, 0.03729, 0.052206, 0.029832, 0.03729, 0.029832, 0.044748, 0.201366, 0.029832, 0.096954, 0.014916]
    },
    ie: {
      prefix: "-ms-",
      versions: [11, 10, 9, 8, 7, 6, 5.5],
      popularity: [7.01035, 3.21991, 2.94638, 5.2519, 0.195383, 0.461104, 0.009298]
    },
    ios: {
      prefix: "-webkit-",
      versions: [7, 6.1, 6, 5.1, 5, 4.3, 4.2, 4.1, 4, 3.2],
      popularity: [4.68985, 0.397055, 0.397055, 0.120843, 0.120843, 0.01150885, 0.01150885, 0.0057544, 0.0057544, 0]
    },
    opera: {
      prefix: "-o-",
      future: [22, 21],
      versions: [20, 19, 18, 17, 16, 15, 12.1, 12, 11.6, 11.5, 11.1, 11, 10.6, 10.5, 10.1, 10, 9.6, 9.5],
      popularity: [0.350526, 0.11187, 0.044748, 0.014916, 0.014916, 0.014916, 0.365442, 0.029832, 0.022374, 0.007458, 0.008219, 0.022374, 0.007458, 0.008392, 0.011187, 0.011187, 0.003729, 0.003729]
    },
    safari: {
      prefix: "-webkit-",
      versions: [7, 6.1, 6, 5.1, 5, 4, 3.2, 3.1],
      popularity: [1.42448, 0.723426, 0.432564, 0.842754, 0.246114, 0.134244, 0.008692, 0]
    }
  };

}).call(this);

},{}],3:[function(require,module,exports){
(function() {
  module.exports = {
    "::placeholder": {
      selector: true,
      browsers: ["android 4.4", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4 old", "ff 5 old", "ff 6 old", "ff 7 old", "ff 8 old", "ff 9 old", "ff 10 old", "ff 11 old", "ff 12 old", "ff 13 old", "ff 14 old", "ff 15 old", "ff 16 old", "ff 17 old", "ff 18 old", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ie 10", "ie 11", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "::selection": {
      selector: true,
      browsers: ["ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31"]
    },
    ":fullscreen": {
      selector: true,
      browsers: ["chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ie 11", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "@keyframes": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "align-content": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "align-items": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "align-self": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    animation: {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-delay": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-direction": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-duration": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-fill-mode": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-iteration-count": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-name": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-play-state": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "animation-timing-function": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "backface-visibility": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "background-clip": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "ff 3.6", "opera 10", "opera 10.1"]
    },
    "background-origin": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "ff 3.6", "opera 10", "opera 10.1"]
    },
    "background-size": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "ff 3.6", "opera 10", "opera 10.1"]
    },
    "border-bottom-left-radius": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "chrome 4", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ios 3.2", "safari 3.1", "safari 3.2", "safari 4"],
      transition: true
    },
    "border-bottom-right-radius": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "chrome 4", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ios 3.2", "safari 3.1", "safari 3.2", "safari 4"],
      transition: true
    },
    "border-image": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 12.1", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1"]
    },
    "border-radius": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "chrome 4", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ios 3.2", "safari 3.1", "safari 3.2", "safari 4"],
      transition: true
    },
    "border-top-left-radius": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "chrome 4", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ios 3.2", "safari 3.1", "safari 3.2", "safari 4"],
      transition: true
    },
    "border-top-right-radius": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "chrome 4", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ios 3.2", "safari 3.1", "safari 3.2", "safari 4"],
      transition: true
    },
    "box-shadow": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "bb 7", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "ff 3.5", "ff 3.6", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "safari 3.1", "safari 3.2", "safari 4", "safari 5"],
      transition: true
    },
    "box-sizing": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "bb 7", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "safari 3.1", "safari 3.2", "safari 4", "safari 5"]
    },
    "break-after": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "break-before": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "break-inside": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    calc: {
      props: ["*"],
      browsers: ["bb 10", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 6", "ios 6.1", "safari 6"]
    },
    "column-count": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "column-fill": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "column-gap": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "column-rule": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "column-rule-color": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "column-rule-style": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "column-rule-width": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "column-span": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "column-width": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    columns: {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "display-flex": {
      props: ["display"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "fill-available": {
      props: ["width", "min-width", "max-width", "height", "min-height", "max-height"],
      browsers: ["android 4.4", "bb 10", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    filter: {
      browsers: ["android 4.4", "bb 10", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "fit-content": {
      props: ["width", "min-width", "max-width", "height", "min-height", "max-height"],
      browsers: ["android 4.4", "bb 10", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    flex: {
      transition: true,
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-basis": {
      transition: true,
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-direction": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-flow": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-grow": {
      transition: true,
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-shrink": {
      transition: true,
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "flex-wrap": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "font-feature-settings": {
      browsers: ["android 4.4", "bb 10", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    "font-kerning": {
      browsers: ["android 4.4", "bb 10", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    "font-language-override": {
      browsers: ["android 4.4", "bb 10", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    "font-variant-ligatures": {
      browsers: ["android 4.4", "bb 10", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    grab: {
      props: ["cursor"],
      browsers: ["bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    grabbing: {
      props: ["cursor"],
      browsers: ["bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    hyphens: {
      browsers: ["ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ie 10", "ie 11", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "inline-flex": {
      props: ["display"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "justify-content": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    "linear-gradient": {
      props: ["background", "background-image", "border-image"],
      mistakes: ["-ms-"],
      browsers: ["android 2.1 old", "android 2.2 old", "android 2.3 old", "android 3 old", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2 old", "ios 4 old", "ios 4.1 old", "ios 4.2 old", "ios 4.3 old", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 4 old", "safari 5 old", "safari 5.1", "safari 6"]
    },
    "max-content": {
      props: ["width", "min-width", "max-width", "height", "min-height", "max-height"],
      browsers: ["android 4.4", "bb 10", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    "min-content": {
      props: ["width", "min-width", "max-width", "height", "min-height", "max-height"],
      browsers: ["android 4.4", "bb 10", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 6.1", "safari 7"]
    },
    order: {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4 2009", "chrome 5 2009", "chrome 6 2009", "chrome 7 2009", "chrome 8 2009", "chrome 9 2009", "chrome 10 2009", "chrome 11 2009", "chrome 12 2009", "chrome 13 2009", "chrome 14 2009", "chrome 15 2009", "chrome 16 2009", "chrome 17 2009", "chrome 18 2009", "chrome 19 2009", "chrome 20 2009", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ie 10", "ios 3.2 2009", "ios 4 2009", "ios 4.1 2009", "ios 4.2 2009", "ios 4.3 2009", "ios 5 2009", "ios 5.1 2009", "ios 6 2009", "ios 6.1 2009", "ios 7", "opera 15", "opera 16", "safari 3.1 2009", "safari 3.2 2009", "safari 4 2009", "safari 5 2009", "safari 5.1 2009", "safari 6 2009", "safari 6.1 2009", "safari 7"]
    },
    perspective: {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "perspective-origin": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "radial-gradient": {
      props: ["background", "background-image", "border-image"],
      mistakes: ["-ms-"],
      browsers: ["android 2.1 old", "android 2.2 old", "android 2.3 old", "android 3 old", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2 old", "ios 4 old", "ios 4.1 old", "ios 4.2 old", "ios 4.3 old", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 4 old", "safari 5 old", "safari 5.1", "safari 6"]
    },
    "repeating-linear-gradient": {
      props: ["background", "background-image", "border-image"],
      mistakes: ["-ms-"],
      browsers: ["android 2.1 old", "android 2.2 old", "android 2.3 old", "android 3 old", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2 old", "ios 4 old", "ios 4.1 old", "ios 4.2 old", "ios 4.3 old", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 4 old", "safari 5 old", "safari 5.1", "safari 6"]
    },
    "repeating-radial-gradient": {
      props: ["background", "background-image", "border-image"],
      mistakes: ["-ms-"],
      browsers: ["android 2.1 old", "android 2.2 old", "android 2.3 old", "android 3 old", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2 old", "ios 4 old", "ios 4.1 old", "ios 4.2 old", "ios 4.3 old", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 4 old", "safari 5 old", "safari 5.1", "safari 6"]
    },
    sticky: {
      props: ["position"],
      browsers: ["ios 6", "ios 6.1", "ios 7", "safari 6.1", "safari 7"]
    },
    "tab-size": {
      browsers: ["ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 12.1"]
    },
    "text-decoration-color": {
      browsers: ["ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31"]
    },
    "text-decoration-line": {
      browsers: ["ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31"]
    },
    "text-decoration-style": {
      browsers: ["chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22"]
    },
    "touch-action": {
      browsers: ["ie 10"]
    },
    transform: {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "transform-origin": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"],
      transition: true
    },
    "transform-style": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ie 9", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    transition: {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6"]
    },
    "transition-delay": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6"]
    },
    "transition-duration": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6"]
    },
    "transition-property": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6"]
    },
    "transition-timing-function": {
      mistakes: ["-ms-"],
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "opera 10.5", "opera 10.6", "opera 11", "opera 11.1", "opera 11.5", "opera 11.6", "opera 12", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6"]
    },
    "user-select": {
      browsers: ["android 2.1", "android 2.2", "android 2.3", "android 3", "android 4", "android 4.1", "android 4.2", "android 4.3", "android 4.4", "bb 7", "bb 10", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31", "ie 10", "ie 11", "ios 3.2", "ios 4", "ios 4.1", "ios 4.2", "ios 4.3", "ios 5", "ios 5.1", "ios 6", "ios 6.1", "ios 7", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    wavy: {
      props: ["text-decoration", "text-decoration-style"],
      browsers: ["ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "ff 24", "ff 25", "ff 26", "ff 27", "ff 28", "ff 29", "ff 30", "ff 31"]
    },
    "zoom-in": {
      props: ["cursor"],
      browsers: ["bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    },
    "zoom-out": {
      props: ["cursor"],
      browsers: ["bb 7", "bb 10", "chrome 4", "chrome 5", "chrome 6", "chrome 7", "chrome 8", "chrome 9", "chrome 10", "chrome 11", "chrome 12", "chrome 13", "chrome 14", "chrome 15", "chrome 16", "chrome 17", "chrome 18", "chrome 19", "chrome 20", "chrome 21", "chrome 22", "chrome 23", "chrome 24", "chrome 25", "chrome 26", "chrome 27", "chrome 28", "chrome 29", "chrome 30", "chrome 31", "chrome 32", "chrome 33", "chrome 34", "chrome 35", "chrome 36", "ff 2", "ff 3", "ff 3.5", "ff 3.6", "ff 4", "ff 5", "ff 6", "ff 7", "ff 8", "ff 9", "ff 10", "ff 11", "ff 12", "ff 13", "ff 14", "ff 15", "ff 16", "ff 17", "ff 18", "ff 19", "ff 20", "ff 21", "ff 22", "ff 23", "opera 15", "opera 16", "opera 17", "opera 18", "opera 19", "opera 20", "opera 21", "opera 22", "safari 3.1", "safari 3.2", "safari 4", "safari 5", "safari 5.1", "safari 6", "safari 6.1", "safari 7"]
    }
  };

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var Autoprefixer, Browsers, Prefixes, autoprefixer, infoCache, isPlainObject, postcss,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  postcss = require('postcss');

  Browsers = require('./browsers');

  Prefixes = require('./prefixes');

  infoCache = null;

  isPlainObject = function(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
  };

  autoprefixer = function() {
    var browsers, options, prefixes, reqs;
    reqs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
      options = reqs[0];
      reqs = void 0;
    } else if (reqs.length === 0 || (reqs.length === 1 && (reqs[0] == null))) {
      reqs = void 0;
    } else if (reqs.length <= 2 && (reqs[0] instanceof Array || (reqs[0] == null))) {
      options = reqs[1];
      reqs = reqs[0];
    } else if (typeof reqs[reqs.length - 1] === 'object') {
      options = reqs.pop();
    }
    if (reqs == null) {
      reqs = autoprefixer["default"];
    }
    browsers = new Browsers(autoprefixer.data.browsers, reqs);
    prefixes = new Prefixes(autoprefixer.data.prefixes, browsers, options);
    return new Autoprefixer(prefixes, autoprefixer.data);
  };

  autoprefixer.data = {
    browsers: require('../data/browsers'),
    prefixes: require('../data/prefixes')
  };

  Autoprefixer = (function() {
    function Autoprefixer(prefixes, data, options) {
      this.prefixes = prefixes;
      this.data = data;
      this.options = options != null ? options : {};
      this.postcss = __bind(this.postcss, this);
      this.browsers = this.prefixes.browsers.selected;
    }

    Autoprefixer.prototype.process = function(str, options) {
      if (options == null) {
        options = {};
      }
      return this.processor().process(str, options);
    };

    Autoprefixer.prototype.postcss = function(css) {
      this.prefixes.processor.remove(css);
      return this.prefixes.processor.add(css);
    };

    Autoprefixer.prototype.info = function() {
      infoCache || (infoCache = require('./info'));
      return infoCache(this.prefixes);
    };

    Autoprefixer.prototype.processor = function() {
      return this.processorCache || (this.processorCache = postcss(this.postcss));
    };

    return Autoprefixer;

  })();

  autoprefixer["default"] = ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'];

  autoprefixer.loadDefault = function() {
    return this.defaultCache || (this.defaultCache = autoprefixer(this["default"]));
  };

  autoprefixer.process = function(str, options) {
    if (options == null) {
      options = {};
    }
    return this.loadDefault().process(str, options);
  };

  autoprefixer.compile = function(str, options) {
    if (options == null) {
      options = {};
    }
    return this.loadDefault().compile(str, options);
  };

  autoprefixer.postcss = function(css) {
    return this.loadDefault().postcss(css);
  };

  autoprefixer.info = function() {
    return this.loadDefault().info();
  };

  module.exports = autoprefixer;

}).call(this);

},{"../data/browsers":2,"../data/prefixes":3,"./browsers":5,"./info":32,"./prefixes":37,"postcss":51}],5:[function(require,module,exports){
(function() {
  var Browsers, utils;

  utils = require('./utils');

  Browsers = (function() {
    Browsers.prefixes = function() {
      var data, i, name;
      if (this.prefixesCache) {
        return this.prefixesCache;
      }
      data = require('../data/browsers');
      return this.prefixesCache = utils.uniq((function() {
        var _results;
        _results = [];
        for (name in data) {
          i = data[name];
          _results.push(i.prefix);
        }
        return _results;
      })()).sort(function(a, b) {
        return b.length - a.length;
      });
    };

    Browsers.withPrefix = function(value) {
      if (!this.prefixesRegexp) {
        this.prefixesRegexp = RegExp("" + (this.prefixes().join('|')));
      }
      return this.prefixesRegexp.test(value);
    };

    function Browsers(data, requirements) {
      this.data = data;
      this.selected = this.parse(requirements);
    }

    Browsers.prototype.parse = function(requirements) {
      var selected;
      if (!(requirements instanceof Array)) {
        requirements = [requirements];
      }
      selected = [];
      requirements.map((function(_this) {
        return function(req) {
          var i, match, name, _ref;
          _ref = _this.requirements;
          for (name in _ref) {
            i = _ref[name];
            if (match = req.match(i.regexp)) {
              selected = selected.concat(i.select.apply(_this, match.slice(1)));
              return;
            }
          }
          return utils.error("Unknown browser requirement `" + req + "`");
        };
      })(this));
      return utils.uniq(selected);
    };

    Browsers.prototype.aliases = {
      fx: 'ff',
      firefox: 'ff',
      explorer: 'ie',
      blackberry: 'bb'
    };

    Browsers.prototype.requirements = {
      none: {
        regexp: /^none$/i,
        select: function() {
          return [];
        }
      },
      lastVersions: {
        regexp: /^last (\d+) versions?$/i,
        select: function(versions) {
          return this.browsers(function(data) {
            if (data.minor) {
              return [];
            } else {
              return data.versions.slice(0, versions);
            }
          });
        }
      },
      lastByBrowser: {
        regexp: /^last (\d+) (\w+) versions?$/i,
        select: function(versions, browser) {
          var data;
          data = this.byName(browser);
          return data.versions.slice(0, versions).map(function(v) {
            return "" + data.name + " " + v;
          });
        }
      },
      globalStatistics: {
        regexp: /^> (\d+(\.\d+)?)%$/,
        select: function(popularity) {
          return this.browsers(function(data) {
            return data.versions.filter(function(version, i) {
              return data.popularity[i] > popularity;
            });
          });
        }
      },
      newerThen: {
        regexp: /^(\w+) (>=?)\s*([\d\.]+)/,
        select: function(browser, sign, version) {
          var data, filter;
          data = this.byName(browser);
          version = parseFloat(version);
          if (sign === '>') {
            filter = function(v) {
              return v > version;
            };
          } else if (sign === '>=') {
            filter = function(v) {
              return v >= version;
            };
          }
          return data.versions.filter(filter).map(function(v) {
            return "" + data.name + " " + v;
          });
        }
      },
      esr: {
        regexp: /^(firefox|ff|fx) esr$/i,
        select: function() {
          return ['ff 24'];
        }
      },
      direct: {
        regexp: /^(\w+) ([\d\.]+)$/,
        select: function(browser, version) {
          var data, first, last;
          data = this.byName(browser);
          version = parseFloat(version);
          last = data.future ? data.future[0] : data.versions[0];
          first = data.versions[data.versions.length - 1];
          if (version > last) {
            version = last;
          } else if (version < first) {
            version = first;
          }
          return ["" + data.name + " " + version];
        }
      }
    };

    Browsers.prototype.browsers = function(criteria) {
      var browser, data, selected, versions, _ref;
      selected = [];
      _ref = this.data;
      for (browser in _ref) {
        data = _ref[browser];
        versions = criteria(data).map(function(version) {
          return "" + browser + " " + version;
        });
        selected = selected.concat(versions);
      }
      return selected;
    };

    Browsers.prototype.prefix = function(browser) {
      var name, version, _ref;
      _ref = browser.split(' '), name = _ref[0], version = _ref[1];
      if (name === 'opera' && parseFloat(version) >= 15) {
        return '-webkit-';
      } else {
        return this.data[name].prefix;
      }
    };

    Browsers.prototype.isSelected = function(browser) {
      return this.selected.indexOf(browser) !== -1;
    };

    Browsers.prototype.byName = function(name) {
      var data;
      name = name.toLowerCase();
      name = this.aliases[name] || name;
      data = this.data[name];
      if (!data) {
        utils.error("Unknown browser " + browser);
      }
      data.name = name;
      return data;
    };

    return Browsers;

  })();

  module.exports = Browsers;

}).call(this);

},{"../data/browsers":2,"./utils":40}],6:[function(require,module,exports){
(function() {
  var Browsers, Declaration, Prefixer, utils, vendor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  vendor = require('postcss/lib/vendor');

  utils = require('./utils');

  Declaration = (function(_super) {
    __extends(Declaration, _super);

    function Declaration() {
      return Declaration.__super__.constructor.apply(this, arguments);
    }

    Declaration.prototype.check = function(decl) {
      return true;
    };

    Declaration.prototype.prefixed = function(prop, prefix) {
      return prefix + prop;
    };

    Declaration.prototype.normalize = function(prop) {
      return prop;
    };

    Declaration.prototype.otherPrefixes = function(value, prefix) {
      var other, _i, _len, _ref;
      _ref = Browsers.prefixes();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        other = _ref[_i];
        if (other === prefix) {
          continue;
        }
        if (value.indexOf(other) !== -1) {
          return true;
        }
      }
      return false;
    };

    Declaration.prototype.set = function(decl, prefix) {
      decl.prop = this.prefixed(decl.prop, prefix);
      return decl;
    };

    Declaration.prototype.needCascade = function(decl) {
      return decl._autoprefixerCascade || (decl._autoprefixerCascade = !!this.all.options.cascade && decl.before.indexOf("\n") !== -1);
    };

    Declaration.prototype.maxPrefixed = function(prefixes, decl) {
      var max, prefix, _i, _len;
      if (decl._autoprefixerMax) {
        return decl._autoprefixerMax;
      }
      max = 0;
      for (_i = 0, _len = prefixes.length; _i < _len; _i++) {
        prefix = prefixes[_i];
        prefix = utils.removeNote(prefix);
        if (prefix.length > max) {
          max = prefix.length;
        }
      }
      return decl._autoprefixerMax = max;
    };

    Declaration.prototype.calcBefore = function(prefixes, decl, prefix) {
      var before, diff, i, max, _i;
      if (prefix == null) {
        prefix = '';
      }
      before = decl.before;
      max = this.maxPrefixed(prefixes, decl);
      diff = max - utils.removeNote(prefix).length;
      for (i = _i = 0; 0 <= diff ? _i < diff : _i > diff; i = 0 <= diff ? ++_i : --_i) {
        before += ' ';
      }
      return before;
    };

    Declaration.prototype.restoreBefore = function(decl) {
      var lines, min;
      lines = decl.before.split("\n");
      min = lines[lines.length - 1];
      this.all.group(decl).up(function(prefixed) {
        var array, last;
        array = prefixed.before.split("\n");
        last = array[array.length - 1];
        if (last.length < min.length) {
          return min = last;
        }
      });
      lines[lines.length - 1] = min;
      return decl.before = lines.join("\n");
    };

    Declaration.prototype.insert = function(decl, prefix, prefixes) {
      var cloned;
      cloned = this.set(this.clone(decl), prefix);
      if (!cloned) {
        return;
      }
      if (this.needCascade(decl)) {
        cloned.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned);
    };

    Declaration.prototype.add = function(decl, prefix, prefixes) {
      var already, prefixed;
      prefixed = this.prefixed(decl.prop, prefix);
      already = this.all.group(decl).up(function(i) {
        return i.prop === prefixed;
      });
      already || (already = this.all.group(decl).down(function(i) {
        return i.prop === prefixed;
      }));
      if (already || this.otherPrefixes(decl.value, prefix)) {
        return;
      }
      return this.insert(decl, prefix, prefixes);
    };

    Declaration.prototype.process = function(decl) {
      var prefixes;
      if (this.needCascade(decl)) {
        this.restoreBefore(decl);
        if (prefixes = Declaration.__super__.process.apply(this, arguments)) {
          return decl.before = this.calcBefore(prefixes, decl);
        }
      } else {
        return Declaration.__super__.process.apply(this, arguments);
      }
    };

    Declaration.prototype.old = function(prop, prefix) {
      return [this.prefixed(prop, prefix)];
    };

    return Declaration;

  })(Prefixer);

  module.exports = Declaration;

}).call(this);

},{"./browsers":5,"./prefixer":36,"./utils":40,"postcss/lib/vendor":57}],7:[function(require,module,exports){
(function() {
  var AlignContent, Declaration, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignContent = (function(_super) {
    __extends(AlignContent, _super);

    function AlignContent() {
      return AlignContent.__super__.constructor.apply(this, arguments);
    }

    AlignContent.names = ['align-content', 'flex-line-pack'];

    AlignContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    AlignContent.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012) {
        return prefix + 'flex-line-pack';
      } else {
        return AlignContent.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignContent.prototype.normalize = function(prop) {
      return 'align-content';
    };

    AlignContent.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignContent.oldValues[decl.value] || decl.value;
        return AlignContent.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignContent.__super__.set.apply(this, arguments);
      }
    };

    return AlignContent;

  })(Declaration);

  module.exports = AlignContent;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],8:[function(require,module,exports){
(function() {
  var AlignItems, Declaration, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignItems = (function(_super) {
    __extends(AlignItems, _super);

    function AlignItems() {
      return AlignItems.__super__.constructor.apply(this, arguments);
    }

    AlignItems.names = ['align-items', 'flex-align', 'box-align'];

    AlignItems.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignItems.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return prefix + 'box-align';
      } else if (spec === 2012) {
        return prefix + 'flex-align';
      } else {
        return AlignItems.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignItems.prototype.normalize = function(prop) {
      return 'align-items';
    };

    AlignItems.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        decl.value = AlignItems.oldValues[decl.value] || decl.value;
        return AlignItems.__super__.set.call(this, decl, prefix);
      } else {
        return AlignItems.__super__.set.apply(this, arguments);
      }
    };

    return AlignItems;

  })(Declaration);

  module.exports = AlignItems;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],9:[function(require,module,exports){
(function() {
  var AlignSelf, Declaration, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignSelf = (function(_super) {
    __extends(AlignSelf, _super);

    function AlignSelf() {
      return AlignSelf.__super__.constructor.apply(this, arguments);
    }

    AlignSelf.names = ['align-self', 'flex-item-align'];

    AlignSelf.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignSelf.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012) {
        return prefix + 'flex-item-align';
      } else {
        return AlignSelf.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignSelf.prototype.normalize = function(prop) {
      return 'align-self';
    };

    AlignSelf.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignSelf.oldValues[decl.value] || decl.value;
        return AlignSelf.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignSelf.__super__.set.apply(this, arguments);
      }
    };

    return AlignSelf;

  })(Declaration);

  module.exports = AlignSelf;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],10:[function(require,module,exports){
(function() {
  var BorderImage, Declaration,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Declaration = require('../declaration');

  BorderImage = (function(_super) {
    __extends(BorderImage, _super);

    function BorderImage() {
      return BorderImage.__super__.constructor.apply(this, arguments);
    }

    BorderImage.names = ['border-image'];

    BorderImage.prototype.set = function(decl, prefix) {
      decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
      return BorderImage.__super__.set.call(this, decl, prefix);
    };

    return BorderImage;

  })(Declaration);

  module.exports = BorderImage;

}).call(this);

},{"../declaration":6}],11:[function(require,module,exports){
(function() {
  var BorderRadius, Declaration,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Declaration = require('../declaration');

  BorderRadius = (function(_super) {
    var hor, mozilla, normal, ver, _i, _j, _len, _len1, _ref, _ref1;

    __extends(BorderRadius, _super);

    function BorderRadius() {
      return BorderRadius.__super__.constructor.apply(this, arguments);
    }

    BorderRadius.names = ['border-radius'];

    BorderRadius.toMozilla = {};

    BorderRadius.toNormal = {};

    _ref = ['top', 'bottom'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ver = _ref[_i];
      _ref1 = ['left', 'right'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        hor = _ref1[_j];
        normal = "border-" + ver + "-" + hor + "-radius";
        mozilla = "border-radius-" + ver + hor;
        BorderRadius.names.push(normal);
        BorderRadius.names.push(mozilla);
        BorderRadius.toMozilla[normal] = mozilla;
        BorderRadius.toNormal[mozilla] = normal;
      }
    }

    BorderRadius.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-moz-') {
        return prefix + (BorderRadius.toMozilla[prop] || prop);
      } else {
        return BorderRadius.__super__.prefixed.apply(this, arguments);
      }
    };

    BorderRadius.prototype.normalize = function(prop) {
      return BorderRadius.toNormal[prop] || prop;
    };

    return BorderRadius;

  })(Declaration);

  module.exports = BorderRadius;

}).call(this);

},{"../declaration":6}],12:[function(require,module,exports){
(function() {
  var BreakInside, Declaration,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Declaration = require('../declaration');

  BreakInside = (function(_super) {
    __extends(BreakInside, _super);

    function BreakInside() {
      return BreakInside.__super__.constructor.apply(this, arguments);
    }

    BreakInside.names = ['break-inside', 'page-break-inside', 'column-break-inside'];

    BreakInside.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-webkit-') {
        return prefix + 'column-break-inside';
      } else if (prefix === '-moz-') {
        return 'page-break-inside';
      } else {
        return BreakInside.__super__.prefixed.apply(this, arguments);
      }
    };

    BreakInside.prototype.normalize = function() {
      return 'break-inside';
    };

    BreakInside.prototype.set = function(decl, prefix) {
      if (decl.value === 'avoid-column' || decl.value === 'avoid-page') {
        decl.value = 'avoid';
      }
      return BreakInside.__super__.set.apply(this, arguments);
    };

    BreakInside.prototype.insert = function(decl, prefix, prefixes) {
      if (decl.value === 'avoid-region') {

      } else if (decl.value === 'avoid-page' && prefix === '-webkit-') {

      } else {
        return BreakInside.__super__.insert.apply(this, arguments);
      }
    };

    return BreakInside;

  })(Declaration);

  module.exports = BreakInside;

}).call(this);

},{"../declaration":6}],13:[function(require,module,exports){
(function() {
  var DisplayFlex, OldDisplayFlex, OldValue, Value, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  OldValue = require('../old-value');

  Value = require('../value');

  OldDisplayFlex = (function(_super) {
    __extends(OldDisplayFlex, _super);

    function OldDisplayFlex(name) {
      this.name = name;
    }

    OldDisplayFlex.prototype.check = function(value) {
      return value === this.name;
    };

    return OldDisplayFlex;

  })(OldValue);

  DisplayFlex = (function(_super) {
    __extends(DisplayFlex, _super);

    DisplayFlex.names = ['display-flex', 'inline-flex'];

    function DisplayFlex(name, prefixes) {
      DisplayFlex.__super__.constructor.apply(this, arguments);
      if (name === 'display-flex') {
        this.name = 'flex';
      }
    }

    DisplayFlex.prototype.check = function(decl) {
      return decl.value === this.name;
    };

    DisplayFlex.prototype.prefixed = function(prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009 && this.name === 'inline-flex') {
        return;
      }
      return prefix + (spec === 2009 ? 'box' : spec === 2012 ? this.name === 'flex' ? 'flexbox' : 'inline-flexbox' : spec === 'final' ? this.name : void 0);
    };

    DisplayFlex.prototype.replace = function(string, prefix) {
      return this.prefixed(prefix);
    };

    DisplayFlex.prototype.old = function(prefix) {
      var prefixed;
      prefixed = this.prefixed(prefix);
      if (prefixed) {
        return new OldValue(prefixed);
      }
    };

    return DisplayFlex;

  })(Value);

  module.exports = DisplayFlex;

}).call(this);

},{"../old-value":35,"../value":41,"./flex-spec":21}],14:[function(require,module,exports){
(function() {
  var FillAvailable, OldValue, Value,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OldValue = require('../old-value');

  Value = require('../value');

  FillAvailable = (function(_super) {
    __extends(FillAvailable, _super);

    function FillAvailable() {
      return FillAvailable.__super__.constructor.apply(this, arguments);
    }

    FillAvailable.names = ['fill-available'];

    FillAvailable.prototype.replace = function(string, prefix) {
      if (prefix === '-moz-') {
        return string.replace(this.regexp(), '$1-moz-available$3');
      } else {
        return FillAvailable.__super__.replace.apply(this, arguments);
      }
    };

    FillAvailable.prototype.old = function(prefix) {
      if (prefix === '-moz-') {
        return new OldValue('-moz-available');
      } else {
        return FillAvailable.__super__.old.apply(this, arguments);
      }
    };

    return FillAvailable;

  })(Value);

  module.exports = FillAvailable;

}).call(this);

},{"../old-value":35,"../value":41}],15:[function(require,module,exports){
(function() {
  var Declaration, Filter,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Declaration = require('../declaration');

  Filter = (function(_super) {
    __extends(Filter, _super);

    function Filter() {
      return Filter.__super__.constructor.apply(this, arguments);
    }

    Filter.names = ['filter'];

    Filter.prototype.check = function(decl) {
      var v;
      v = decl.value;
      return v.toLowerCase().indexOf('alpha(') === -1 && v.indexOf('DXImageTransform.Microsoft') === -1;
    };

    return Filter;

  })(Declaration);

  module.exports = Filter;

}).call(this);

},{"../declaration":6}],16:[function(require,module,exports){
(function() {
  var Declaration, FlexBasis, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexBasis = (function(_super) {
    __extends(FlexBasis, _super);

    function FlexBasis() {
      return FlexBasis.__super__.constructor.apply(this, arguments);
    }

    FlexBasis.names = ['flex-basis', 'flex-preferred-size'];

    FlexBasis.prototype.normalize = function() {
      return 'flex-basis';
    };

    FlexBasis.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012) {
        return prefix + 'flex-preferred-size';
      } else {
        return FlexBasis.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexBasis.prototype.set = function(decl, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexBasis.__super__.set.apply(this, arguments);
      }
    };

    return FlexBasis;

  })(Declaration);

  module.exports = FlexBasis;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],17:[function(require,module,exports){
(function() {
  var Declaration, FlexDirection, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexDirection = (function(_super) {
    __extends(FlexDirection, _super);

    function FlexDirection() {
      return FlexDirection.__super__.constructor.apply(this, arguments);
    }

    FlexDirection.names = ['flex-direction', 'box-direction', 'box-orient'];

    FlexDirection.prototype.normalize = function(prop) {
      return 'flex-direction';
    };

    FlexDirection.prototype.insert = function(decl, prefix, prefixes) {
      var already, cloned, dir, orient, spec, value, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        already = decl.parent.some(function(i) {
          return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
        });
        if (already) {
          return;
        }
        value = decl.value;
        orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
        dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-orient';
        cloned.value = orient;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        decl.parent.insertBefore(decl, cloned);
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-direction';
        cloned.value = dir;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        return decl.parent.insertBefore(decl, cloned);
      } else {
        return FlexDirection.__super__.insert.apply(this, arguments);
      }
    };

    FlexDirection.prototype.old = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return [prefix + 'box-orient', prefix + 'box-direction'];
      } else {
        return FlexDirection.__super__.old.apply(this, arguments);
      }
    };

    return FlexDirection;

  })(Declaration);

  module.exports = FlexDirection;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],18:[function(require,module,exports){
(function() {
  var Declaration, FlexFlow, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexFlow = (function(_super) {
    __extends(FlexFlow, _super);

    function FlexFlow() {
      return FlexFlow.__super__.constructor.apply(this, arguments);
    }

    FlexFlow.names = ['flex-flow'];

    FlexFlow.prototype.set = function(decl, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012) {
        return FlexFlow.__super__.set.apply(this, arguments);
      } else if (spec === 'final') {
        return FlexFlow.__super__.set.apply(this, arguments);
      }
    };

    return FlexFlow;

  })(Declaration);

  module.exports = FlexFlow;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],19:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Flex = (function(_super) {
    __extends(Flex, _super);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex-grow', 'flex-positive'];

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else if (spec === 2012) {
        return prefix + 'flex-positive';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],20:[function(require,module,exports){
(function() {
  var Declaration, FlexShrink, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexShrink = (function(_super) {
    __extends(FlexShrink, _super);

    function FlexShrink() {
      return FlexShrink.__super__.constructor.apply(this, arguments);
    }

    FlexShrink.names = ['flex-shrink', 'flex-negative'];

    FlexShrink.prototype.normalize = function() {
      return 'flex-shrink';
    };

    FlexShrink.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012) {
        return prefix + 'flex-negative';
      } else {
        return FlexShrink.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexShrink.prototype.set = function(decl, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexShrink.__super__.set.apply(this, arguments);
      }
    };

    return FlexShrink;

  })(Declaration);

  module.exports = FlexShrink;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],21:[function(require,module,exports){
(function() {
  module.exports = function(prefix) {
    var spec;
    spec = prefix === '-webkit- 2009' || prefix === '-moz-' ? 2009 : prefix === '-ms-' ? 2012 : prefix === '-webkit-' ? 'final' : void 0;
    if (prefix === '-webkit- 2009') {
      prefix = '-webkit-';
    }
    return [spec, prefix];
  };

}).call(this);

},{}],22:[function(require,module,exports){
(function() {
  var Declaration, FlexWrap, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexWrap = (function(_super) {
    __extends(FlexWrap, _super);

    function FlexWrap() {
      return FlexWrap.__super__.constructor.apply(this, arguments);
    }

    FlexWrap.names = ['flex-wrap'];

    FlexWrap.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec !== 2009) {
        return FlexWrap.__super__.set.apply(this, arguments);
      }
    };

    return FlexWrap;

  })(Declaration);

  module.exports = FlexWrap;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],23:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Flex = (function(_super) {
    __extends(Flex, _super);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex', 'box-flex'];

    Flex.oldValues = {
      'auto': '1',
      'none': '0'
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = decl.value.split(' ')[0];
        decl.value = Flex.oldValues[decl.value] || decl.value;
        return Flex.__super__.set.call(this, decl, prefix);
      } else {
        return Flex.__super__.set.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],24:[function(require,module,exports){
(function() {
  var Fullscreen, Selector,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Selector = require('../selector');

  Fullscreen = (function(_super) {
    __extends(Fullscreen, _super);

    function Fullscreen() {
      return Fullscreen.__super__.constructor.apply(this, arguments);
    }

    Fullscreen.names = [':fullscreen'];

    Fullscreen.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return ':-webkit-full-screen';
      } else if ('-moz-' === prefix) {
        return ':-moz-full-screen';
      } else {
        return ":" + prefix + "fullscreen";
      }
    };

    return Fullscreen;

  })(Selector);

  module.exports = Fullscreen;

}).call(this);

},{"../selector":39}],25:[function(require,module,exports){
(function() {
  var Gradient, OldValue, Value, isDirection, list, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OldValue = require('../old-value');

  Value = require('../value');

  utils = require('../utils');

  list = require('postcss/lib/list');

  isDirection = /top|left|right|bottom/gi;

  Gradient = (function(_super) {
    __extends(Gradient, _super);

    function Gradient() {
      return Gradient.__super__.constructor.apply(this, arguments);
    }

    Gradient.names = ['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'];

    Gradient.prototype.replace = function(string, prefix) {
      var values;
      values = list.comma(string).map((function(_this) {
        return function(value) {
          var after, args, close, params;
          if (value.slice(0, +_this.name.length + 1 || 9e9) !== _this.name + '(') {
            return value;
          }
          close = value.lastIndexOf(')');
          after = value.slice(close + 1);
          args = value.slice(_this.name.length + 1, +(close - 1) + 1 || 9e9);
          params = list.comma(args);
          params = _this.newDirection(params);
          if (prefix === '-webkit- old') {
            return _this.oldWebkit(value, args, params, after);
          } else {
            _this.convertDirection(params);
            return prefix + _this.name + '(' + params.join(', ') + ')' + after;
          }
        };
      })(this));
      return values.join(', ');
    };

    Gradient.prototype.directions = {
      top: 'bottom',
      left: 'right',
      bottom: 'top',
      right: 'left'
    };

    Gradient.prototype.oldDirections = {
      'top': 'left bottom, left top',
      'left': 'right top, left top',
      'bottom': 'left top, left bottom',
      'right': 'left top, right top',
      'top right': 'left bottom, right top',
      'top left': 'right bottom, left top',
      'bottom right': 'left top, right bottom',
      'bottom left': 'right top, left bottom'
    };

    Gradient.prototype.newDirection = function(params) {
      var first, value;
      first = params[0];
      if (first.indexOf('to ') === -1 && isDirection.test(first)) {
        first = first.split(' ');
        first = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = first.length; _i < _len; _i++) {
            value = first[_i];
            _results.push(this.directions[value.toLowerCase()] || value);
          }
          return _results;
        }).call(this);
        params[0] = 'to ' + first.join(' ');
      }
      return params;
    };

    Gradient.prototype.oldWebkit = function(value, args, params, after) {
      if (this.name !== 'linear-gradient') {
        return value;
      }
      if (params[0] && params[0].indexOf('deg') !== -1) {
        return value;
      }
      if (args.indexOf('-corner') !== -1) {
        return value;
      }
      if (args.indexOf('-side') !== -1) {
        return value;
      }
      params = this.oldDirection(params);
      params = this.colorStops(params);
      return '-webkit-gradient(linear, ' + params.join(', ') + ')' + after;
    };

    Gradient.prototype.convertDirection = function(params) {
      if (params.length > 0) {
        if (params[0].slice(0, 3) === 'to ') {
          return params[0] = this.fixDirection(params[0]);
        } else if (params[0].indexOf('deg') !== -1) {
          return params[0] = this.fixAngle(params[0]);
        } else if (params[0].indexOf(' at ') !== -1) {
          return this.fixRadial(params);
        }
      }
    };

    Gradient.prototype.fixDirection = function(param) {
      var value;
      param = param.split(' ');
      param.splice(0, 1);
      param = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = param.length; _i < _len; _i++) {
          value = param[_i];
          _results.push(this.directions[value.toLowerCase()] || value);
        }
        return _results;
      }).call(this);
      return param.join(' ');
    };

    Gradient.prototype.roundFloat = function(float, digits) {
      return parseFloat(float.toFixed(digits));
    };

    Gradient.prototype.fixAngle = function(param) {
      param = parseFloat(param);
      param = Math.abs(450 - param) % 360;
      param = this.roundFloat(param, 3);
      return "" + param + "deg";
    };

    Gradient.prototype.oldDirection = function(params) {
      var direction;
      if (params.length === 0) {
        params;
      }
      if (params[0].indexOf('to ') !== -1) {
        direction = params[0].replace(/^to\s+/, '');
        direction = this.oldDirections[direction];
        params[0] = direction;
        return params;
      } else {
        direction = this.oldDirections.bottom;
        return [direction].concat(params);
      }
    };

    Gradient.prototype.colorStops = function(params) {
      return params.map(function(param, i) {
        var color, position, separator;
        if (i === 0) {
          return param;
        }
        separator = param.lastIndexOf(' ');
        if (separator === -1) {
          color = param;
          position = void 0;
        } else {
          color = param.slice(0, separator);
          position = param.slice(separator + 1);
        }
        if (position && position.indexOf(')') !== -1) {
          color += ' ' + position;
          position = void 0;
        }
        if (i === 1) {
          return "from(" + color + ")";
        } else if (i === params.length - 1) {
          return "to(" + color + ")";
        } else if (position) {
          return "color-stop(" + position + ", " + color + ")";
        } else {
          return "color-stop(" + color + ")";
        }
      });
    };

    Gradient.prototype.fixRadial = function(params) {
      var first;
      first = params[0].split(/\s+at\s+/);
      return params.splice(0, 1, first[1], first[0]);
    };

    Gradient.prototype.old = function(prefix) {
      var regexp, string, type;
      if (prefix === '-webkit-') {
        type = this.name === 'linear-gradient' ? 'linear' : 'radial';
        string = '-gradient';
        regexp = utils.regexp("-webkit-(" + type + "-gradient|gradient\\(\\s*" + type + ")", false);
        return new OldValue(prefix + this.name, string, regexp);
      } else {
        return Gradient.__super__.old.apply(this, arguments);
      }
    };

    return Gradient;

  })(Value);

  module.exports = Gradient;

}).call(this);

},{"../old-value":35,"../utils":40,"../value":41,"postcss/lib/list":47}],26:[function(require,module,exports){
(function() {
  var Declaration, JustifyContent, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  JustifyContent = (function(_super) {
    __extends(JustifyContent, _super);

    function JustifyContent() {
      return JustifyContent.__super__.constructor.apply(this, arguments);
    }

    JustifyContent.names = ['justify-content', 'flex-pack', 'box-pack'];

    JustifyContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    JustifyContent.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return prefix + 'box-pack';
      } else if (spec === 2012) {
        return prefix + 'flex-pack';
      } else {
        return JustifyContent.__super__.prefixed.apply(this, arguments);
      }
    };

    JustifyContent.prototype.normalize = function(prop) {
      return 'justify-content';
    };

    JustifyContent.prototype.set = function(decl, prefix) {
      var spec, value;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        value = JustifyContent.oldValues[decl.value] || decl.value;
        decl.value = value;
        if (spec !== 2009 || value !== 'distribute') {
          return JustifyContent.__super__.set.call(this, decl, prefix);
        }
      } else if (spec === 'final') {
        return JustifyContent.__super__.set.apply(this, arguments);
      }
    };

    return JustifyContent;

  })(Declaration);

  module.exports = JustifyContent;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],27:[function(require,module,exports){
(function() {
  var Declaration, Order, flexSpec,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Order = (function(_super) {
    __extends(Order, _super);

    function Order() {
      return Order.__super__.constructor.apply(this, arguments);
    }

    Order.names = ['order', 'flex-order', 'box-ordinal-group'];

    Order.prototype.prefixed = function(prop, prefix) {
      var spec, _ref;
      _ref = flexSpec(prefix), spec = _ref[0], prefix = _ref[1];
      if (spec === 2009) {
        return prefix + 'box-ordinal-group';
      } else if (spec === 2012) {
        return prefix + 'flex-order';
      } else {
        return Order.__super__.prefixed.apply(this, arguments);
      }
    };

    Order.prototype.normalize = function(prop) {
      return 'order';
    };

    Order.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = (parseInt(decl.value) + 1).toString();
        return Order.__super__.set.call(this, decl, prefix);
      } else {
        return Order.__super__.set.apply(this, arguments);
      }
    };

    return Order;

  })(Declaration);

  module.exports = Order;

}).call(this);

},{"../declaration":6,"./flex-spec":21}],28:[function(require,module,exports){
(function() {
  var Placeholder, Selector,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Selector = require('../selector');

  Placeholder = (function(_super) {
    __extends(Placeholder, _super);

    function Placeholder() {
      return Placeholder.__super__.constructor.apply(this, arguments);
    }

    Placeholder.names = ['::placeholder'];

    Placeholder.prototype.possible = function() {
      return Placeholder.__super__.possible.apply(this, arguments).concat('-moz- old');
    };

    Placeholder.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return '::-webkit-input-placeholder';
      } else if ('-ms-' === prefix) {
        return ':-ms-input-placeholder';
      } else if ('-moz- old' === prefix) {
        return ':-moz-placeholder';
      } else {
        return "::" + prefix + "placeholder";
      }
    };

    return Placeholder;

  })(Selector);

  module.exports = Placeholder;

}).call(this);

},{"../selector":39}],29:[function(require,module,exports){
(function() {
  var Declaration, TransformDecl,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Declaration = require('../declaration');

  TransformDecl = (function(_super) {
    __extends(TransformDecl, _super);

    function TransformDecl() {
      return TransformDecl.__super__.constructor.apply(this, arguments);
    }

    TransformDecl.names = ['transform', 'transform-origin'];

    TransformDecl.prototype.keykrameParents = function(decl) {
      var parent;
      parent = decl.parent;
      while (parent) {
        if (parent.type === 'atrule' && parent.name === 'keyframes') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    };

    TransformDecl.prototype.insert = function(decl, prefix, prefixes) {
      if (prefix !== '-ms-' || !this.keykrameParents(decl)) {
        return TransformDecl.__super__.insert.apply(this, arguments);
      }
    };

    return TransformDecl;

  })(Declaration);

  module.exports = TransformDecl;

}).call(this);

},{"../declaration":6}],30:[function(require,module,exports){
(function() {
  var TransformValue, Value,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Value = require('../value');

  TransformValue = (function(_super) {
    __extends(TransformValue, _super);

    function TransformValue() {
      return TransformValue.__super__.constructor.apply(this, arguments);
    }

    TransformValue.names = ['transform'];

    TransformValue.prototype.replace = function(value, prefix) {
      if (prefix === '-ms-') {
        return value;
      } else {
        return TransformValue.__super__.replace.apply(this, arguments);
      }
    };

    return TransformValue;

  })(Value);

  module.exports = TransformValue;

}).call(this);

},{"../value":41}],31:[function(require,module,exports){
(function() {
  var OldValue, Transition, Value,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OldValue = require('../old-value');

  Value = require('../value');

  Transition = (function(_super) {
    __extends(Transition, _super);

    function Transition() {
      return Transition.__super__.constructor.apply(this, arguments);
    }

    Transition.names = ['flex', 'flex-grow', 'flex-shrink', 'flex-basis'];

    Transition.prototype.prefixed = function(prefix) {
      return this.all.prefixed(this.name, prefix);
    };

    Transition.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + this.prefixed(prefix) + '$3');
    };

    Transition.prototype.old = function(prefix) {
      return new OldValue(this.prefixed(prefix));
    };

    return Transition;

  })(Value);

  module.exports = Transition;

}).call(this);

},{"../old-value":35,"../value":41}],32:[function(require,module,exports){
(function() {
  var capitalize, names, prefix;

  capitalize = function(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  names = {
    ie: 'IE',
    ff: 'Firefox',
    ios: 'iOS'
  };

  prefix = function(name, transition, prefixes) {
    var out;
    out = '  ' + name + (transition ? '*' : '') + ': ';
    out += prefixes.map(function(i) {
      return i.replace(/^-(.*)-$/g, '$1');
    }).join(', ');
    out += "\n";
    return out;
  };

  module.exports = function(prefixes) {
    var atrules, browser, data, list, name, needTransition, out, props, selector, selectors, string, transitionProp, useTransition, value, values, version, versions, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (prefixes.browsers.selected.length === 0) {
      return "No browsers selected";
    }
    versions = [];
    _ref = prefixes.browsers.selected;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      browser = _ref[_i];
      _ref1 = browser.split(' '), name = _ref1[0], version = _ref1[1];
      name = names[name] || capitalize(name);
      if (versions[name]) {
        versions[name].push(version);
      } else {
        versions[name] = [version];
      }
    }
    out = "Browsers:\n";
    for (browser in versions) {
      list = versions[browser];
      list = list.sort(function(a, b) {
        return parseFloat(b) - parseFloat(a);
      });
      out += '  ' + browser + ': ' + list.join(', ') + "\n";
    }
    atrules = '';
    _ref2 = prefixes.add;
    for (name in _ref2) {
      data = _ref2[name];
      if (name[0] === '@' && data.prefixes) {
        atrules += prefix(name, false, data.prefixes);
      }
    }
    if (atrules !== '') {
      out += "\nAt-Rules:\n" + atrules;
    }
    selectors = '';
    _ref3 = prefixes.add.selectors;
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      selector = _ref3[_j];
      if (selector.prefixes) {
        selectors += prefix(selector.name, false, selector.prefixes);
      }
    }
    if (selectors !== '') {
      out += "\nSelectors:\n" + selectors;
    }
    values = '';
    props = '';
    useTransition = false;
    needTransition = (_ref4 = prefixes.add.transition) != null ? _ref4.prefixes : void 0;
    _ref5 = prefixes.add;
    for (name in _ref5) {
      data = _ref5[name];
      if (name[0] !== '@' && data.prefixes) {
        transitionProp = needTransition && prefixes.data[name].transition;
        if (transitionProp) {
          useTransition = true;
        }
        props += prefix(name, transitionProp, data.prefixes);
      }
      if (!data.values) {
        continue;
      }
      if (prefixes.transitionProps.some(function(i) {
        return i === name;
      })) {
        continue;
      }
      _ref6 = data.values;
      for (_k = 0, _len2 = _ref6.length; _k < _len2; _k++) {
        value = _ref6[_k];
        string = prefix(value.name, false, value.prefixes);
        if (values.indexOf(string) === -1) {
          values += string;
        }
      }
    }
    if (useTransition) {
      props += "  * - can be used in transition\n";
    }
    if (props !== '') {
      out += "\nProperties:\n" + props;
    }
    if (values !== '') {
      out += "\nValues:\n" + values;
    }
    return out;
  };

}).call(this);

},{}],33:[function(require,module,exports){
(function() {
  var Keyframes, Prefixer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prefixer = require('./prefixer');

  Keyframes = (function(_super) {
    __extends(Keyframes, _super);

    function Keyframes() {
      return Keyframes.__super__.constructor.apply(this, arguments);
    }

    Keyframes.prototype.check = function(atRule) {
      return atRule.name === 'keyframes';
    };

    Keyframes.prototype.add = function(atRule, prefix) {
      var already, cloned, prefixed;
      prefixed = prefix + atRule.name;
      already = atRule.parent.some(function(i) {
        return i.name === prefixed && i.params === atRule.params;
      });
      if (already) {
        return;
      }
      cloned = this.clone(atRule, {
        name: prefixed
      });
      return atRule.parent.insertBefore(atRule, cloned);
    };

    return Keyframes;

  })(Prefixer);

  module.exports = Keyframes;

}).call(this);

},{"./prefixer":36}],34:[function(require,module,exports){
(function() {
  var OldSelector;

  OldSelector = (function() {
    function OldSelector(selector, prefix) {
      var _i, _len, _ref;
      this.prefix = prefix;
      this.prefixed = selector.prefixed(this.prefix);
      this.regexp = selector.regexp(this.prefix);
      this.prefixeds = [];
      _ref = selector.possible();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        this.prefixeds.push([selector.prefixed(prefix), selector.regexp(prefix)]);
      }
      this.unprefixed = selector.name;
      this.nameRegexp = selector.regexp();
    }

    OldSelector.prototype.isHack = function(rule) {
      var before, index, regexp, rules, some, string, _i, _len, _ref, _ref1;
      index = rule.parent.index(rule) + 1;
      rules = rule.parent.rules;
      while (index < rules.length) {
        before = rules[index].selector;
        if (!before) {
          return true;
        }
        if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
          return false;
        }
        some = false;
        _ref = this.prefixeds;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], string = _ref1[0], regexp = _ref1[1];
          if (before.indexOf(string) !== -1 && before.match(regexp)) {
            some = true;
            break;
          }
        }
        if (!some) {
          return true;
        }
        index += 1;
      }
      return true;
    };

    OldSelector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.prefixed) === -1) {
        return false;
      }
      if (!rule.selector.match(this.regexp)) {
        return false;
      }
      if (this.isHack(rule)) {
        return false;
      }
      return true;
    };

    return OldSelector;

  })();

  module.exports = OldSelector;

}).call(this);

},{}],35:[function(require,module,exports){
(function() {
  var OldValue, utils;

  utils = require('./utils');

  OldValue = (function() {
    function OldValue(name, string, regexp) {
      this.name = name;
      this.string = string;
      this.regexp = regexp;
      this.regexp || (this.regexp = utils.regexp(this.name));
      this.string || (this.string = this.name);
    }

    OldValue.prototype.check = function(value) {
      if (value.indexOf(this.string) !== -1) {
        return !!value.match(this.regexp);
      } else {
        return false;
      }
    };

    return OldValue;

  })();

  module.exports = OldValue;

}).call(this);

},{"./utils":40}],36:[function(require,module,exports){
(function() {
  var Browsers, Prefixer, utils, vendor;

  Browsers = require('./browsers');

  vendor = require('postcss/lib/vendor');

  utils = require('./utils');

  Prefixer = (function() {
    Prefixer.hack = function(klass) {
      var name, _i, _len, _ref, _results;
      this.hacks || (this.hacks = {});
      _ref = klass.names;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _results.push(this.hacks[name] = klass);
      }
      return _results;
    };

    Prefixer.load = function(name, prefixes, all) {
      var klass, _ref;
      klass = (_ref = this.hacks) != null ? _ref[name] : void 0;
      if (klass) {
        return new klass(name, prefixes, all);
      } else {
        return new this(name, prefixes, all);
      }
    };

    Prefixer.clone = function(node, overrides) {
      var cloned;
      cloned = node.clone(overrides);
      delete cloned._autoprefixerPrefix;
      delete cloned._autoprefixerValues;
      return cloned;
    };

    function Prefixer(name, prefixes, all) {
      this.name = name;
      this.prefixes = prefixes;
      this.all = all;
    }

    Prefixer.prototype.parentPrefix = function(node) {
      var prefix;
      prefix = node._autoprefixerPrefix != null ? node._autoprefixerPrefix : node.type === 'decl' && node.prop[0] === '-' ? vendor.prefix(node.prop) : node.type === 'root' ? false : node.type === 'rule' && node.selector.indexOf(':-') !== -1 ? node.selector.match(/:(-\w+-)/)[1] : node.type === 'atrule' && node.name[0] === '-' ? vendor.prefix(node.name) : this.parentPrefix(node.parent);
      if (Browsers.prefixes().indexOf(prefix) === -1) {
        prefix = false;
      }
      return node._autoprefixerPrefix = prefix;
    };

    Prefixer.prototype.process = function(node) {
      var parent, prefix, prefixes, _i, _j, _len, _len1, _ref;
      if (!this.check(node)) {
        return;
      }
      parent = this.parentPrefix(node);
      prefixes = [];
      _ref = this.prefixes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        if (parent && parent !== utils.removeNote(prefix)) {
          continue;
        }
        prefixes.push(prefix);
      }
      for (_j = 0, _len1 = prefixes.length; _j < _len1; _j++) {
        prefix = prefixes[_j];
        this.add(node, prefix, prefixes);
      }
      return prefixes;
    };

    Prefixer.prototype.clone = function(node, overrides) {
      return Prefixer.clone(node, overrides);
    };

    return Prefixer;

  })();

  module.exports = Prefixer;

}).call(this);

},{"./browsers":5,"./utils":40,"postcss/lib/vendor":57}],37:[function(require,module,exports){
(function() {
  var Browsers, Declaration, Keyframes, Prefixes, Processor, Selector, Value, declsCache, utils, vendor;

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  Declaration = require('./declaration');

  Processor = require('./processor');

  Keyframes = require('./keyframes');

  Browsers = require('./browsers');

  Selector = require('./selector');

  Value = require('./value');

  Selector.hack(require('./hacks/fullscreen'));

  Selector.hack(require('./hacks/placeholder'));

  Declaration.hack(require('./hacks/flex'));

  Declaration.hack(require('./hacks/order'));

  Declaration.hack(require('./hacks/filter'));

  Declaration.hack(require('./hacks/flex-flow'));

  Declaration.hack(require('./hacks/flex-grow'));

  Declaration.hack(require('./hacks/flex-wrap'));

  Declaration.hack(require('./hacks/align-self'));

  Declaration.hack(require('./hacks/flex-basis'));

  Declaration.hack(require('./hacks/align-items'));

  Declaration.hack(require('./hacks/flex-shrink'));

  Declaration.hack(require('./hacks/break-inside'));

  Declaration.hack(require('./hacks/border-image'));

  Declaration.hack(require('./hacks/align-content'));

  Declaration.hack(require('./hacks/border-radius'));

  Declaration.hack(require('./hacks/transform-decl'));

  Declaration.hack(require('./hacks/flex-direction'));

  Declaration.hack(require('./hacks/justify-content'));

  Value.hack(require('./hacks/gradient'));

  Value.hack(require('./hacks/transition'));

  Value.hack(require('./hacks/display-flex'));

  Value.hack(require('./hacks/fill-available'));

  Value.hack(require('./hacks/transform-value'));

  declsCache = {};

  Prefixes = (function() {
    function Prefixes(data, browsers, options) {
      var _ref;
      this.data = data;
      this.browsers = browsers;
      this.options = options != null ? options : {};
      _ref = this.preprocess(this.select(this.data)), this.add = _ref[0], this.remove = _ref[1];
      this.processor = new Processor(this);
    }

    Prefixes.prototype.transitionProps = ['transition', 'transition-property'];

    Prefixes.prototype.select = function(list) {
      var add, all, data, name, notes, selected;
      selected = {
        add: {},
        remove: {}
      };
      for (name in list) {
        data = list[name];
        add = data.browsers.map(function(i) {
          var params;
          params = i.split(' ');
          return {
            browser: params[0] + ' ' + params[1],
            note: params[2]
          };
        });
        notes = add.filter(function(i) {
          return i.note;
        }).map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i.browser) + ' ' + i.note;
          };
        })(this));
        notes = utils.uniq(notes);
        add = add.filter((function(_this) {
          return function(i) {
            return _this.browsers.isSelected(i.browser);
          };
        })(this)).map((function(_this) {
          return function(i) {
            var prefix;
            prefix = _this.browsers.prefix(i.browser);
            if (i.note) {
              return prefix + ' ' + i.note;
            } else {
              return prefix;
            }
          };
        })(this));
        add = this.sort(utils.uniq(add));
        all = data.browsers.map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i);
          };
        })(this));
        if (data.mistakes) {
          all = all.concat(data.mistakes);
        }
        all = all.concat(notes);
        all = utils.uniq(all);
        if (add.length) {
          selected.add[name] = add;
          if (add.length < all.length) {
            selected.remove[name] = all.filter(function(i) {
              return add.indexOf(i) === -1;
            });
          }
        } else {
          selected.remove[name] = all;
        }
      }
      return selected;
    };

    Prefixes.prototype.sort = function(prefixes) {
      return prefixes.sort(function(a, b) {
        var aLength, bLength;
        aLength = utils.removeNote(a).length;
        bLength = utils.removeNote(b).length;
        if (aLength === bLength) {
          return b.length - a.length;
        } else {
          return bLength - aLength;
        }
      });
    };

    Prefixes.prototype.preprocess = function(selected) {
      var add, name, old, olds, prefix, prefixed, prefixes, prop, props, remove, selector, value, values, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2;
      add = {
        selectors: []
      };
      _ref = selected.add;
      for (name in _ref) {
        prefixes = _ref[name];
        if (name === '@keyframes') {
          add[name] = new Keyframes(name, prefixes, this);
        } else if (this.data[name].selector) {
          add.selectors.push(Selector.load(name, prefixes, this));
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, prefixes, this);
            for (_i = 0, _len = props.length; _i < _len; _i++) {
              prop = props[_i];
              if (!add[prop]) {
                add[prop] = {
                  values: []
                };
              }
              add[prop].values.push(value);
            }
          }
          if (!this.data[name].props) {
            values = ((_ref1 = add[name]) != null ? _ref1.values : void 0) || [];
            add[name] = Declaration.load(name, prefixes, this);
            add[name].values = values;
          }
        }
      }
      remove = {
        selectors: []
      };
      _ref2 = selected.remove;
      for (name in _ref2) {
        prefixes = _ref2[name];
        if (this.data[name].selector) {
          selector = Selector.load(name, prefixes);
          for (_j = 0, _len1 = prefixes.length; _j < _len1; _j++) {
            prefix = prefixes[_j];
            remove.selectors.push(selector.old(prefix));
          }
        } else if (name[0] === '@') {
          for (_k = 0, _len2 = prefixes.length; _k < _len2; _k++) {
            prefix = prefixes[_k];
            prefixed = '@' + prefix + name.slice(1);
            remove[prefixed] = {
              remove: true
            };
          }
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, [], this);
            for (_l = 0, _len3 = prefixes.length; _l < _len3; _l++) {
              prefix = prefixes[_l];
              old = value.old(prefix);
              if (old) {
                for (_m = 0, _len4 = props.length; _m < _len4; _m++) {
                  prop = props[_m];
                  if (!remove[prop]) {
                    remove[prop] = {};
                  }
                  if (!remove[prop].values) {
                    remove[prop].values = [];
                  }
                  remove[prop].values.push(old);
                }
              }
            }
          }
          if (!this.data[name].props) {
            for (_n = 0, _len5 = prefixes.length; _n < _len5; _n++) {
              prefix = prefixes[_n];
              prop = vendor.unprefixed(name);
              olds = this.decl(name).old(name, prefix);
              for (_o = 0, _len6 = olds.length; _o < _len6; _o++) {
                prefixed = olds[_o];
                if (!remove[prefixed]) {
                  remove[prefixed] = {};
                }
                remove[prefixed].remove = true;
              }
            }
          }
        }
      }
      return [add, remove];
    };

    Prefixes.prototype.decl = function(prop) {
      var decl;
      decl = declsCache[prop];
      if (decl) {
        return decl;
      } else {
        return declsCache[prop] = Declaration.load(prop);
      }
    };

    Prefixes.prototype.unprefixed = function(prop) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).normalize(prop);
    };

    Prefixes.prototype.prefixed = function(prop, prefix) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).prefixed(prop, prefix);
    };

    Prefixes.prototype.values = function(type, prop) {
      var data, global, values, _ref, _ref1;
      data = this[type];
      global = (_ref = data['*']) != null ? _ref.values : void 0;
      values = (_ref1 = data[prop]) != null ? _ref1.values : void 0;
      if (global && values) {
        return utils.uniq(global.concat(values));
      } else {
        return global || values || [];
      }
    };

    Prefixes.prototype.group = function(decl) {
      var checker, index, length, rule, unprefixed;
      rule = decl.parent;
      index = rule.index(decl);
      length = rule.decls.length;
      unprefixed = this.unprefixed(decl.prop);
      checker = (function(_this) {
        return function(step, callback) {
          var other;
          index += step;
          while (index >= 0 && index < length) {
            other = rule.decls[index];
            if (other.type === 'decl') {
              if (step === -1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
              if (_this.unprefixed(other.prop) !== unprefixed) {
                break;
              } else if (callback(other) === true) {
                return true;
              }
              if (step === +1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
            }
            index += step;
          }
          return false;
        };
      })(this);
      return {
        up: function(callback) {
          return checker(-1, callback);
        },
        down: function(callback) {
          return checker(+1, callback);
        }
      };
    };

    return Prefixes;

  })();

  module.exports = Prefixes;

}).call(this);

},{"./browsers":5,"./declaration":6,"./hacks/align-content":7,"./hacks/align-items":8,"./hacks/align-self":9,"./hacks/border-image":10,"./hacks/border-radius":11,"./hacks/break-inside":12,"./hacks/display-flex":13,"./hacks/fill-available":14,"./hacks/filter":15,"./hacks/flex":23,"./hacks/flex-basis":16,"./hacks/flex-direction":17,"./hacks/flex-flow":18,"./hacks/flex-grow":19,"./hacks/flex-shrink":20,"./hacks/flex-wrap":22,"./hacks/fullscreen":24,"./hacks/gradient":25,"./hacks/justify-content":26,"./hacks/order":27,"./hacks/placeholder":28,"./hacks/transform-decl":29,"./hacks/transform-value":30,"./hacks/transition":31,"./keyframes":33,"./processor":38,"./selector":39,"./utils":40,"./value":41,"postcss/lib/vendor":57}],38:[function(require,module,exports){
(function() {
  var Processor, Value, utils, vendor;

  vendor = require('postcss/lib/vendor');

  Value = require('./value');

  utils = require('./utils');

  Processor = (function() {
    function Processor(prefixes) {
      this.prefixes = prefixes;
    }

    Processor.prototype.add = function(css) {
      var prefixer, selector, _i, _len, _ref;
      prefixer = this.prefixes.add['@keyframes'];
      if (prefixer) {
        css.eachAtRule(function(rule) {
          return prefixer.process(rule);
        });
      }
      _ref = this.prefixes.add.selectors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        selector = _ref[_i];
        css.eachRule(function(rule) {
          return selector.process(rule);
        });
      }
      css.eachDecl((function(_this) {
        return function(decl) {
          var prefix;
          prefix = _this.prefixes.add[decl.prop];
          if (prefix && prefix.prefixes) {
            return prefix.process(decl);
          }
        };
      })(this));
      return css.eachDecl((function(_this) {
        return function(decl) {
          var unprefixed, value, _j, _len1, _ref1;
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          _ref1 = _this.prefixes.values('add', unprefixed);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            value = _ref1[_j];
            value.process(decl);
          }
          return Value.save(_this.prefixes, decl);
        };
      })(this));
    };

    Processor.prototype.remove = function(css) {
      var checker, _i, _len, _ref;
      css.eachAtRule((function(_this) {
        return function(rule, i) {
          if (_this.prefixes.remove['@' + rule.name]) {
            return rule.parent.remove(i);
          }
        };
      })(this));
      _ref = this.prefixes.remove.selectors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        checker = _ref[_i];
        css.eachRule((function(_this) {
          return function(rule, i) {
            if (checker.check(rule)) {
              return rule.parent.remove(i);
            }
          };
        })(this));
      }
      return css.eachDecl((function(_this) {
        return function(decl, i) {
          var notHack, rule, unprefixed, _j, _len1, _ref1, _ref2;
          rule = decl.parent;
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          if ((_ref1 = _this.prefixes.remove[decl.prop]) != null ? _ref1.remove : void 0) {
            notHack = _this.prefixes.group(decl).down(function(i) {
              return i.prop === unprefixed;
            });
            if (notHack) {
              rule.remove(i);
              return;
            }
          }
          _ref2 = _this.prefixes.values('remove', unprefixed);
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            checker = _ref2[_j];
            if (checker.check(decl.value)) {
              rule.remove(i);
              return;
            }
          }
        };
      })(this));
    };

    return Processor;

  })();

  module.exports = Processor;

}).call(this);

},{"./utils":40,"./value":41,"postcss/lib/vendor":57}],39:[function(require,module,exports){
(function() {
  var Browsers, OldSelector, Prefixer, Selector, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OldSelector = require('./old-selector');

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  utils = require('./utils');

  Selector = (function(_super) {
    __extends(Selector, _super);

    function Selector(name, prefixes, all) {
      this.name = name;
      this.prefixes = prefixes;
      this.all = all;
      this.regexpCache = {};
    }

    Selector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.name) !== -1) {
        return !!rule.selector.match(this.regexp());
      } else {
        return false;
      }
    };

    Selector.prototype.prefixed = function(prefix) {
      return this.name.replace(/^([^\w]*)/, '$1' + prefix);
    };

    Selector.prototype.regexp = function(prefix) {
      var name;
      if (this.regexpCache[prefix]) {
        return this.regexpCache[prefix];
      }
      name = prefix ? this.prefixed(prefix) : this.name;
      return this.regexpCache[prefix] = RegExp("(^|[^:\"'=])" + (utils.escapeRegexp(name)), "gi");
    };

    Selector.prototype.possible = function() {
      return Browsers.prefixes();
    };

    Selector.prototype.prefixeds = function(rule) {
      var prefix, prefixeds, _i, _len, _ref;
      if (rule._autoprefixerPrefixeds) {
        return rule._autoprefixerPrefixeds;
      }
      prefixeds = {};
      _ref = this.possible();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        prefixeds[prefix] = this.replace(rule.selector, prefix);
      }
      return rule._autoprefixerPrefixeds = prefixeds;
    };

    Selector.prototype.already = function(rule, prefixeds, prefix) {
      var before, index, key, prefixed, some;
      index = rule.parent.index(rule) - 1;
      while (index >= 0) {
        before = rule.parent.rules[index];
        if (before.type !== 'rule') {
          return false;
        }
        some = false;
        for (key in prefixeds) {
          prefixed = prefixeds[key];
          if (before.selector === prefixed) {
            if (prefix === key) {
              return true;
            } else {
              some = true;
              break;
            }
          }
        }
        if (!some) {
          return false;
        }
        index -= 1;
      }
      return false;
    };

    Selector.prototype.replace = function(selector, prefix) {
      return selector.replace(this.regexp(), '$1' + this.prefixed(prefix));
    };

    Selector.prototype.add = function(rule, prefix) {
      var cloned, prefixeds;
      prefixeds = this.prefixeds(rule);
      if (this.already(rule, prefixeds, prefix)) {
        return;
      }
      cloned = this.clone(rule, {
        selector: prefixeds[prefix]
      });
      return rule.parent.insertBefore(rule, cloned);
    };

    Selector.prototype.old = function(prefix) {
      return new OldSelector(this, prefix);
    };

    return Selector;

  })(Prefixer);

  module.exports = Selector;

}).call(this);

},{"./browsers":5,"./old-selector":34,"./prefixer":36,"./utils":40}],40:[function(require,module,exports){
(function() {
  module.exports = {
    error: function(text) {
      var err;
      err = new Error(text);
      err.autoprefixer = true;
      throw err;
    },
    uniq: function(array) {
      var filtered, i, _i, _len;
      filtered = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (filtered.indexOf(i) === -1) {
          filtered.push(i);
        }
      }
      return filtered;
    },
    removeNote: function(string) {
      if (string.indexOf(' ') === -1) {
        return string;
      } else {
        return string.split(' ')[0];
      }
    },
    escapeRegexp: function(string) {
      return string.replace(/[.?*+\^\$\[\]\\(){}|\-]/g, '\\$&');
    },
    regexp: function(word, escape) {
      if (escape == null) {
        escape = true;
      }
      if (escape) {
        word = this.escapeRegexp(word);
      }
      return RegExp("(^|[\\s,(])(" + word + "($|[\\s(,]))", "gi");
    }
  };

}).call(this);

},{}],41:[function(require,module,exports){
(function() {
  var OldValue, Prefixer, Value, utils, vendor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Prefixer = require('./prefixer');

  OldValue = require('./old-value');

  vendor = require('postcss/lib/vendor');

  utils = require('./utils');

  Value = (function(_super) {
    __extends(Value, _super);

    function Value() {
      return Value.__super__.constructor.apply(this, arguments);
    }

    Value.save = function(prefixes, decl) {
      var already, cloned, prefix, prefixed, propPrefix, rule, trimmed, value, _ref, _results;
      _ref = decl._autoprefixerValues;
      _results = [];
      for (prefix in _ref) {
        value = _ref[prefix];
        if (value === decl.value) {
          continue;
        }
        propPrefix = vendor.prefix(decl.prop);
        if (propPrefix === prefix) {
          _results.push(decl.value = value);
        } else if (propPrefix === '-pie-') {
          continue;
        } else {
          prefixed = prefixes.prefixed(decl.prop, prefix);
          rule = decl.parent;
          if (rule.every(function(i) {
            return i.prop !== prefixed;
          })) {
            trimmed = value.replace(/\s+/, ' ');
            already = rule.some(function(i) {
              return i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed;
            });
            if (!already) {
              cloned = this.clone(decl, {
                value: value
              });
              _results.push(decl.parent.insertBefore(decl, cloned));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    Value.prototype.check = function(decl) {
      var value;
      value = decl.value;
      if (value.indexOf(this.name) !== -1) {
        return !!value.match(this.regexp());
      } else {
        return false;
      }
    };

    Value.prototype.regexp = function() {
      return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
    };

    Value.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + prefix + '$2');
    };

    Value.prototype.add = function(decl, prefix) {
      var value;
      decl._autoprefixerValues || (decl._autoprefixerValues = {});
      value = decl._autoprefixerValues[prefix] || decl.value;
      value = this.replace(value, prefix);
      if (value) {
        return decl._autoprefixerValues[prefix] = value;
      }
    };

    Value.prototype.old = function(prefix) {
      return new OldValue(prefix + this.name);
    };

    return Value;

  })(Prefixer);

  module.exports = Value;

}).call(this);

},{"./old-value":35,"./prefixer":36,"./utils":40,"postcss/lib/vendor":57}],42:[function(require,module,exports){
(function() {
  var AtRule, Container, name, _fn, _i, _len, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Container = require('./container');

  AtRule = (function(_super) {
    __extends(AtRule, _super);

    function AtRule() {
      this.type = 'atrule';
      AtRule.__super__.constructor.apply(this, arguments);
    }

    AtRule.prototype.styleType = function() {
      return this.type + ((this.rules != null) || (this.decls != null) ? '-body' : '-bodiless');
    };

    AtRule.prototype.defaultStyle = function(type) {
      if (type === 'atrule-body') {
        return {
          between: ' ',
          after: this.defaultAfter()
        };
      } else {
        return {
          between: ''
        };
      }
    };

    AtRule.prototype.addMixin = function(type) {
      var container, detector, mixin, name, value, _ref;
      mixin = type === 'rules' ? Container.WithRules : Container.WithDecls;
      if (!mixin) {
        return;
      }
      _ref = mixin.prototype;
      for (name in _ref) {
        value = _ref[name];
        if (name === 'constructor') {
          continue;
        }
        container = Container.prototype[name] === value;
        detector = name === 'append' || name === 'prepend';
        if (container && !detector) {
          continue;
        }
        this[name] = value;
      }
      return mixin.apply(this);
    };

    AtRule.raw('params');

    AtRule.prototype.stringify = function(builder, last) {
      var name, params, semicolon, style;
      style = this.style();
      name = '@' + this.name;
      params = this._params ? this._params.toString() : '';
      name += this.afterName != null ? this.afterName : params ? ' ' : '';
      if ((this.rules != null) || (this.decls != null)) {
        return this.stringifyBlock(builder, name + params + style.between + '{');
      } else {
        if (this.before) {
          builder(this.before);
        }
        semicolon = !last || this.semicolon ? ';' : '';
        return builder(name + params + style.between + semicolon, this);
      }
    };

    return AtRule;

  })(Container);

  _ref = ['append', 'prepend'];
  _fn = function(name) {
    return AtRule.prototype[name] = function(child) {
      var mixin;
      mixin = child.type === 'decl' ? 'decls' : 'rules';
      this.addMixin(mixin);
      return this[name](child);
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    _fn(name);
  }

  module.exports = AtRule;

}).call(this);

},{"./container":44}],43:[function(require,module,exports){
(function() {
  var Comment, Node,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Node = require('./node');

  Comment = (function(_super) {
    __extends(Comment, _super);

    function Comment() {
      this.type = 'comment';
      Comment.__super__.constructor.apply(this, arguments);
    }

    Comment.prototype.defaultStyle = function() {
      return {
        left: ' ',
        right: ' '
      };
    };

    Comment.prototype.stringify = function(builder) {
      var style;
      if (this.before) {
        builder(this.before);
      }
      style = this.style();
      return builder("/*" + (style.left + this.text + style.right) + "*/", this);
    };

    return Comment;

  })(Node);

  module.exports = Comment;

}).call(this);

},{"./node":49}],44:[function(require,module,exports){
(function() {
  var Container, Declaration, Node,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Node = require('./node');

  Declaration = require('./declaration');

  Container = (function(_super) {
    __extends(Container, _super);

    function Container() {
      return Container.__super__.constructor.apply(this, arguments);
    }

    Container.prototype.stringifyContent = function(builder) {
      var last;
      if (!this.rules && !this.decls) {
        return;
      }
      if (this.rules) {
        last = this.rules.length - 1;
        return this.rules.map(function(rule, i) {
          return rule.stringify(builder, last === i);
        });
      } else if (this.decls) {
        last = this.decls.length - 1;
        return this.decls.map((function(_this) {
          return function(decl, i) {
            return decl.stringify(builder, last !== i || _this.semicolon);
          };
        })(this));
      }
    };

    Container.prototype.defaultAfter = function() {
      var _ref;
      if (this.list.length === 0) {
        return '';
      } else if (((_ref = this.list[0].before) != null ? _ref.indexOf("\n") : void 0) === -1) {
        return this.list[0].before;
      } else {
        return "\n";
      }
    };

    Container.prototype.stringifyBlock = function(builder, start) {
      var style;
      style = this.style();
      if (this.before) {
        builder(this.before);
      }
      builder(start, this, 'start');
      this.stringifyContent(builder);
      if (style.after) {
        builder(style.after);
      }
      return builder('}', this, 'end');
    };

    Container.prototype.push = function(child) {
      child.parent = this;
      this.list.push(child);
      return this;
    };

    Container.prototype.each = function(callback) {
      var id, index, list, result;
      this.lastEach || (this.lastEach = 0);
      this.indexes || (this.indexes = {});
      this.lastEach += 1;
      id = this.lastEach;
      this.indexes[id] = 0;
      list = this.list;
      if (!list) {
        return;
      }
      while (this.indexes[id] < list.length) {
        index = this.indexes[id];
        result = callback(list[index], index);
        if (result === false) {
          break;
        }
        this.indexes[id] += 1;
      }
      delete this.indexes[id];
      if (result === false) {
        return false;
      }
    };

    Container.prototype.eachInside = function(callback) {
      return this.each((function(_this) {
        return function(child, i) {
          var result;
          result = callback(child, i);
          if (result !== false && child.eachInside) {
            result = child.eachInside(callback);
          }
          if (result === false) {
            return result;
          }
        };
      })(this));
    };

    Container.prototype.eachDecl = function(callback) {};

    Container.prototype.eachComment = function(callback) {
      return this.eachInside((function(_this) {
        return function(child, i) {
          var result;
          result = child.type === 'comment' ? callback(child, i) : void 0;
          if (result === false) {
            return result;
          }
        };
      })(this));
    };

    Container.prototype.append = function(child) {
      child = this.normalize(child, this.list[this.list.length - 1]);
      this.list.push(child);
      return this;
    };

    Container.prototype.prepend = function(child) {
      var id, index, _ref;
      child = this.normalize(child, this.list[0], 'prepend');
      this.list.unshift(child);
      _ref = this.indexes;
      for (id in _ref) {
        index = _ref[id];
        this.indexes[id] = index + 1;
      }
      return this;
    };

    Container.prototype.insertBefore = function(exist, add) {
      var id, index, _ref;
      exist = this.index(exist);
      add = this.normalize(add, this.list[exist], exist === 0 ? 'prepend' : void 0);
      this.list.splice(exist, 0, add);
      _ref = this.indexes;
      for (id in _ref) {
        index = _ref[id];
        if (index >= exist) {
          this.indexes[id] = index + 1;
        }
      }
      return this;
    };

    Container.prototype.insertAfter = function(exist, add) {
      var id, index, _ref;
      exist = this.index(exist);
      add = this.normalize(add, this.list[exist]);
      this.list.splice(exist + 1, 0, add);
      _ref = this.indexes;
      for (id in _ref) {
        index = _ref[id];
        if (index > exist) {
          this.indexes[id] = index + 1;
        }
      }
      return this;
    };

    Container.prototype.remove = function(child) {
      var id, index, _ref;
      child = this.index(child);
      this.list.splice(child, 1);
      _ref = this.indexes;
      for (id in _ref) {
        index = _ref[id];
        if (index >= child) {
          this.indexes[id] = index - 1;
        }
      }
      return this;
    };

    Container.prototype.every = function(condition) {
      return this.list.every(condition);
    };

    Container.prototype.some = function(condition) {
      return this.list.some(condition);
    };

    Container.prototype.index = function(child) {
      if (typeof child === 'number') {
        return child;
      } else {
        return this.list.indexOf(child);
      }
    };

    Container.prop('first', {
      get: function() {
        return this.list[0];
      }
    });

    Container.prop('last', {
      get: function() {
        return this.list[this.list.length - 1];
      }
    });

    Container.prop('list', {
      get: function() {
        return this.rules || this.decls;
      }
    });

    Container.prototype.normalize = function(child, sample) {
      child.parent = this;
      if ((child.before == null) && sample) {
        child.before = sample.before;
      }
      return child;
    };

    return Container;

  })(Node);

  Container.WithRules = (function(_super) {
    __extends(WithRules, _super);

    function WithRules() {
      this.rules = [];
      WithRules.__super__.constructor.apply(this, arguments);
    }

    WithRules.prototype.eachDecl = function(callback) {
      return this.each(function(child) {
        var result;
        if (!child.eachDecl) {
          return;
        }
        result = child.eachDecl(callback);
        if (result === false) {
          return result;
        }
      });
    };

    WithRules.prototype.eachRule = function(callback) {
      return this.each((function(_this) {
        return function(child, i) {
          var result;
          result = child.type === 'rule' ? callback(child, i) : child.eachRule ? child.eachRule(callback) : void 0;
          if (result === false) {
            return result;
          }
        };
      })(this));
    };

    WithRules.prototype.eachAtRule = function(callback) {
      return this.eachInside((function(_this) {
        return function(child, i) {
          var result;
          result = child.type === 'atrule' ? callback(child, i) : void 0;
          if (result === false) {
            return result;
          }
        };
      })(this));
    };

    return WithRules;

  })(Container);

  Container.WithDecls = (function(_super) {
    __extends(WithDecls, _super);

    function WithDecls() {
      this.decls = [];
      WithDecls.__super__.constructor.apply(this, arguments);
    }

    WithDecls.prototype.normalize = function(child, sample) {
      if (!child.type) {
        child = new Declaration(child);
      }
      return WithDecls.__super__.normalize.call(this, child, sample);
    };

    WithDecls.prototype.eachDecl = function(callback) {
      return this.each((function(_this) {
        return function(node, i) {
          var result;
          if (node.type !== 'decl') {
            return;
          }
          result = callback(node, i);
          if (result === false) {
            return result;
          }
        };
      })(this));
    };

    return WithDecls;

  })(Container);

  module.exports = Container;

}).call(this);

},{"./declaration":45,"./node":49}],45:[function(require,module,exports){
(function() {
  var Declaration, Node, vendor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Node = require('./node');

  vendor = require('./vendor');

  Declaration = (function(_super) {
    __extends(Declaration, _super);

    function Declaration() {
      this.type = 'decl';
      Declaration.__super__.constructor.apply(this, arguments);
    }

    Declaration.prototype.defaultStyle = function() {
      return {
        before: "\n    ",
        between: ': '
      };
    };

    Declaration.raw('value');

    Declaration.prop('important', {
      get: function() {
        return !!this._important;
      },
      set: function(value) {
        if (typeof value === 'string' && value !== '') {
          return this._important = value;
        } else if (value) {
          return this._important = ' !important';
        } else {
          return this._important = false;
        }
      }
    });

    Declaration.prototype.stringify = function(builder, semicolon) {
      var string, style;
      style = this.style();
      if (style.before) {
        builder(style.before);
      }
      string = this.prop + style.between + this._value.toString();
      string += this._important || '';
      if (semicolon) {
        string += ';';
      }
      return builder(string, this);
    };

    Declaration.prototype.clone = function(obj) {
      var cloned;
      cloned = Declaration.__super__.clone.apply(this, arguments);
      delete cloned.before;
      return cloned;
    };

    return Declaration;

  })(Node);

  module.exports = Declaration;

}).call(this);

},{"./node":49,"./vendor":57}],46:[function(require,module,exports){
(function() {
  var lazy;

  lazy = function(klass, name, callback) {
    var cache;
    cache = name + 'Cache';
    return klass.prototype[name] = function() {
      if (this[cache] != null) {
        return this[cache];
      } else {
        return this[cache] = callback.apply(this, arguments);
      }
    };
  };

  module.exports = lazy;

}).call(this);

},{}],47:[function(require,module,exports){
(function() {
  var list;

  list = {
    split: function(string, separators, last) {
      var array, current, escape, func, letter, quote, separator, split, _i, _j, _len, _len1;
      array = [];
      current = '';
      split = false;
      func = 0;
      quote = false;
      escape = false;
      for (_i = 0, _len = string.length; _i < _len; _i++) {
        letter = string[_i];
        if (quote) {
          if (escape) {
            escape = false;
          } else if (letter === '\\') {
            escape = true;
          } else if (letter === quote) {
            quote = false;
          }
        } else if (letter === '"' || letter === "'") {
          quote = letter;
        } else if (letter === '(') {
          func += 1;
        } else if (letter === ')') {
          if (func > 0) {
            func -= 1;
          }
        } else if (func === 0) {
          for (_j = 0, _len1 = separators.length; _j < _len1; _j++) {
            separator = separators[_j];
            if (letter === separator) {
              split = true;
            }
          }
        }
        if (split) {
          if (current !== '') {
            array.push(current.trim());
          }
          current = '';
          split = false;
        } else {
          current += letter;
        }
      }
      if (last || current !== '') {
        array.push(current.trim());
      }
      return array;
    },
    space: function(string) {
      return this.split(string, [' ', "\n", "\t"]);
    },
    comma: function(string) {
      return this.split(string, [','], true);
    }
  };

  module.exports = list;

}).call(this);

},{}],48:[function(require,module,exports){
(function() {
  var MapGenerator, Result, base64js, fs, lazy, mozilla, path;

  base64js = require('base64-js');

  mozilla = require('source-map');

  Result = require('./result');

  lazy = require('./lazy');

  path = require('path');

  fs = require('fs');

  MapGenerator = (function() {
    function MapGenerator(root, opts) {
      this.root = root;
      this.opts = opts;
    }

    MapGenerator.prototype.startWith = function(string, start) {
      return string.slice(0, +(start.length - 1) + 1 || 9e9) === start;
    };

    MapGenerator.prototype.isMap = function() {
      if (typeof this.opts.map === 'boolean') {
        return this.opts.map;
      }
      return !!this.opts.inlineMap || !!this.prevMap();
    };

    lazy(MapGenerator, 'isInline', function() {
      if (this.opts.inlineMap != null) {
        return this.opts.inlineMap;
      }
      return this.isPrevInline();
    });

    lazy(MapGenerator, 'isPrevInline', function() {
      var text;
      if (!this.prevAnnotation()) {
        return false;
      }
      text = this.prevAnnotation().text;
      return this.startWith(text, '# sourceMappingURL=data:');
    });

    lazy(MapGenerator, 'prevMap', function() {
      var file, map;
      if (this.opts.map && typeof this.opts.map !== 'boolean') {
        return this.opts.map;
      }
      if (this.isPrevInline()) {
        return this.encodeInline(this.prevAnnotation().text);
      } else if (this.opts.from) {
        map = this.opts.from + '.map';
        if (this.prevAnnotation()) {
          file = this.prevAnnotation().text.replace('# sourceMappingURL=', '');
          map = path.join(path.dirname(this.opts.from), file);
        }
        if (typeof fs.existsSync === "function" ? fs.existsSync(map) : void 0) {
          return fs.readFileSync(map).toString();
        } else {
          return false;
        }
      }
    });

    lazy(MapGenerator, 'prevAnnotation', function() {
      var last;
      last = this.root.last;
      if (!last) {
        return null;
      }
      if (last.type === 'comment' && this.startWith(last.text, '# sourceMappingURL=')) {
        return last;
      } else {
        return null;
      }
    });

    MapGenerator.prototype.encodeInline = function(text) {
      var base64, byte, bytes, uri;
      uri = '# sourceMappingURL=data:application/json,';
      base64 = '# sourceMappingURL=data:application/json;base64,';
      if (this.startWith(text, uri)) {
        return decodeURIComponent(text.slice(uri.length));
      } else if (this.startWith(text, base64)) {
        text = text.slice(base64.length);
        bytes = base64js.toByteArray(text);
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = bytes.length; _i < _len; _i++) {
            byte = bytes[_i];
            _results.push(String.fromCharCode(byte));
          }
          return _results;
        })()).join('');
      } else {
        throw new Error('Unknown source map encoding');
      }
    };

    MapGenerator.prototype.clearAnnotation = function() {
      var _ref;
      return (_ref = this.prevAnnotation()) != null ? _ref.removeSelf() : void 0;
    };

    MapGenerator.prototype.applyPrevMap = function() {
      var from, prev;
      if (this.prevMap()) {
        prev = this.prevMap();
        prev = typeof prev === 'string' ? JSON.parse(prev) : prev instanceof mozilla.SourceMapConsumer ? mozilla.SourceMapGenerator.fromSourceMap(prev).toJSON() : typeof prev === 'object' && prev.toJSON ? prev.toJSON() : prev;
        prev = new mozilla.SourceMapConsumer(prev);
        from = this.relative(this.opts.from);
        return this.map.applySourceMap(prev, from, path.dirname(from));
      }
    };

    MapGenerator.prototype.addAnnotation = function() {
      var bytes, char, content;
      if (this.opts.mapAnnotation === false) {
        return;
      }
      if (this.prevMap() && !this.prevAnnotation()) {
        return;
      }
      content = this.isInline() ? (bytes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.map.toString();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          char = _ref[_i];
          _results.push(char.charCodeAt(0));
        }
        return _results;
      }).call(this), "data:application/json;base64," + base64js.fromByteArray(bytes)) : this.outputFile() + '.map';
      return this.css += "\n/*# sourceMappingURL=" + content + " */";
    };

    MapGenerator.prototype.outputFile = function() {
      if (this.opts.to) {
        return path.basename(this.opts.to);
      } else {
        return 'to.css';
      }
    };

    MapGenerator.prototype.generateMap = function() {
      this.stringify();
      this.applyPrevMap();
      this.addAnnotation();
      if (this.isInline()) {
        return new Result(this.css);
      } else {
        return new Result(this.css, this.map.toString());
      }
    };

    MapGenerator.prototype.relative = function(file) {
      var from;
      from = this.opts.to ? path.dirname(this.opts.to) : '.';
      file = path.relative(from, file);
      if (path.sep === '\\') {
        file = file.replace('\\', '/');
      }
      return file;
    };

    MapGenerator.prototype.sourcePath = function(node) {
      return this.relative(node.source.file || 'from.css');
    };

    MapGenerator.prototype.stringify = function() {
      var builder, column, line;
      this.css = '';
      this.map = new mozilla.SourceMapGenerator({
        file: this.outputFile()
      });
      line = 1;
      column = 1;
      builder = (function(_this) {
        return function(str, node, type) {
          var last, lines, _ref, _ref1;
          _this.css += str;
          if ((node != null ? (_ref = node.source) != null ? _ref.start : void 0 : void 0) && type !== 'end') {
            _this.map.addMapping({
              source: _this.sourcePath(node),
              original: {
                line: node.source.start.line,
                column: node.source.start.column - 1
              },
              generated: {
                line: line,
                column: column - 1
              }
            });
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column = column + str.length;
          }
          if ((node != null ? (_ref1 = node.source) != null ? _ref1.end : void 0 : void 0) && type !== 'start') {
            return _this.map.addMapping({
              source: _this.sourcePath(node),
              original: {
                line: node.source.end.line,
                column: node.source.end.column
              },
              generated: {
                line: line,
                column: column
              }
            });
          }
        };
      })(this);
      return this.root.stringify(builder);
    };

    MapGenerator.prototype.getResult = function() {
      this.clearAnnotation();
      if (this.isMap()) {
        return this.generateMap();
      } else {
        return new Result(this.root.toString());
      }
    };

    return MapGenerator;

  })();

  module.exports = MapGenerator;

}).call(this);

},{"./lazy":46,"./result":53,"base64-js":58,"fs":110,"path":115,"source-map":59}],49:[function(require,module,exports){
(function() {
  var Node, Raw, clone, keys,
    __hasProp = {}.hasOwnProperty;

  Raw = require('./raw');

  clone = function(obj, parent) {
    var cloned, name, value;
    if (typeof obj !== 'object') {
      return obj;
    }
    cloned = new obj.constructor();
    for (name in obj) {
      if (!__hasProp.call(obj, name)) continue;
      value = obj[name];
      if (name === 'parent' && typeof value === 'object') {
        if (parent) {
          cloned[name] = parent;
        }
      } else if (value instanceof Array) {
        cloned[name] = value.map(function(i) {
          return clone(i, cloned);
        });
      } else {
        cloned[name] = clone(value, cloned);
      }
    }
    return cloned;
  };

  keys = function(obj, keys) {
    var all, key;
    all = {};
    for (key in keys) {
      if (obj[key] != null) {
        all[key] = obj[key];
      } else {
        return false;
      }
    }
    return all;
  };

  Node = (function() {
    function Node(defaults) {
      var name, value;
      if (defaults == null) {
        defaults = {};
      }
      for (name in defaults) {
        value = defaults[name];
        this[name] = value;
      }
    }

    Node.prop = function(name, params) {
      return Object.defineProperty(this.prototype, name, params);
    };

    Node.raw = function(name) {
      var hidden;
      hidden = '_' + name;
      return this.prop(name, {
        get: function() {
          var prop;
          prop = this[hidden];
          if (prop instanceof Raw) {
            return prop.value;
          } else {
            return prop;
          }
        },
        set: function(value) {
          if (value instanceof Raw) {
            return this[hidden] = value;
          } else {
            return this[hidden] = value;
          }
        }
      });
    };

    Node.prototype.removeSelf = function() {
      if (!this.parent) {
        return;
      }
      this.parent.remove(this);
      return this;
    };

    Node.prototype.toString = function() {
      var builder, result;
      result = '';
      builder = function(str) {
        return result += str;
      };
      this.stringify(builder);
      return result;
    };

    Node.prototype.clone = function(overrides) {
      var cloned, name, value;
      if (overrides == null) {
        overrides = {};
      }
      cloned = clone(this);
      for (name in overrides) {
        value = overrides[name];
        cloned[name] = value;
      }
      return cloned;
    };

    Node.prototype.toJSON = function() {
      var fixed, name, value;
      fixed = {};
      for (name in this) {
        if (!__hasProp.call(this, name)) continue;
        value = this[name];
        if (name === 'parent') {
          continue;
        }
        fixed[name] = value instanceof Array ? value.map(function(i) {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
          } else {
            return i;
          }
        }) : typeof value === 'object' && value.toJSON ? value.toJSON() : value;
      }
      return fixed;
    };

    Node.prototype.defaultStyle = function() {
      return {};
    };

    Node.prototype.styleType = function() {
      return this.type;
    };

    Node.prototype.style = function() {
      var all, defaults, key, merge, root, style, type;
      type = this.styleType();
      defaults = this.defaultStyle(type);
      all = keys(this, defaults);
      if (all) {
        return all;
      }
      style = defaults;
      if (this.parent) {
        root = this;
        while (root.parent) {
          root = root.parent;
        }
        root.styleCache || (root.styleCache = {});
        if (root.styleCache[type]) {
          style = root.styleCache[type];
        } else {
          root.eachInside(function(another) {
            if (another.styleType() !== type) {
              return;
            }
            if (this === another) {
              return;
            }
            all = keys(another, style);
            if (all) {
              style = all;
              return false;
            }
          });
          root.styleCache[type] = style;
        }
      }
      merge = {};
      for (key in style) {
        merge[key] = this[key] != null ? this[key] : style[key];
      }
      return merge;
    };

    return Node;

  })();

  module.exports = Node;

}).call(this);

},{"./raw":52}],50:[function(require,module,exports){
(function() {
  var AtRule, Comment, Declaration, Parser, Raw, Root, Rule, SyntexError;

  SyntexError = require('./syntax-error');

  Declaration = require('./declaration');

  Comment = require('./comment');

  AtRule = require('./at-rule');

  Root = require('./root');

  Rule = require('./rule');

  Raw = require('./raw');

  Parser = (function() {
    function Parser(source, opts) {
      this.opts = opts;
      this.source = source.toString();
      this.root = new Root();
      this.current = this.root;
      this.parents = [this.current];
      this.type = 'rules';
      this.types = [this.type];
      this.pos = -1;
      this.line = 1;
      this.lines = [];
      this.column = 0;
      this.buffer = '';
    }

    Parser.prototype.loop = function() {
      while (this.pos < this.source.length - 1) {
        this.move();
        this.nextLetter();
      }
      return this.endFile();
    };

    Parser.prototype.nextLetter = function() {
      this.inString() || this.inComment() || this.isComment() || this.isString() || this.isWrong() || this.inAtrule() || this.isAtrule() || this.isBlockEnd() || this.inSelector() || this.isSelector() || this.inProperty() || this.isProperty() || this.inValue();
      return this.unknown();
    };

    Parser.prototype.inString = function() {
      if (this.quote) {
        if (this.escape) {
          this.escape = false;
        } else if (this.letter === '\\') {
          this.escape = true;
        } else if (this.letter === this.quote) {
          this.quote = void 0;
        }
        this.trimmed += this.letter;
        return true;
      }
    };

    Parser.prototype.isString = function() {
      if (this.letter === '"' || this.letter === "'") {
        this.quote = this.letter;
        this.quotePos = {
          line: this.line,
          column: this.column
        };
        this.trimmed += this.letter;
        return true;
      }
    };

    Parser.prototype.inComment = function() {
      var left, right, text, _ref, _ref1;
      if (this.inside('comment')) {
        if (this.next('*/')) {
          _ref = this.startSpaces(this.prevBuffer()), text = _ref[0], left = _ref[1];
          _ref1 = this.endSpaces(text), text = _ref1[0], right = _ref1[1];
          this.current.text = text;
          this.current.left = left;
          this.current.right = right;
          this.move();
          this.pop();
        }
        return true;
      } else if (this.inside('value-comment')) {
        if (this.next('*/')) {
          this.popType();
          this.move();
        }
        return true;
      }
    };

    Parser.prototype.isComment = function() {
      if (this.next('/*')) {
        if (this.inside('rules') || this.inside('decls')) {
          this.init(new Comment());
          this.addType('comment');
          this.move();
          return this.buffer = '';
        } else {
          this.commentPos = {
            line: this.line,
            column: this.column
          };
          this.addType('value-comment');
          this.move();
          return true;
        }
      }
    };

    Parser.prototype.isWrong = function() {
      if (this.letter === '{' && (this.inside('decls') || this.inside('value'))) {
        this.error("Unexpected {");
      }
      if (this.inside('prop') && (this.letter === '}' || this.letter === ';')) {
        return this.error('Missing property value');
      }
    };

    Parser.prototype.isAtrule = function() {
      if (this.letter === '@' && this.inside('rules')) {
        this.init(new AtRule());
        this.current.name = '';
        this.addType('atrule-name');
        return true;
      }
    };

    Parser.prototype.inAtrule = function(close) {
      var left, raw, right, _ref, _ref1;
      if (this.inside('atrule-name')) {
        if (this.space()) {
          this.checkAtruleName();
          this.buffer = this.buffer.slice(this.current.name.length);
          this.trimmed = '';
          this.setType('atrule-param');
        } else if (this.letter === ';' || this.letter === '{' || close) {
          this.current.between = '';
          this.checkAtruleName();
          this.endAtruleParams();
        } else {
          this.current.name += this.letter;
        }
        return true;
      } else if (this.inside('atrule-param')) {
        if (this.letter === ';' || this.letter === '{' || close) {
          _ref = this.startSpaces(this.prevBuffer()), raw = _ref[0], left = _ref[1];
          _ref1 = this.endSpaces(raw), raw = _ref1[0], right = _ref1[1];
          this.current.params = this.raw(this.trimmed.trim(), raw);
          if (this.current.params) {
            this.current.afterName = left;
            this.current.between = right;
          } else {
            this.current.afterName = '';
            this.current.between = left + right;
          }
          this.endAtruleParams();
        } else {
          this.trimmed += this.letter;
        }
        return true;
      }
    };

    Parser.prototype.inSelector = function() {
      var raw, spaces, _ref;
      if (this.inside('selector')) {
        if (this.letter === '{') {
          _ref = this.endSpaces(this.prevBuffer()), raw = _ref[0], spaces = _ref[1];
          this.current.selector = this.raw(this.trimmed.trim(), raw);
          this.current.between = spaces;
          this.semicolon = false;
          this.buffer = '';
          this.setType('decls');
        } else {
          this.trimmed += this.letter;
        }
        return true;
      }
    };

    Parser.prototype.isSelector = function() {
      if (!this.space() && this.inside('rules')) {
        this.init(new Rule());
        if (this.letter === '{') {
          this.addType('decls');
          this.current.selector = '';
          this.current.between = '';
          this.semicolon = false;
          this.buffer = '';
        } else {
          this.addType('selector');
          this.buffer = this.letter;
          this.trimmed = this.letter;
        }
        return true;
      }
    };

    Parser.prototype.isBlockEnd = function() {
      if (this.letter === '}') {
        if (this.parents.length === 1) {
          this.error('Unexpected }');
        } else {
          if (this.inside('value')) {
            this.fixEnd(function() {
              return this.inValue('close');
            });
          } else {
            if (this.semicolon) {
              this.current.semicolon = true;
            }
            this.current.after = this.prevBuffer();
          }
          this.pop();
        }
        return true;
      }
    };

    Parser.prototype.inProperty = function() {
      if (this.inside('prop')) {
        if (this.letter === ':') {
          if (this.buffer[0] === '*' || this.buffer[0] === '_') {
            this.current.before += this.buffer[0];
            this.trimmed = this.trimmed.slice(1);
            this.buffer = this.buffer.slice(1);
          }
          this.current.prop = this.trimmed.trim();
          this.current.between = this.prevBuffer().slice(this.current.prop.length);
          this.buffer = '';
          this.setType('value');
          this.trimmed = '';
        } else if (this.letter === '{') {
          this.error('Unexpected { in decls');
        } else {
          this.trimmed += this.letter;
        }
        return true;
      }
    };

    Parser.prototype.isProperty = function() {
      if (this.inside('decls') && !this.space() && this.letter !== ';') {
        this.init(new Declaration());
        this.addType('prop');
        this.buffer = this.letter;
        this.trimmed = this.letter;
        this.semicolon = false;
        return true;
      }
    };

    Parser.prototype.inValue = function(close) {
      var end, match, raw, spaces, trim, _ref;
      if (this.inside('value')) {
        if (this.letter === '(') {
          this.inBrackets = true;
        } else if (this.inBrackets && this.letter === ')') {
          this.inBrackets = false;
        }
        if ((this.letter === ';' && !this.inBrackets) || close) {
          if (this.letter === ';') {
            this.semicolon = true;
          }
          _ref = this.startSpaces(this.prevBuffer()), raw = _ref[0], spaces = _ref[1];
          trim = this.trimmed.trim();
          if (match = raw.match(/\s+!important\s*$/)) {
            this.current._important = match[0];
            end = -match[0].length - 1;
            raw = raw.slice(0, +end + 1 || 9e9);
            trim = trim.replace(/\s+!important$/, '');
          }
          this.current.value = this.raw(trim, raw);
          this.current.between += ':' + spaces;
          this.pop();
        } else {
          this.trimmed += this.letter;
        }
        return true;
      }
    };

    Parser.prototype.unknown = function() {
      if (!this.space) {
        return this.error("Unexpected symbol " + this.letter);
      }
    };

    Parser.prototype.endFile = function() {
      if (this.inside('atrule-param') || this.inside('atrule-name')) {
        this.fixEnd(function() {
          return this.inAtrule('close');
        });
      }
      if (this.inside('comment')) {
        return this.error('Unclosed comment', this.current.source.start);
      } else if (this.parents.length > 1) {
        return this.error('Unclosed block', this.current.source.start);
      } else if (this.inside('value-comment')) {
        return this.error('Unclosed comment', this.commentPos);
      } else if (this.quote) {
        return this.error('Unclosed quote', this.quotePos);
      } else {
        return this.root.after = this.buffer;
      }
    };

    Parser.prototype.error = function(message, position) {
      if (position == null) {
        position = {
          line: this.line,
          column: this.column
        };
      }
      throw new SyntexError(message, this.source, position, this.opts.from);
    };

    Parser.prototype.move = function() {
      this.pos += 1;
      this.column += 1;
      this.letter = this.source[this.pos];
      this.buffer += this.letter;
      if (this.letter === "\n") {
        this.lines[this.line] = this.column - 1;
        this.line += 1;
        return this.column = 0;
      }
    };

    Parser.prototype.prevBuffer = function() {
      return this.buffer.slice(0, -1);
    };

    Parser.prototype.inside = function(type) {
      return this.type === type;
    };

    Parser.prototype.next = function(string) {
      return this.source.slice(this.pos, +(this.pos + string.length - 1) + 1 || 9e9) === string;
    };

    Parser.prototype.space = function() {
      return this.letter.match(/\s/);
    };

    Parser.prototype.init = function(node) {
      this.current.push(node);
      this.parents.push(node);
      this.current = node;
      this.current.source = {
        start: {
          line: this.line,
          column: this.column
        }
      };
      if (this.opts.from) {
        this.current.source.file = this.opts.from;
      }
      this.current.before = this.buffer.slice(0, -1);
      return this.buffer = '';
    };

    Parser.prototype.raw = function(value, raw) {
      if (value !== raw) {
        return new Raw(value, raw);
      } else {
        return value;
      }
    };

    Parser.prototype.fixEnd = function(callback) {
      var after, all, el, last, lines, start;
      if (this.letter === '}') {
        start = this.buffer.search(/\s*\}$/);
        after = this.buffer.slice(start, -1);
      } else {
        start = this.buffer.search(/\s*$/);
        after = this.buffer.slice(start);
      }
      this.buffer = this.buffer.slice(0, +start + 1 || 9e9);
      el = this.current;
      callback.apply(this);
      lines = after.match(/\n/g);
      if (lines) {
        el.source.end.line -= lines.length;
        all = this.lines[el.source.end.line];
        last = after.indexOf("\n");
        if (last === -1) {
          last = after.length;
        }
        el.source.end.column = all - last;
      } else {
        el.source.end.column -= after.length;
      }
      this.current.after = after;
      return this.buffer = after;
    };

    Parser.prototype.pop = function() {
      this.current.source.end = {
        line: this.line,
        column: this.column
      };
      this.popType();
      this.parents.pop();
      this.current = this.parents[this.parents.length - 1];
      return this.buffer = '';
    };

    Parser.prototype.addType = function(type) {
      this.types.push(type);
      return this.type = type;
    };

    Parser.prototype.setType = function(type) {
      this.types[this.types.length - 1] = type;
      return this.type = type;
    };

    Parser.prototype.popType = function() {
      this.types.pop();
      return this.type = this.types[this.types.length - 1];
    };

    Parser.prototype.atruleType = function() {
      var name;
      name = this.current.name.toLowerCase();
      if (name === 'page' || name === 'font-face' || name.slice(-8) === 'viewport') {
        return 'decls';
      } else {
        return 'rules';
      }
    };

    Parser.prototype.endAtruleParams = function() {
      var type;
      if (this.letter === '{') {
        type = this.atruleType();
        this.current.addMixin(type);
        this.setType(type);
        return this.buffer = '';
      } else {
        if (this.letter === ';') {
          this.current.semicolon = true;
        }
        return this.pop();
      }
    };

    Parser.prototype.checkAtruleName = function() {
      if (this.current.name === '') {
        return this.error('At-rule without name');
      }
    };

    Parser.prototype.startSpaces = function(string) {
      var match, pos;
      match = string.match(/^\s*/);
      if (match) {
        pos = match[0].length;
        return [string.slice(pos), match[0]];
      } else {
        return [string, ''];
      }
    };

    Parser.prototype.endSpaces = function(string) {
      var match, pos;
      match = string.match(/\s*$/);
      if (match) {
        pos = match[0].length + 1;
        return [string.slice(0, +(-pos) + 1 || 9e9), match[0]];
      } else {
        return [string, ''];
      }
    };

    return Parser;

  })();

  module.exports = function(source, opts) {
    var parser;
    if (opts == null) {
      opts = {};
    }
    parser = new Parser(source, opts);
    parser.loop();
    return parser.root;
  };

}).call(this);

},{"./at-rule":42,"./comment":43,"./declaration":45,"./raw":52,"./root":54,"./rule":55,"./syntax-error":56}],51:[function(require,module,exports){
(function() {
  var AtRule, Comment, Declaration, PostCSS, Root, Rule, postcss,
    __slice = [].slice;

  Declaration = require('./declaration');

  Comment = require('./comment');

  AtRule = require('./at-rule');

  Rule = require('./rule');

  Root = require('./root');

  PostCSS = (function() {
    function PostCSS(processors) {
      this.processors = processors != null ? processors : [];
    }

    PostCSS.prototype.use = function(processor) {
      this.processors.push(processor);
      return this;
    };

    PostCSS.prototype.process = function(css, opts) {
      var parsed, processor, returned, _i, _len, _ref;
      if (opts == null) {
        opts = {};
      }
      parsed = postcss.parse(css, opts);
      _ref = this.processors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        processor = _ref[_i];
        returned = processor(parsed);
        if (returned instanceof Root) {
          parsed = returned;
        }
      }
      return parsed.toResult(opts);
    };

    return PostCSS;

  })();

  postcss = function() {
    var processors;
    processors = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return new PostCSS(processors);
  };

  postcss.parse = require('./parse');

  postcss.comment = function(defaults) {
    return new Comment(defaults);
  };

  postcss.atRule = function(defaults) {
    return new AtRule(defaults);
  };

  postcss.decl = function(defaults) {
    return new Declaration(defaults);
  };

  postcss.rule = function(defaults) {
    return new Rule(defaults);
  };

  postcss.root = function(defaults) {
    return new Root(defaults);
  };

  module.exports = postcss;

}).call(this);

},{"./at-rule":42,"./comment":43,"./declaration":45,"./parse":50,"./root":54,"./rule":55}],52:[function(require,module,exports){
(function() {
  var Raw;

  Raw = (function() {
    Raw.load = function(value, raw) {
      if ((raw != null) && value !== raw) {
        return new Raw(value, raw);
      } else {
        return value;
      }
    };

    function Raw(value, raw) {
      this.value = value;
      this.raw = raw;
    }

    Raw.prototype.toString = function() {
      if (this.changed) {
        return this.value || '';
      } else {
        return this.raw || this.value || '';
      }
    };

    return Raw;

  })();

  module.exports = Raw;

}).call(this);

},{}],53:[function(require,module,exports){
(function() {
  var Result;

  Result = (function() {
    function Result(css, map) {
      this.css = css;
      if (map) {
        this.map = map;
      }
    }

    Result.prototype.toString = function() {
      return this.css;
    };

    return Result;

  })();

  module.exports = Result;

}).call(this);

},{}],54:[function(require,module,exports){
(function() {
  var AtRule, Comment, Container, Declaration, MapGenerator, Root, Rule,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MapGenerator = require('./map-generator');

  Declaration = require('./declaration');

  Container = require('./container');

  Comment = require('./comment');

  AtRule = require('./at-rule');

  Rule = require('./rule');

  Root = (function(_super) {
    __extends(Root, _super);

    function Root() {
      this.type = 'root';
      this.rules = [];
      Root.__super__.constructor.apply(this, arguments);
    }

    Root.prototype.normalize = function(child, sample, type) {
      child = Root.__super__.normalize.apply(this, arguments);
      if (type === 'prepend') {
        sample.before = this.rules.length > 1 ? this.rules[1].before : this.after;
      }
      return child;
    };

    Root.prototype.stringify = function(builder) {
      this.stringifyContent(builder);
      if (this.after) {
        return builder(this.after);
      }
    };

    Root.prototype.toResult = function(opts) {
      var map;
      if (opts == null) {
        opts = {};
      }
      map = new MapGenerator(this, opts);
      return map.getResult();
    };

    return Root;

  })(Container.WithRules);

  module.exports = Root;

}).call(this);

},{"./at-rule":42,"./comment":43,"./container":44,"./declaration":45,"./map-generator":48,"./rule":55}],55:[function(require,module,exports){
(function() {
  var Container, Declaration, Rule, list,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Container = require('./container');

  Declaration = require('./declaration');

  list = require('./list');

  Rule = (function(_super) {
    __extends(Rule, _super);

    function Rule() {
      this.type = 'rule';
      Rule.__super__.constructor.apply(this, arguments);
    }

    Rule.prototype.styleType = function() {
      return this.type + (this.decls.length ? '-body' : '-empty');
    };

    Rule.prototype.defaultStyle = function(type) {
      if (type === 'rule-body') {
        return {
          between: ' ',
          after: this.defaultAfter()
        };
      } else {
        return {
          between: ' ',
          after: ''
        };
      }
    };

    Rule.raw('selector');

    Rule.prop('selectors', {
      get: function() {
        return list.comma(this.selector);
      },
      set: function(values) {
        return this.selector = values.join(', ');
      }
    });

    Rule.prototype.stringify = function(builder) {
      return this.stringifyBlock(builder, this._selector + this.style().between + '{');
    };

    return Rule;

  })(Container.WithDecls);

  module.exports = Rule;

}).call(this);

},{"./container":44,"./declaration":45,"./list":47}],56:[function(require,module,exports){
(function() {
  var SyntaxError,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SyntaxError = (function(_super) {
    __extends(SyntaxError, _super);

    function SyntaxError(text, source, pos, file) {
      this.source = source;
      this.file = file;
      this.line = pos.line;
      this.column = pos.column;
      this.message = "Can't parse CSS: " + text;
      this.message += " at line " + pos.line + ":" + pos.column;
      if (this.file) {
        this.message += " in " + this.file;
      }
    }

    return SyntaxError;

  })(Error);

  module.exports = SyntaxError;

}).call(this);

},{}],57:[function(require,module,exports){
(function() {
  var vendor;

  vendor = {
    prefix: function(prop) {
      var separator;
      if (prop[0] === '-') {
        separator = prop.indexOf('-', 1) + 1;
        return prop.slice(0, separator);
      } else {
        return '';
      }
    },
    unprefixed: function(prop) {
      var separator;
      if (prop[0] === '-') {
        separator = prop.indexOf('-', 1) + 1;
        return prop.slice(separator);
      } else {
        return prop;
      }
    }
  };

  module.exports = vendor;

}).call(this);

},{}],58:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],59:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

},{"./source-map/source-map-consumer":64,"./source-map/source-map-generator":65,"./source-map/source-node":66}],60:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var isDuplicate = this.has(aStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[util.toSetString(aStr)] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                util.toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[util.toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});

},{"./util":67,"amdefine":68}],61:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string.
   */
  exports.decode = function base64VLQ_decode(aStr) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    return {
      value: fromVLQSigned(result),
      rest: aStr.slice(i)
    };
  };

});

},{"./base64":62,"amdefine":68}],62:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var charToIntMap = {};
  var intToCharMap = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('')
    .forEach(function (ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function base64_encode(aNumber) {
    if (aNumber in intToCharMap) {
      return intToCharMap[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 digit to an integer.
   */
  exports.decode = function base64_decode(aChar) {
    if (aChar in charToIntMap) {
      return charToIntMap[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  };

});

},{"amdefine":68}],63:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the next
    //      closest element that is less than that element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element which is less than the one we are searching for, so we
    //      return null.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return aHaystack[mid];
    }
    else if (cmp > 0) {
      // aHaystack[mid] is greater than our needle.
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
      }
      // We did not find an exact match, return the next closest one
      // (termination case 2).
      return aHaystack[mid];
    }
    else {
      // aHaystack[mid] is less than our needle.
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
      }
      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (2) or (3) and return the appropriate thing.
      return aLow < 0
        ? null
        : aHaystack[aLow];
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare) {
    return aHaystack.length > 0
      ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
      : null;
  };

});

},{"amdefine":68}],64:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  /**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
  SourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(SourceMapConsumer.prototype);

      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      smc.__generatedMappings = aSourceMap._mappings.slice()
        .sort(util.compareByGeneratedPositions);
      smc.__originalMappings = aSourceMap._mappings.slice()
        .sort(util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var mappingSeparator = /^[,;]/;
      var str = aStr;
      var mapping;
      var temp;

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        }
        else if (str.charAt(0) === ',') {
          str = str.slice(1);
        }
        else {
          mapping = {};
          mapping.generatedLine = generatedLine;

          // Generated column.
          temp = base64VLQ.decode(str);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;

          if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
            // Original source.
            temp = base64VLQ.decode(str);
            mapping.source = this._sources.at(previousSource + temp.value);
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source, but no line and column');
            }

            // Original line.
            temp = base64VLQ.decode(str);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source and line, but no column');
            }

            // Original column.
            temp = base64VLQ.decode(str);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;

            if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
              // Original name.
              temp = base64VLQ.decode(str);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }

          this.__generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping);
          }
        }
      }

      this.__generatedMappings.sort(util.compareByGeneratedPositions);
      this.__originalMappings.sort(util.compareByOriginalPositions);
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  SourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator);
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  SourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var mapping = this._findMapping(needle,
                                      this._generatedMappings,
                                      "generatedLine",
                                      "generatedColumn",
                                      util.compareByGeneratedPositions);

      if (mapping && mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source && this.sourceRoot) {
          source = util.join(this.sourceRoot, source);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  SourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      throw new Error('"' + aSource + '" is not in the SourceMap.');
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      if (this.sourceRoot) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }

      var mapping = this._findMapping(needle,
                                      this._originalMappings,
                                      "originalLine",
                                      "originalColumn",
                                      util.compareByOriginalPositions);

      if (mapping) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null)
        };
      }

      return {
        line: null,
        column: null
      };
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source;
        if (source && sourceRoot) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        };
      }).forEach(aCallback, context);
    };

  exports.SourceMapConsumer = SourceMapConsumer;

});

},{"./array-set":60,"./base64-vlq":61,"./binary-search":63,"./util":67,"amdefine":68}],65:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = [];
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source) {
          newMapping.source = mapping.source;
          if (sourceRoot) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      this._validateMapping(generated, original, source, name);

      if (source && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.push({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent !== null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (!aSourceFile) {
        if (!aSourceMapConsumer.file) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        aSourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "aSourceFile" relative if an absolute Url is passed.
      if (sourceRoot) {
        aSourceFile = util.relative(sourceRoot, aSourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "aSourceFile"
      this._mappings.forEach(function (mapping) {
        if (mapping.source === aSourceFile && mapping.originalLine) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source !== null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name !== null && mapping.name !== null) {
              // Only use the identifier name if it's an identifier
              // in both SourceMaps
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          if (sourceRoot) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      // The mappings must be guaranteed to be in sorted order before we start
      // serializing them or else the generated line numbers (which are defined
      // via the ';' separators) will be all messed up. Note: it might be more
      // performant to maintain the sorting as we insert them, rather than as we
      // serialize them, but the big O is the same either way.
      this._mappings.sort(util.compareByGeneratedPositions);

      for (var i = 0, len = this._mappings.length; i < len; i++) {
        mapping = this._mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, this._mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        file: this._file,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._sourceRoot) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});

},{"./array-set":60,"./base64-vlq":61,"./util":67,"amdefine":68}],66:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine === undefined ? null : aLine;
    this.column = aColumn === undefined ? null : aColumn;
    this.source = aSource === undefined ? null : aSource;
    this.name = aName === undefined ? null : aName;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // The generated code
      // Processed fragments are removed from this array.
      var remainingLines = aGeneratedCode.split('\n');

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = "";
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, remainingLines.shift() + "\n");
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(remainingLines.shift() + "\n");
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          var lastLine = remainingLines.shift();
          if (remainingLines.length > 0) lastLine += "\n";
          addMappingWithCode(lastMapping, lastLine);
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join("\n"));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  mapping.source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk instanceof SourceNode) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild instanceof SourceNode) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i] instanceof SourceNode) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      chunk.split('').forEach(function (ch, idx, array) {
        if (ch === '\n') {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === array.length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      });
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});

},{"./source-map-generator":65,"./util":67,"amdefine":68}],67:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consequtive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = (path.charAt(0) === '/');

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  function relative(aRoot, aPath) {
    aRoot = aRoot.replace(/\/$/, '');

    var url = urlParse(aRoot);
    if (aPath.charAt(0) == "/" && url && url.path == "/") {
      return aPath.slice(1);
    }

    return aPath.indexOf(aRoot + '/') === 0
      ? aPath.substr(aRoot.length + 1)
      : aPath;
  }
  exports.relative = relative;

  function strcmp(aStr1, aStr2) {
    var s1 = aStr1 || "";
    var s2 = aStr2 || "";
    return (s1 > s2) - (s1 < s2);
  }

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp;

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp || onlyCompareOriginal) {
      return cmp;
    }

    cmp = strcmp(mappingA.name, mappingB.name);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    return mappingA.generatedColumn - mappingB.generatedColumn;
  };
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings where the generated positions are
   * compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
    var cmp;

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp || onlyCompareGenerated) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  };
  exports.compareByGeneratedPositions = compareByGeneratedPositions;

});

},{"amdefine":68}],68:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                process.nextTick(function () {
                    callback.apply(null, deps);
                });
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require("/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/../node_modules/autoprefixer/node_modules/postcss/node_modules/source-map/node_modules/amdefine/amdefine.js")
},{"/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":114,"path":115}],69:[function(require,module,exports){
module.exports = function (ast, rework) {

  var newSels = [];
  var allSels = [];

  ast.rules.forEach(function visit(rule) {
    rule.selectors.forEach(function (allSel) {
      if (allSel.match(/^\(.+?\)/)) {
        allSel = allSel.slice(1, -1);
      }
      if (allSel.match(/^\%.+?/)) {
        allSel = allSel.slice(1);
      }
      Array.prototype.push.apply(allSels, [allSel]);
    });
  });

  ast.rules.forEach(function visit(rule) {
    if (rule.rules)  {
      rule.rules.forEach(visit);
    }

    if (!rule.selectors) return;

    rule.selectors.forEach(function (sel, index, arr) {
      if (sel.match(/^\(.+?\)/)) {
        var s = sel.slice(1, -1);
        Array.prototype.push.apply(newSels, [s]);
        if (check(s)) {
          arr[index] = s;
        } else {
          var err =  new Error('rework-rule-binding: binding-selector must not cascade');
          err.position = rule.declarations.position;
          throw err;
        }
      }
      if (sel.match(/^\%.+?/)) {
        var s = sel.slice(1);
        Array.prototype.push.apply(newSels, [s]);
        if (check(s)) {
          arr[index] = s;
        } else {
          var err = new Error('rework-rule-binding: placeholder selector must not cascade');
          err.position = rule.declarations.position;
          throw err;
        }
      }
    });
  });

  function check(sel) {
    var counter = 0;
    if (allSels.length > 0) {
      for (var i = 0; i < allSels.length; i++) {
        if (allSels[i] == sel) {
          counter++;
        }
      }
      if (counter > 1) {
        return false;
      } else {
        return true;
      }
    }
  }
};

},{}],70:[function(require,module,exports){

/**
 * Module dependencies.
 */

var visit = require('rework-visit');

/**
 * Module export.
 */

module.exports = function(jsmap) {

  return function vars(style){
    var map = jsmap || {};

    // define variables
    style.rules.forEach(function (rule) {
      var i;
      var name;
      var varNameIndices = [];

      if (rule.type === 'rule') {
        // only variables declared for `:root` are supported
        if (rule.selectors.length === 1 && rule.selectors[0] === ':root') {
          rule.declarations.forEach(function(decl, idx){
            if (decl.property && /\bvar\-/.test(decl.property)) {
              name = decl.property.replace('var-', '');
              map[name] = decl.value;
              varNameIndices.push(idx);
            }
          });

          // remove `var-*` properties from the rule
          for (i = varNameIndices.length - 1; i >= 0; i -= 1) {
            rule.declarations.splice(varNameIndices[i], 1);
          }
        }
      }
    });

    visit(style, function(declarations, node){
      // resolve variables
      declarations.forEach(function(decl, idx){
        if (decl.value && /\bvar\(/.test(decl.value)) {
          decl.value = replaceValue(decl.value, map);
        }
      });
    });
  };
};

/**
 * Resolve CSS variables in a value
 *
 * The second argument to a CSS variable function, if provided, is a fallback
 * value, which is used as the substitution value when the referenced variable
 * is invalid.
 *
 * var(name[, fallback])
 *
 * Since the fallback can be *any* value, the value needs to be parsed
 * character-by-character to deduce the contents of a variable function.
 *
 * @param {String} value A property value known to contain CSS variable functions
 * @param {Object} map A map of variable names and values
 * @return {String} A property value with all CSS variables substituted.
 */

function replaceValue(value, map){
  // matches `var(name[, fallback])`, captures 'name' and 'fallback'
  var RE_VAR = /\bvar\(([\w-]+)(?:\s*,\s*)?(.*)?\)/;
  // matches `var()`
  var RE_EMPTY_VAR = /\bvar\(\s*\)/;

  var valueLen = value.length;
  var beginSlice = value.indexOf('var(');
  var endSlice = beginSlice + 'var('.length;
  var depth = 1;
  var currentChar;
  var cssVariable;

  // find the closing `)` of the CSS variable function,
  // accounting for nested functions
  while (endSlice < valueLen && depth > 0) {
    currentChar = value.charAt(endSlice);
    if (currentChar == '(') depth += 1;
    if (currentChar == ')') depth -= 1;
    endSlice += 1;
  }

  if (depth > 0) throw new Error('rework-vars: missing closing ")" in the value "' + value + '"');

  cssVariable = value.slice(beginSlice, endSlice);

  if (RE_EMPTY_VAR.test(cssVariable)) throw new Error('rework-vars: var() must contain a non-whitespace string');

  cssReplacement = cssVariable.replace(RE_VAR, function(_, name, fallback){
    var replacement = map[name];
    if (!replacement && !fallback) throw new Error('rework-vars: variable "' + name + '" is undefined');
    if (!replacement && fallback) return fallback;
    return replacement;
  });

  // resolve the variable
  value = value.split(cssVariable).join(cssReplacement);

  // recursively resolve any remaining variables
  if (/\bvar\(/.test(value)) {
    value = replaceValue(value, map);
  }

  return value;
}

},{"rework-visit":71}],71:[function(require,module,exports){

/**
 * Expose `visit()`.
 */

module.exports = visit;

/**
 * Visit `node`'s declarations recursively and
 * invoke `fn(declarations, node)`.
 *
 * @param {Object} node
 * @param {Function} fn
 * @api private
 */

function visit(node, fn){
  node.rules.forEach(function(rule){
    // @media etc
    if (rule.rules) {
      visit(rule, fn);
      return;
    }

    // keyframes
    if (rule.keyframes) {
      rule.keyframes.forEach(function(keyframe){
        fn(keyframe.declarations, rule);
      });
      return;
    }

    // @charset, @import etc
    if (!rule.declarations) return;

    fn(rule.declarations, node);
  });
};

},{}],72:[function(require,module,exports){

module.exports = require('./lib/rework');
},{"./lib/rework":82}],73:[function(require,module,exports){

/**
 * Module dependencies.
 */

var utils = require('../utils');
var path = require('path');
var stripQuotes = utils.stripQuotes;

/**
 * Vendor crap.
 */

var query = [
  '(min--moz-device-pixel-ratio: 1.5)',
  '(-o-min-device-pixel-ratio: 3/2)',
  '(-webkit-min-device-pixel-ratio: 1.5)',
  '(min-device-pixel-ratio: 1.5)',
  '(min-resolution: 144dpi)',
  '(min-resolution: 1.5dppx)'
].join(', ');

/**
 * Translate
 *
 *   .logo {
 *     background-image: url('/public/images/logo.png')
 *   }
 *
 * yields:
 *
 *   .logo {
 *     background-image: url('/public/images/logo.png')
 *   }
 *
 *   @media all and (-webkit-min-device-pixel-ratio : 1.5) {
 *     .logo {
 *       background-image: url("/public/images/logo@2x.png");
 *       background-size: contain
 *     }
 *   }
 *
 */

module.exports = function() {
  return function(style){
    style.rules.forEach(function(rule){
      if (!rule.declarations) return;

      var backgroundSize = rule.declarations.filter(backgroundWithSize).map(value)[0] || 'contain';

      rule.declarations.filter(backgroundWithHiResURL).forEach(function(decl){
        if ('comment' == decl.type) return;

        // parse url
        var val = decl.value.replace(/\s+(at-2x)\s*(;|$)/, '$2');
        decl.value = val;
        var i = val.indexOf('url(');
        var url = stripQuotes(val.slice(i + 4, val.indexOf(')', i)));
        var ext = path.extname(url);

        // ignore .svg
        if ('.svg' == ext) return;

        // @2x value
        url = path.join(path.dirname(url), path.basename(url, ext) + '@2x' + ext);

        // wrap in @media
        style.rules.push({
          type: 'media',
          media: query,
          rules: [
            {
              type: 'rule',
              selectors: rule.selectors,
              declarations: [
                {
                  type: 'declaration',
                  property: 'background-image',
                  value: 'url("' + url + '")'
                },
                {
                  type: 'declaration',
                  property: 'background-size',
                  value: backgroundSize
                }
              ]
            }
          ]
        });
      });
    });
  };
};

/**
 * Filter background[-image] with url().
 */

function backgroundWithHiResURL(decl) {
  return ('background' == decl.property
    || 'background-image' == decl.property)
    && ~decl.value.indexOf('url(')
    && ~decl.value.indexOf('at-2x');
}

/**
 * Predicate on background-size property.
 */

function backgroundWithSize(decl) {
  return 'background-size' == decl.property;
}

/**
 * Return value atribute of a declaration.
 */

function value(decl) {
  return decl.value;
}

},{"../utils":83,"path":115}],74:[function(require,module,exports){

/**
 * Module dependencies.
 */

var parse = require('color-parser');
var hsb2rgb = require('hsb2rgb');
var functions = require('./function');

/**
 * Provide color manipulation helpers.
 */

module.exports = function() {
  return functions({

    /**
     * Converts RGBA(color, alpha) to the corrosponding RGBA(r, g, b, a) equivalent.
     *
     *    background: rgba(#eee, .5)
     *    background: rgba(white, .2)
     *
     */

    rgba: function(color, alpha){
      var args;
      if (2 == arguments.length) {
        var c = parse(color.trim());
        args = [c.r, c.g, c.b, alpha];
      } else {
        args = [].slice.call(arguments);
      }

      return 'rgba(' + args.join(', ') + ')';
    },

    /**
     * Converts HSV (HSB) color values to RGB.
     * Saturation and brightness can be expressed as floats or percentages.
     *
     *     color: hsb(220, 45%, .3);
     *     color: hsb(220deg, 0.45, 30%);
     *
     */

    hsb: function (hue, saturation, value) {
      var rgb = hsb2rgb(hue, saturation, value);
      return 'rgb(' + rgb.join(', ') + ')';
    },


    /**
     * Converts HSV (HSB) color values with alpha specified to RGBa.
     * Saturation, brightness and alpha can be expressed as floats or
     * percentages.
     *
     *     color: hsba(220, 45%, .3, .4);
     *     color: hsba(220deg, 0.45, 30%, 40%);
     *
     */

    hsba: function (hue, saturation, value, alpha) {
      alpha = /%/.test(alpha)
        ? parseInt(alpha, 10) / 100
        : parseFloat(alpha, 10);

      alpha = String(alpha).replace(/^0+\./, '.');

      var rgb = hsb2rgb(hue, saturation, value);
      return 'rgba(' + rgb.join(', ') + ', ' + alpha + ')';
    }
  });
};

},{"./function":76,"color-parser":86,"hsb2rgb":106}],75:[function(require,module,exports){

/**
 * Module dependencies.
 */

var visit = require('../visit');

/**
 * Easing functions.
 */

var ease = {
  'ease-in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
  'ease-in-out-expo': 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
  'ease-in-out-sine': 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
  'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
  'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  'ease-in-out-quad': 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
  'ease-out-circ': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  'ease-out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  'ease-out-sine': 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  'ease-out-quad': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  'ease-in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  'ease-in-circ': 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  'ease-in-expo': 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  'ease-in-sine': 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  'ease-in-quint': 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  'ease-in-quart': 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  'ease-in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  'ease-in-quad': 'cubic-bezier(0.550, 0.085, 0.680, 0.530)'
};

/**
 * Keys.
 */

var keys = Object.keys(ease);

/**
 * Provide additional easing functions:
 *
 *    #logo {
 *      transition: all 500ms ease-out-back;
 *    }
 *
 * yields:
 *
 *    #logo {
 *      transition: all 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275)
 *    }
 *
 */

module.exports = function() {
  return function(style){
    visit.declarations(style, substitute);
  }
};

/**
 * Substitute easing functions.
 *
 * @api private
 */

function substitute(declarations) {
  for (var i = 0, len = declarations.length; i < len; ++i) {
    var decl = declarations[i];
    if ('comment' == decl.type) continue;
    if (!decl.property.match(/transition|animation|timing/)) continue;
    for (var k = 0; k < keys.length; ++k) {
      var key = keys[k];
      if (~decl.value.indexOf(key)) {
        decl.value = decl.value.replace(key, ease[key]);
        break;
      }
    }
  }
}

},{"../visit":84}],76:[function(require,module,exports){

/**
 * Module dependencies.
 */

var visit = require('../visit');
var utils = require('../utils');
var strip = utils.stripQuotes;

/**
 * Define custom function.
 */

module.exports = function(functions, args) {
  if (!functions) throw new Error('functions object required');
  return function(style){
    var functionMatcher = functionMatcherBuilder(Object.keys(functions).join('|'));

    visit.declarations(style, function(declarations){
      func(declarations, functions, functionMatcher, args);
    });
  }
};

/**
 * Visit declarations and apply functions.
 *
 * @param {Array} declarations
 * @param {Object} functions
 * @param {RegExp} functionMatcher
 * @param {Boolean} [parseArgs]
 * @api private
 */

function func(declarations, functions, functionMatcher, parseArgs) {
  if (false !== parseArgs) parseArgs = true;

  declarations.forEach(function(decl){
    if ('comment' == decl.type) return;
    var generatedFuncs = [], result, generatedFunc;

    while (decl.value.match(functionMatcher)) {
      decl.value = decl.value.replace(functionMatcher, function(_, name, args){
        if (parseArgs) {
          args = args.split(/\s*,\s*/).map(strip);
        } else {
          args = [strip(args)];
        }
        // Ensure result is string
        result = '' + functions[name].apply(decl, args);

        // Prevent fall into infinite loop like this:
        //
        // {
        //   url: function(path) {
        //     return 'url(' + '/some/prefix' + path + ')'
        //   }
        // }
        //
        generatedFunc = {from: name, to: name + getRandomString()};
        result = result.replace(functionMatcherBuilder(name), generatedFunc.to + '($2)');
        generatedFuncs.push(generatedFunc);
        return result;
      });
    }

    generatedFuncs.forEach(function(func) {
      decl.value = decl.value.replace(func.to, func.from);
    })
  });
}

/**
 * Build function regexp
 *
 * @param {String} name
 * @api private
 */

function functionMatcherBuilder(name) {
  // /(?!\W+)(\w+)\(([^()]+)\)/
  return new RegExp("(?!\\W+)(" + name + ")\\(([^\(\)]+)\\)");
}

/**
 * get random string
 *
 * @api private
 */

function getRandomString() {
  return Math.random().toString(36).slice(2);
}


},{"../utils":83,"../visit":84}],77:[function(require,module,exports){
(function (Buffer){

/**
 * Module dependencies.
 */

var func = require('./function');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var read = fs.readFileSync;
var exists = fs.existsSync;

/**
 * Inline images and fonts.
 *
 *    .logo {
 *      background: inline(icons/logo.png);
 *    }
 *
 * yields:
 *
 *    .logo {
 *      background: url("data:image/png;base64,iVBORw0…");
 *    }
 *
 */

module.exports = function(dirs) {
  if (!Array.isArray(dirs)) {
    dirs = Array.prototype.slice.call(arguments);
  }

  function inline(filename){
    var file = dirs.map(function(dir) {
      return path.join(dir, filename);
    }).filter(exists)[0];

    if (!file) throw new Error('inline(): failed to find "' + filename + '"');

    var type = mime.lookup(file);
    var base64 = new Buffer(read(file)).toString('base64');
    return 'url("data:' + type + ';base64,' + base64 + '")';
  }

  return func({ inline: inline });
};

}).call(this,require("buffer").Buffer)
},{"./function":76,"buffer":111,"fs":110,"mime":107,"path":115}],78:[function(require,module,exports){

/**
 * Module dependencies.
 */

var visit = require('../visit');

/**
 * Define custom mixins.
 */

module.exports = function(mixins) {
  if (!mixins) throw new Error('mixins object required');
  return function(style, rework){
    visit.declarations(style, function(declarations){
      mixin(rework, declarations, mixins);
    });
  }
};

/**
 * Visit declarations and apply mixins.
 *
 * @param {Rework} rework
 * @param {Array} declarations
 * @param {Object} mixins
 * @api private
 */

function mixin(rework, declarations, mixins) {
  for (var i = 0; i < declarations.length; ++i) {
    var decl = declarations[i];
    if ('comment' == decl.type) continue;

    var key = decl.property;
    var val = decl.value;
    var fn = mixins[key];
    if (!fn) continue;

    // invoke mixin
    var ret = fn.call(rework, val);

    // apply properties
    for (var key in ret) {
      var val = ret[key];
      if (Array.isArray(val)) {
        val.forEach(function(val){
          declarations.splice(i++, 0, {
            type: 'declaration',
            property: key,
            value: val
          });
        });
      } else {
        declarations.splice(i++, 0, {
          type: 'declaration',
          property: key,
          value: val
        });
      }
    }

    // remove original
    declarations.splice(i--, 1);
  }
}

},{"../visit":84}],79:[function(require,module,exports){

/**
 * Prefix selectors with `str`.
 *
 *    button {
 *      color: red;
 *    }
 *
 * yields:
 *
 *    #dialog button {
 *      color: red;
 *    }
 *
 */

module.exports = function(str) {
  return function(style){
    style.rules = style.rules.map(function(rule){
      if (!rule.selectors) return rule;
      rule.selectors = rule.selectors.map(function(selector){
        if (':root' == selector) return str;
        selector = selector.replace(/^\:root\s?/, '');
        return str + ' ' + selector;
      });
      return rule;
    });
  }
};

},{}],80:[function(require,module,exports){

/**
 * Module dependencies.
 */

var visit = require('../visit');

/**
 * Provide property reference support.
 *
 *    button {
 *      width: 50px;
 *      height: @width;
 *      line-height: @height;
 *    }
 *
 * yields:
 *
 *    button {
 *      width: 50px;
*       height: 50px;
*       line-height: 50px;
 *    }
 *
 */

module.exports = function() {
  return function(style){
    visit.declarations(style, substitute);
  }
};

/**
 * Substitute easing functions.
 *
 * @api private
 */

function substitute(declarations) {
  var map = {};

  for (var i = 0, len = declarations.length; i < len; ++i) {
    var decl = declarations[i];
    var key = decl.property;
    var val = decl.value;

    if ('comment' == decl.type) continue;

    decl.value = val.replace(/@([-\w]+)/g, function(_, name){
      // TODO: fix this problem for real with visionmedia/css-value
      if ('2x' == name) return '@' + name;
      if (null == map[name]) throw new Error('@' + name + ' is not defined in this scope');
      return map[name];
    });

    map[key] = decl.value;
  }
}

},{"../visit":84}],81:[function(require,module,exports){

/**
 * Module dependencies.
 */

var func = require('./function');

/**
 * Map `url()` calls.
 *
 *   body {
 *     background: url(/images/bg.png);
 *   }
 *
 * yields:
 *
 *   body {
 *     background: url(http://example.com/images/bg.png);
 *   }
 *
 */

module.exports = function(fn) {
  return func({
    url: function(path){
      return 'url("' + fn(path) + '")';
    }
  }, false);
};

},{"./function":76}],82:[function(require,module,exports){

/**
 * Module dependencies.
 */

var css = require('css');

/**
 * Expose `rework`.
 */

exports = module.exports = rework;

/**
 * Expose `visit` helpers.
 */

exports.visit = require('./visit');

/**
 * Expose prefix properties.
 */

exports.__defineGetter__('properties', function () {
  console.warn('rework.properties has been removed.');
  return [];
})

/**
 * Initialize a new stylesheet `Rework` with `str`.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Rework}
 * @api public
 */

function rework(str, options) {
  options = options || {};
  options.position = true; // we need this for sourcemaps
  return new Rework(css.parse(str, options));
}

/**
 * Initialize a new stylesheet `Rework` with `obj`.
 *
 * @param {Object} obj
 * @api private
 */

function Rework(obj) {
  this.obj = obj;
}

/**
 * Use the given plugin `fn(style, rework)`.
 *
 * @param {Function} fn
 * @return {Rework}
 * @api public
 */

Rework.prototype.use = function(fn){
  fn(this.obj.stylesheet, this);
  return this;
};

/**
 * Specify global vendor `prefixes`,
 * explicit ones may still be passed
 * to most plugins.
 *
 * Deprecated as of https://github.com/visionmedia/rework/issues/126.
 *
 * @param {Array} prefixes
 * @return {Rework}
 * @api public
 */

Rework.prototype.vendors = function(prefixes){
  console.warn('rework.vendors() is deprecated. Please see: https://github.com/visionmedia/rework/issues/126.');
  this.prefixes = prefixes;
  return this;
};

/**
 * Stringify the stylesheet.
 *
 * @param {Object} options
 * @return {String}
 * @api public
 */

Rework.prototype.toString = function(options){
  options = options || {};
  var result = css.stringify(this.obj, options);
  if (options.sourcemap && !options.sourcemapAsObject) {
    result = result.code + '\n' + sourcemapToComment(result.map);
  }
  return result;
};

/**
 * Convert sourcemap to base64-encoded comment
 *
 * @param {Object} map
 * @return {String}
 * @api private
 */

function sourcemapToComment(map) {
  var convertSourceMap = require('convert-source-map');
  var content = convertSourceMap.fromObject(map).toBase64();
  return '/*# sourceMappingURL=data:application/json;base64,' + content + ' */';
}

/**
 * Expose plugins.
 */

exports.mixin = exports.mixins = require('./plugins/mixin');
exports.function = exports.functions = require('./plugins/function');
exports.colors = require('./plugins/colors');
exports.extend = require('rework-inherit');
exports.references = require('./plugins/references');
exports.prefixSelectors = require('./plugins/prefix-selectors');
exports.at2x = require('./plugins/at2x');
exports.url = require('./plugins/url');
exports.ease = require('./plugins/ease');

/**
 * Warn if users try to use removed components.
 * This will be removed in v1.
 */

[
  'vars',
  'keyframes',
  'prefix',
  'prefixValue',
].forEach(function (plugin) {
  exports[plugin] = function () {
    console.warn('rework.' + plugin + '() has been removed from rework core. Please view https://github.com/visionmedia/rework or https://github.com/visionmedia/rework/wiki/Plugins-and-Utilities.');
    return noop;
  };
});

/**
 * Try/catch plugins unavailable in component.
 */

 try {
  exports.inline = require('./plugins/inline');
} catch (err) {}

function noop(){}

},{"./plugins/at2x":73,"./plugins/colors":74,"./plugins/ease":75,"./plugins/function":76,"./plugins/inline":77,"./plugins/mixin":78,"./plugins/prefix-selectors":79,"./plugins/references":80,"./plugins/url":81,"./visit":84,"convert-source-map":87,"css":88,"rework-inherit":108}],83:[function(require,module,exports){

/**
 * Strip `str` quotes.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.stripQuotes = function(str) {
  if ('"' == str[0] || "'" == str[0]) return str.slice(1, -1);
  return str;
};
},{}],84:[function(require,module,exports){

// TODO: require() directly in plugins...
exports.declarations = require('rework-visit');

},{"rework-visit":109}],85:[function(require,module,exports){

module.exports = {
    aliceblue: [240, 248, 255]
  , antiquewhite: [250, 235, 215]
  , aqua: [0, 255, 255]
  , aquamarine: [127, 255, 212]
  , azure: [240, 255, 255]
  , beige: [245, 245, 220]
  , bisque: [255, 228, 196]
  , black: [0, 0, 0]
  , blanchedalmond: [255, 235, 205]
  , blue: [0, 0, 255]
  , blueviolet: [138, 43, 226]
  , brown: [165, 42, 42]
  , burlywood: [222, 184, 135]
  , cadetblue: [95, 158, 160]
  , chartreuse: [127, 255, 0]
  , chocolate: [210, 105, 30]
  , coral: [255, 127, 80]
  , cornflowerblue: [100, 149, 237]
  , cornsilk: [255, 248, 220]
  , crimson: [220, 20, 60]
  , cyan: [0, 255, 255]
  , darkblue: [0, 0, 139]
  , darkcyan: [0, 139, 139]
  , darkgoldenrod: [184, 132, 11]
  , darkgray: [169, 169, 169]
  , darkgreen: [0, 100, 0]
  , darkgrey: [169, 169, 169]
  , darkkhaki: [189, 183, 107]
  , darkmagenta: [139, 0, 139]
  , darkolivegreen: [85, 107, 47]
  , darkorange: [255, 140, 0]
  , darkorchid: [153, 50, 204]
  , darkred: [139, 0, 0]
  , darksalmon: [233, 150, 122]
  , darkseagreen: [143, 188, 143]
  , darkslateblue: [72, 61, 139]
  , darkslategray: [47, 79, 79]
  , darkslategrey: [47, 79, 79]
  , darkturquoise: [0, 206, 209]
  , darkviolet: [148, 0, 211]
  , deeppink: [255, 20, 147]
  , deepskyblue: [0, 191, 255]
  , dimgray: [105, 105, 105]
  , dimgrey: [105, 105, 105]
  , dodgerblue: [30, 144, 255]
  , firebrick: [178, 34, 34]
  , floralwhite: [255, 255, 240]
  , forestgreen: [34, 139, 34]
  , fuchsia: [255, 0, 255]
  , gainsboro: [220, 220, 220]
  , ghostwhite: [248, 248, 255]
  , gold: [255, 215, 0]
  , goldenrod: [218, 165, 32]
  , gray: [128, 128, 128]
  , green: [0, 128, 0]
  , greenyellow: [173, 255, 47]
  , grey: [128, 128, 128]
  , honeydew: [240, 255, 240]
  , hotpink: [255, 105, 180]
  , indianred: [205, 92, 92]
  , indigo: [75, 0, 130]
  , ivory: [255, 255, 240]
  , khaki: [240, 230, 140]
  , lavender: [230, 230, 250]
  , lavenderblush: [255, 240, 245]
  , lawngreen: [124, 252, 0]
  , lemonchiffon: [255, 250, 205]
  , lightblue: [173, 216, 230]
  , lightcoral: [240, 128, 128]
  , lightcyan: [224, 255, 255]
  , lightgoldenrodyellow: [250, 250, 210]
  , lightgray: [211, 211, 211]
  , lightgreen: [144, 238, 144]
  , lightgrey: [211, 211, 211]
  , lightpink: [255, 182, 193]
  , lightsalmon: [255, 160, 122]
  , lightseagreen: [32, 178, 170]
  , lightskyblue: [135, 206, 250]
  , lightslategray: [119, 136, 153]
  , lightslategrey: [119, 136, 153]
  , lightsteelblue: [176, 196, 222]
  , lightyellow: [255, 255, 224]
  , lime: [0, 255, 0]
  , limegreen: [50, 205, 50]
  , linen: [250, 240, 230]
  , magenta: [255, 0, 255]
  , maroon: [128, 0, 0]
  , mediumaquamarine: [102, 205, 170]
  , mediumblue: [0, 0, 205]
  , mediumorchid: [186, 85, 211]
  , mediumpurple: [147, 112, 219]
  , mediumseagreen: [60, 179, 113]
  , mediumslateblue: [123, 104, 238]
  , mediumspringgreen: [0, 250, 154]
  , mediumturquoise: [72, 209, 204]
  , mediumvioletred: [199, 21, 133]
  , midnightblue: [25, 25, 112]
  , mintcream: [245, 255, 250]
  , mistyrose: [255, 228, 225]
  , moccasin: [255, 228, 181]
  , navajowhite: [255, 222, 173]
  , navy: [0, 0, 128]
  , oldlace: [253, 245, 230]
  , olive: [128, 128, 0]
  , olivedrab: [107, 142, 35]
  , orange: [255, 165, 0]
  , orangered: [255, 69, 0]
  , orchid: [218, 112, 214]
  , palegoldenrod: [238, 232, 170]
  , palegreen: [152, 251, 152]
  , paleturquoise: [175, 238, 238]
  , palevioletred: [219, 112, 147]
  , papayawhip: [255, 239, 213]
  , peachpuff: [255, 218, 185]
  , peru: [205, 133, 63]
  , pink: [255, 192, 203]
  , plum: [221, 160, 203]
  , powderblue: [176, 224, 230]
  , purple: [128, 0, 128]
  , red: [255, 0, 0]
  , rosybrown: [188, 143, 143]
  , royalblue: [65, 105, 225]
  , saddlebrown: [139, 69, 19]
  , salmon: [250, 128, 114]
  , sandybrown: [244, 164, 96]
  , seagreen: [46, 139, 87]
  , seashell: [255, 245, 238]
  , sienna: [160, 82, 45]
  , silver: [192, 192, 192]
  , skyblue: [135, 206, 235]
  , slateblue: [106, 90, 205]
  , slategray: [119, 128, 144]
  , slategrey: [119, 128, 144]
  , snow: [255, 255, 250]
  , springgreen: [0, 255, 127]
  , steelblue: [70, 130, 180]
  , tan: [210, 180, 140]
  , teal: [0, 128, 128]
  , thistle: [216, 191, 216]
  , tomato: [255, 99, 71]
  , turquoise: [64, 224, 208]
  , violet: [238, 130, 238]
  , wheat: [245, 222, 179]
  , white: [255, 255, 255]
  , whitesmoke: [245, 245, 245]
  , yellow: [255, 255, 0]
  , yellowgreen: [154, 205, 5]
};
},{}],86:[function(require,module,exports){

/**
 * Module dependencies.
 */

var colors = require('./colors');

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Parse `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

function parse(str) {
  return named(str)
    || hex3(str)
    || hex6(str)
    || rgb(str)
    || rgba(str);
}

/**
 * Parse named css color `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function named(str) {
  var c = colors[str.toLowerCase()];
  if (!c) return;
  return {
    r: c[0],
    g: c[1],
    b: c[2]
  }
}

/**
 * Parse rgb(n, n, n)
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function rgb(str) {
  if (0 == str.indexOf('rgb(')) {
    str = str.match(/rgb\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: 1
    }
  }
}

/**
 * Parse rgba(n, n, n, n)
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function rgba(str) {
  if (0 == str.indexOf('rgba(')) {
    str = str.match(/rgba\(([^)]+)\)/)[1];
    var parts = str.split(/ *, */).map(Number);
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: parts[3]
    }
  }
}

/**
 * Parse #nnnnnn
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function hex6(str) {
  if ('#' == str[0] && 7 == str.length) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: 1
    }
  }
}

/**
 * Parse #nnn
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function hex3(str) {
  if ('#' == str[0] && 4 == str.length) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: 1
    }
  }
}


},{"./colors":85}],87:[function(require,module,exports){
(function (Buffer){
'use strict';
var fs = require('fs');
var path = require('path');

var commentRx = /^[ \t]*\/\/[@#][ \t]+sourceMappingURL=data:(?:application|text)\/json;base64,(.+)/mg;
var mapFileCommentRx = 
  // //# sourceMappingURL=foo.js.map                       /*# sourceMappingURL=foo.js.map */
  /(?:^[ \t]*\/\/[@|#][ \t]+sourceMappingURL=(.+?)[ \t]*$)|(?:^[ \t]*\/\*[@#][ \t]+sourceMappingURL=(.+?)[ \t]*\*\/[ \t]*$)/mg

function decodeBase64(base64) {
  return new Buffer(base64, 'base64').toString();
}

function stripComment(sm) {
  return sm.split(',').pop();
}

function readFromFileMap(sm, dir) {
  // NOTE: this will only work on the server since it attempts to read the map file

  var r = mapFileCommentRx.exec(sm);
  mapFileCommentRx.lastIndex = 0;
  
  // for some odd reason //# .. captures in 1 and /* .. */ in 2
  var filename = r[1] || r[2];
  var filepath = path.join(dir, filename);

  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    throw new Error('An error occurred while trying to read the map file at ' + filepath + '\n' + e);
  }
}

function Converter (sm, opts) {
  opts = opts || {};
  try {
    if (opts.isFileComment) sm = readFromFileMap(sm, opts.commentFileDir);
    if (opts.hasComment) sm = stripComment(sm);
    if (opts.isEncoded) sm = decodeBase64(sm);
    if (opts.isJSON || opts.isEncoded) sm = JSON.parse(sm);

    this.sourcemap = sm;
  } catch(e) {
    console.error(e);
    return null;
  }
}

Converter.prototype.toJSON = function (space) {
  return JSON.stringify(this.sourcemap, null, space);
};

Converter.prototype.toBase64 = function () {
  var json = this.toJSON();
  return new Buffer(json).toString('base64');
};

Converter.prototype.toComment = function () {
  var base64 = this.toBase64();
  return '//# sourceMappingURL=data:application/json;base64,' + base64;
};

// returns copy instead of original
Converter.prototype.toObject = function () {
  return JSON.parse(this.toJSON());
};

Converter.prototype.addProperty = function (key, value) {
  if (this.sourcemap.hasOwnProperty(key)) throw new Error('property %s already exists on the sourcemap, use set property instead');
  return this.setProperty(key, value);
};

Converter.prototype.setProperty = function (key, value) {
  this.sourcemap[key] = value;
  return this;
};

Converter.prototype.getProperty = function (key) {
  return this.sourcemap[key];
};

exports.fromObject = function (obj) {
  return new Converter(obj);
};

exports.fromJSON = function (json) {
  return new Converter(json, { isJSON: true });
};

exports.fromBase64 = function (base64) {
  return new Converter(base64, { isEncoded: true });
};

exports.fromComment = function (comment) {
  return new Converter(comment, { isEncoded: true, hasComment: true });
};

exports.fromMapFileComment = function (comment, dir) {
  return new Converter(comment, { commentFileDir: dir, isFileComment: true, isJSON: true });
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromSource = function (content) {
  var m = content.match(commentRx);
  commentRx.lastIndex = 0;
  return m ? exports.fromComment(m.pop()) : null;
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromMapFileSource = function (content, dir) {
  var m = content.match(mapFileCommentRx);
  mapFileCommentRx.lastIndex = 0;
  return m ? exports.fromMapFileComment(m.pop(), dir) : null;
};

exports.removeComments = function (src) {
  commentRx.lastIndex = 0;
  return src.replace(commentRx, '');
};

exports.removeMapFileComments = function (src) {
  mapFileCommentRx.lastIndex = 0;
  return src.replace(mapFileCommentRx, '');
};

exports.__defineGetter__('commentRegex', function () {
  commentRx.lastIndex = 0;
  return commentRx; 
});

exports.__defineGetter__('mapFileCommentRegex', function () {
  mapFileCommentRx.lastIndex = 0;
  return mapFileCommentRx; 
});

}).call(this,require("buffer").Buffer)
},{"buffer":111,"fs":110,"path":115}],88:[function(require,module,exports){

exports.parse = require('css-parse');
exports.stringify = require('css-stringify');

},{"css-parse":89,"css-stringify":90}],89:[function(require,module,exports){

module.exports = function(css, options){
  options = options || {};

  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;

  /**
   * Update lineno and column based on `str`.
   */

  function updatePosition(str) {
    var lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf('\n');
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   */

  function position() {
    var start = { line: lineno, column: column };
    if (!options.position) return positionNoop;

    return function(node){
      node.position = {
        start: start,
        end: { line: lineno, column: column },
        source: options.source
      };

      whitespace();
      return node;
    }
  }

  /**
   * Return `node`.
   */

  function positionNoop(node) {
    whitespace();
    return node;
  }

  /**
   * Error `msg`.
   */

  function error(msg) {
    var err = new Error(msg + ' near line ' + lineno + ':' + column);
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;
    throw err;
  }

  /**
   * Parse stylesheet.
   */

  function stylesheet() {
    return {
      type: 'stylesheet',
      stylesheet: {
        rules: rules()
      }
    };
  }

  /**
   * Opening brace.
   */

  function open() {
    return match(/^{\s*/);
  }

  /**
   * Closing brace.
   */

  function close() {
    return match(/^}/);
  }

  /**
   * Parse ruleset.
   */

  function rules() {
    var node;
    var rules = [];
    whitespace();
    comments(rules);
    while (css.charAt(0) != '}' && (node = atrule() || rule())) {
      rules.push(node);
      comments(rules);
    }
    return rules;
  }

  /**
   * Match `re` and return captures.
   */

  function match(re) {
    var m = re.exec(css);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */

  function whitespace() {
    match(/^\s*/);
  }

  /**
   * Parse comments;
   */

  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) rules.push(c);
    return rules;
  }

  /**
   * Parse comment.
   */

  function comment() {
    var pos = position();
    if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;

    var i = 2;
    while (null != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) ++i;
    i += 2;

    var str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;

    return pos({
      type: 'comment',
      comment: str
    });
  }

  /**
   * Parse selector.
   */

  function selector() {
    var m = match(/^([^{]+)/);
    if (!m) return;
    return trim(m[0]).split(/\s*,\s*/);
  }

  /**
   * Parse declaration.
   */

  function declaration() {
    var pos = position();

    // prop
    var prop = match(/^(\*?[-#\/\*\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]);

    // :
    if (!match(/^:\s*/)) return error("property missing ':'");

    // val
    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
    if (!val) return error('property missing value');

    var ret = pos({
      type: 'declaration',
      property: prop,
      value: trim(val[0])
    });

    // ;
    match(/^[;\s]*/);

    return ret;
  }

  /**
   * Parse declarations.
   */

  function declarations() {
    var decls = [];

    if (!open()) return error("missing '{'");
    comments(decls);

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      comments(decls);
    }

    if (!close()) return error("missing '}'");
    return decls;
  }

  /**
   * Parse keyframe.
   */

  function keyframe() {
    var m;
    var vals = [];
    var pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;

    return pos({
      type: 'keyframe',
      values: vals,
      declarations: declarations()
    });
  }

  /**
   * Parse keyframes.
   */

  function atkeyframes() {
    var pos = position();
    var m = match(/^@([-\w]+)?keyframes */);

    if (!m) return;
    var vendor = m[1];

    // identifier
    var m = match(/^([-\w]+)\s*/);
    if (!m) return error("@keyframes missing name");
    var name = m[1];

    if (!open()) return error("@keyframes missing '{'");

    var frame;
    var frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");

    return pos({
      type: 'keyframes',
      name: name,
      vendor: vendor,
      keyframes: frames
    });
  }

  /**
   * Parse supports.
   */

  function atsupports() {
    var pos = position();
    var m = match(/^@supports *([^{]+)/);

    if (!m) return;
    var supports = trim(m[1]);

    if (!open()) return error("@supports missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@supports missing '}'");

    return pos({
      type: 'supports',
      supports: supports,
      rules: style
    });
  }

  /**
   * Parse host.
   */

  function athost() {
    var pos = position();
    var m = match(/^@host */);

    if (!m) return;

    if (!open()) return error("@host missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@host missing '}'");

    return pos({
      type: 'host',
      rules: style
    });
  }

  /**
   * Parse media.
   */

  function atmedia() {
    var pos = position();
    var m = match(/^@media *([^{]+)/);

    if (!m) return;
    var media = trim(m[1]);

    if (!open()) return error("@media missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@media missing '}'");

    return pos({
      type: 'media',
      media: media,
      rules: style
    });
  }

  /**
   * Parse paged media.
   */

  function atpage() {
    var pos = position();
    var m = match(/^@page */);
    if (!m) return;

    var sel = selector() || [];

    if (!open()) return error("@page missing '{'");
    var decls = comments();

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");

    return pos({
      type: 'page',
      selectors: sel,
      declarations: decls
    });
  }

  /**
   * Parse document.
   */

  function atdocument() {
    var pos = position();
    var m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;

    var vendor = trim(m[1]);
    var doc = trim(m[2]);

    if (!open()) return error("@document missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@document missing '}'");

    return pos({
      type: 'document',
      document: doc,
      vendor: vendor,
      rules: style
    });
  }

  /**
   * Parse import
   */

  function atimport() {
    return _atrule('import');
  }

  /**
   * Parse charset
   */

  function atcharset() {
    return _atrule('charset');
  }

  /**
   * Parse namespace
   */

  function atnamespace() {
    return _atrule('namespace')
  }

  /**
   * Parse non-block at-rules
   */

  function _atrule(name) {
    var pos = position();
    var m = match(new RegExp('^@' + name + ' *([^;\\n]+);'));
    if (!m) return;
    var ret = { type: name };
    ret[name] = trim(m[1]);
    return pos(ret);
  }

  /**
   * Parse at rule.
   */

  function atrule() {
    if (css[0] != '@') return;

    return atkeyframes()
      || atmedia()
      || atsupports()
      || atimport()
      || atcharset()
      || atnamespace()
      || atdocument()
      || atpage()
      || athost();
  }

  /**
   * Parse rule.
   */

  function rule() {
    var pos = position();
    var sel = selector();

    if (!sel) return;
    comments();

    return pos({
      type: 'rule',
      selectors: sel,
      declarations: declarations()
    });
  }

  return stylesheet();
};

/**
 * Trim `str`.
 */

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, '') : '';
}

},{}],90:[function(require,module,exports){

/**
 * Module dependencies.
 */

var Compressed = require('./lib/compress');
var Identity = require('./lib/identity');

/**
 * Stringfy the given AST `node`.
 *
 * Options:
 *
 *  - `compress` space-optimized output
 *  - `sourcemap` return an object with `.code` and `.map`
 *
 * @param {Object} node
 * @param {Object} [options]
 * @return {String}
 * @api public
 */

module.exports = function(node, options){
  options = options || {};

  var compiler = options.compress
    ? new Compressed(options)
    : new Identity(options);

  // source maps
  if (options.sourcemap) {
    var sourcemaps = require('./lib/source-map-support');
    sourcemaps(compiler);

    var code = compiler.compile(node);
    return { code: code, map: compiler.map.toJSON() };
  }

  var code = compiler.compile(node);
  return code;
};


},{"./lib/compress":92,"./lib/identity":93,"./lib/source-map-support":94}],91:[function(require,module,exports){

/**
 * Expose `Compiler`.
 */

module.exports = Compiler;

/**
 * Initialize a compiler.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

function Compiler(opts) {
  this.options = opts || {};
}

/**
 * Emit `str`
 */

Compiler.prototype.emit = function(str) {
  return str;
};

/**
 * Visit `node`.
 */

Compiler.prototype.visit = function(node){
  return this[node.type](node);
};

/**
 * Map visit over array of `nodes`, optionally using a `delim`
 */

Compiler.prototype.mapVisit = function(nodes, delim){
  var buf = '';
  delim = delim || '';

  for (var i = 0, length = nodes.length; i < length; i++) {
    buf += this.visit(nodes[i]);
    if (delim && i < length - 1) buf += this.emit(delim);
  }

  return buf;
};

},{}],92:[function(require,module,exports){

/**
 * Module dependencies.
 */

var Base = require('./compiler');

/**
 * Expose compiler.
 */

module.exports = Compiler;

/**
 * Initialize a new `Compiler`.
 */

function Compiler(options) {
  Base.call(this, options);
}

/**
 * Inherit from `Base.prototype`.
 */

Compiler.prototype.__proto__ = Base.prototype;

/**
 * Compile `node`.
 */

Compiler.prototype.compile = function(node){
  return node.stylesheet
    .rules.map(this.visit, this)
    .join('');
};

/**
 * Visit comment node.
 */

Compiler.prototype.comment = function(node){
  return this.emit('', node.position);
};

/**
 * Visit import node.
 */

Compiler.prototype.import = function(node){
  return this.emit('@import ' + node.import + ';', node.position);
};

/**
 * Visit media node.
 */

Compiler.prototype.media = function(node){
  return this.emit('@media ' + node.media, node.position, true)
    + this.emit('{')
    + this.mapVisit(node.rules)
    + this.emit('}');
};

/**
 * Visit document node.
 */

Compiler.prototype.document = function(node){
  var doc = '@' + (node.vendor || '') + 'document ' + node.document;

  return this.emit(doc, node.position, true)
    + this.emit('{')
    + this.mapVisit(node.rules)
    + this.emit('}');
};

/**
 * Visit charset node.
 */

Compiler.prototype.charset = function(node){
  return this.emit('@charset ' + node.charset + ';', node.position);
};

/**
 * Visit namespace node.
 */

Compiler.prototype.namespace = function(node){
  return this.emit('@namespace ' + node.namespace + ';', node.position);
};

/**
 * Visit supports node.
 */

Compiler.prototype.supports = function(node){
  return this.emit('@supports ' + node.supports, node.position, true)
    + this.emit('{')
    + this.mapVisit(node.rules)
    + this.emit('}');
};

/**
 * Visit keyframes node.
 */

Compiler.prototype.keyframes = function(node){
  return this.emit('@'
    + (node.vendor || '')
    + 'keyframes '
    + node.name, node.position, true)
    + this.emit('{')
    + this.mapVisit(node.keyframes)
    + this.emit('}');
};

/**
 * Visit keyframe node.
 */

Compiler.prototype.keyframe = function(node){
  var decls = node.declarations;

  return this.emit(node.values.join(','), node.position, true)
    + this.emit('{')
    + this.mapVisit(decls)
    + this.emit('}');
};

/**
 * Visit page node.
 */

Compiler.prototype.page = function(node){
  var sel = node.selectors.length
    ? node.selectors.join(', ')
    : '';

  return this.emit('@page ' + sel, node.position, true)
    + this.emit('{')
    + this.mapVisit(node.declarations)
    + this.emit('}');
};

/**
 * Visit rule node.
 */

Compiler.prototype.rule = function(node){
  var decls = node.declarations;
  if (!decls.length) return '';

  return this.emit(node.selectors.join(','), node.position, true)
    + this.emit('{')
    + this.mapVisit(decls)
    + this.emit('}');
};

/**
 * Visit declaration node.
 */

Compiler.prototype.declaration = function(node){
  return this.emit(node.property + ':' + node.value, node.position) + this.emit(';');
};


},{"./compiler":91}],93:[function(require,module,exports){

/**
 * Module dependencies.
 */

var Base = require('./compiler');

/**
 * Expose compiler.
 */

module.exports = Compiler;

/**
 * Initialize a new `Compiler`.
 */

function Compiler(options) {
  options = options || {};
  Base.call(this, options);
  this.indentation = options.indent;
}

/**
 * Inherit from `Base.prototype`.
 */

Compiler.prototype.__proto__ = Base.prototype;

/**
 * Compile `node`.
 */

Compiler.prototype.compile = function(node){
  return this.stylesheet(node);
};

/**
 * Visit stylesheet node.
 */

Compiler.prototype.stylesheet = function(node){
  return this.mapVisit(node.stylesheet.rules, '\n\n');
};

/**
 * Visit comment node.
 */

Compiler.prototype.comment = function(node){
  return this.emit(this.indent() + '/*' + node.comment + '*/', node.position);
};

/**
 * Visit import node.
 */

Compiler.prototype.import = function(node){
  return this.emit('@import ' + node.import + ';', node.position);
};

/**
 * Visit media node.
 */

Compiler.prototype.media = function(node){
  return this.emit('@media ' + node.media, node.position, true)
    + this.emit(
        ' {\n'
        + this.indent(1))
    + this.mapVisit(node.rules, '\n\n')
    + this.emit(
        this.indent(-1)
        + '\n}');
};

/**
 * Visit document node.
 */

Compiler.prototype.document = function(node){
  var doc = '@' + (node.vendor || '') + 'document ' + node.document;

  return this.emit(doc, node.position, true)
    + this.emit(
        ' '
      + ' {\n'
      + this.indent(1))
    + this.mapVisit(node.rules, '\n\n')
    + this.emit(
        this.indent(-1)
        + '\n}');
};

/**
 * Visit charset node.
 */

Compiler.prototype.charset = function(node){
  return this.emit('@charset ' + node.charset + ';', node.position);
};

/**
 * Visit namespace node.
 */

Compiler.prototype.namespace = function(node){
  return this.emit('@namespace ' + node.namespace + ';', node.position);
};

/**
 * Visit supports node.
 */

Compiler.prototype.supports = function(node){
  return this.emit('@supports ' + node.supports, node.position, true)
    + this.emit(
      ' {\n'
      + this.indent(1))
    + this.mapVisit(node.rules, '\n\n')
    + this.emit(
        this.indent(-1)
        + '\n}');
};

/**
 * Visit keyframes node.
 */

Compiler.prototype.keyframes = function(node){
  return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position, true)
    + this.emit(
      ' {\n'
      + this.indent(1))
    + this.mapVisit(node.keyframes, '\n')
    + this.emit(
        this.indent(-1)
        + '}');
};

/**
 * Visit keyframe node.
 */

Compiler.prototype.keyframe = function(node){
  var decls = node.declarations;

  return this.emit(this.indent())
    + this.emit(node.values.join(', '), node.position, true)
    + this.emit(
      ' {\n'
      + this.indent(1))
    + this.mapVisit(decls, '\n')
    + this.emit(
      this.indent(-1)
      + '\n'
      + this.indent() + '}\n');
};

/**
 * Visit page node.
 */

Compiler.prototype.page = function(node){
  var sel = node.selectors.length
    ? node.selectors.join(', ') + ' '
    : '';

  return this.emit('@page ' + sel, node.position, true)
    + this.emit('{\n')
    + this.emit(this.indent(1))
    + this.mapVisit(node.declarations, '\n')
    + this.emit(this.indent(-1))
    + this.emit('\n}');
};

/**
 * Visit rule node.
 */

Compiler.prototype.rule = function(node){
  var indent = this.indent();
  var decls = node.declarations;
  if (!decls.length) return '';

  return this.emit(node.selectors.map(function(s){ return indent + s }).join(',\n'), node.position, true)
    + this.emit(' {\n')
    + this.emit(this.indent(1))
    + this.mapVisit(decls, '\n')
    + this.emit(this.indent(-1))
    + this.emit('\n' + this.indent() + '}');
};

/**
 * Visit declaration node.
 */

Compiler.prototype.declaration = function(node){
  return this.emit(this.indent())
    + this.emit(node.property + ': ' + node.value, node.position)
    + this.emit(';');
};

/**
 * Increase, decrease or return current indentation.
 */

Compiler.prototype.indent = function(level) {
  this.level = this.level || 1;

  if (null != level) {
    this.level += level;
    return '';
  }

  return Array(this.level).join(this.indentation || '  ');
};

},{"./compiler":91}],94:[function(require,module,exports){

/**
 * Module dependencies.
 */

var SourceMap = require('source-map').SourceMapGenerator;

/**
 * Expose `mixin()`.
 */

module.exports = mixin;

/**
 * Mixin source map support into `compiler`.
 *
 * @param {Compiler} compiler
 * @api public
 */

function mixin(compiler) {
  var file = compiler.options.filename || 'generated.css';
  compiler.map = new SourceMap({ file: file });
  compiler.position = { line: 1, column: 1 };
  for (var k in exports) compiler[k] = exports[k];
}

/**
 * Update position.
 *
 * @param {String} str
 * @api private
 */

exports.updatePosition = function(str) {
  var lines = str.match(/\n/g);
  if (lines) this.position.line += lines.length;
  var i = str.lastIndexOf('\n');
  this.position.column = ~i ? str.length - i : this.position.column + str.length;
};

/**
 * Emit `str`.
 *
 * @param {String} str
 * @param {Number} [pos]
 * @param {Boolean} [startOnly]
 * @return {String}
 * @api private
 */

exports.emit = function(str, pos, startOnly) {
  if (pos && pos.start) {
    this.map.addMapping({
      source: pos.source || 'source.css',
      generated: {
        line: this.position.line,
        column: Math.max(this.position.column - 1, 0)
      },
      original: {
        line: pos.start.line,
        column: pos.start.column - 1
      }
    });
  }

  this.updatePosition(str);

  if (!startOnly && pos && pos.end) {
    this.map.addMapping({
      source: pos.source || 'source.css',
      generated: {
        line: this.position.line,
        column: Math.max(this.position.column - 1, 0)
      },
      original: {
        line: pos.end.line,
        column: pos.end.column - 1
      }
    });
  }

  return str;
};

},{"source-map":95}],95:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"./source-map/source-map-consumer":100,"./source-map/source-map-generator":101,"./source-map/source-node":102}],96:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"./util":103,"amdefine":104}],97:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"./base64":98,"amdefine":104}],98:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"amdefine":104}],99:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"amdefine":104}],100:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"./array-set":96,"./base64-vlq":97,"./binary-search":99,"./util":103,"amdefine":104}],101:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"./array-set":96,"./base64-vlq":97,"./util":103,"amdefine":104}],102:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"./source-map-generator":101,"./util":103,"amdefine":104}],103:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"amdefine":104}],104:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                process.nextTick(function () {
                    callback.apply(null, deps);
                });
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require("/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/../node_modules/rework/node_modules/css/node_modules/css-stringify/node_modules/source-map/node_modules/amdefine/amdefine.js")
},{"/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":114,"path":115}],105:[function(require,module,exports){

/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}

},{}],106:[function(require,module,exports){

function hsb2rgb(hue, saturation, value) {
  hue = (parseInt(hue, 10) || 0) % 360;

  saturation = /%/.test(saturation)
    ? parseInt(saturation, 10) / 100
    : parseFloat(saturation, 10);

  value = /%/.test(value)
    ? parseInt(value, 10) / 100
    : parseFloat(value, 10);

  saturation = Math.max(0, Math.min(saturation, 1));
  value = Math.max(0, Math.min(value, 1));

  var rgb;
  if (saturation === 0) {
    return [
      Math.round(255 * value),
      Math.round(255 * value),
      Math.round(255 * value)
    ];
  }

  var side = hue / 60;
  var chroma = value * saturation;
  var x = chroma * (1 - Math.abs(side % 2 - 1));
  var match = value - chroma;

  switch (Math.floor(side)) {
  case 0: rgb = [ chroma, x, 0 ]; break;
  case 1: rgb = [ x, chroma, 0 ]; break;
  case 2: rgb = [ 0, chroma, x ]; break;
  case 3: rgb = [ 0, x, chroma ]; break;
  case 4: rgb = [ x, 0, chroma ]; break;
  case 5: rgb = [ chroma, 0, x ]; break;
  default: rgb = [ 0, 0, 0 ];
  }

  rgb[0] = Math.round(255 * (rgb[0] + match));
  rgb[1] = Math.round(255 * (rgb[1] + match));
  rgb[2] = Math.round(255 * (rgb[2] + match));

  return rgb;
}


module.exports = hsb2rgb;

},{}],107:[function(require,module,exports){
(function (process,__dirname){
var path = require('path');
var fs = require('fs');

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];

    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts]) {
        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {

  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[type];
};

// Default instance
var mime = new Mime();

// Load local copy of
// http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
mime.load(path.join(__dirname, 'types/mime.types'));

// Load additional types from node.js community
mime.load(path.join(__dirname, 'types/node.types'));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;

}).call(this,require("/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/../node_modules/rework/node_modules/mime")
},{"/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":114,"fs":110,"path":115}],108:[function(require,module,exports){
var debug = require('debug')('rework-inherit')

exports = module.exports = function (options) {
  return function inherit(style) {
    return new Inherit(style, options || {})
  }
}

exports.Inherit = Inherit

function Inherit(style, options) {
  if (!(this instanceof Inherit))
    return new Inherit(style, options);

  options = options || {}

  this.propertyRegExp = options.propertyRegExp
    || /^(inherit|extend)s?$/i

  var rules = this.rules = style.rules
  this.matches = {}

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i]
    if (rule.rules) {
      // Media queries
      this.inheritMedia(rule)
      if (!rule.rules.length) rules.splice(i--, 1);
    } else if (rule.selectors) {
      // Regular rules
      this.inheritRules(rule)
      if (!rule.declarations.length) rules.splice(i--, 1);
    }
  }

  this.removePlaceholders()
}

Inherit.prototype.inheritMedia = function (mediaRule) {
  var rules = mediaRule.rules
  var query = mediaRule.media

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i]
    if (!rule.selectors) continue;

    var additionalRules = this.inheritMediaRules(rule, query)

    if (!rule.declarations.length) rules.splice(i--, 1);

    // I don't remember why I'm using apply here.
    ;[].splice.apply(rules, [i, 0].concat(additionalRules))
    i += additionalRules.length
  }
}

Inherit.prototype.inheritMediaRules = function (rule, query) {
  var declarations = rule.declarations
  var selectors = rule.selectors
  var appendRules = []

  for (var i = 0; i < declarations.length; i++) {
    var decl = declarations[i]
    // Could be comments
    if (decl.type !== 'declaration') continue;
    if (!this.propertyRegExp.test(decl.property)) continue;

    decl.value.split(',').map(trim).forEach(function (val) {
      // Should probably just use concat here
      ;[].push.apply(appendRules, this.inheritMediaRule(val, selectors, query));
    }, this)

    declarations.splice(i--, 1)
  }

  return appendRules
}

Inherit.prototype.inheritMediaRule = function (val, selectors, query) {
  var matchedRules = this.matches[val] || this.matchRules(val)
  var alreadyMatched = matchedRules.media[query]
  var matchedQueryRules = alreadyMatched || this.matchQueryRule(val, query)

  if (!matchedQueryRules.rules.length)
    throw new Error('Failed to extend as media query from ' + val + '.');

  debug('extend %j in @media %j with %j', selectors, query, val);

  this.appendSelectors(matchedQueryRules, val, selectors)

  return alreadyMatched
    ? []
    : matchedQueryRules.rules.map(getRule)
}

Inherit.prototype.inheritRules = function (rule) {
  var declarations = rule.declarations
  var selectors = rule.selectors

  for (var i = 0; i < declarations.length; i++) {
    var decl = declarations[i]
    // Could be comments
    if (decl.type !== 'declaration') continue;
    if (!this.propertyRegExp.test(decl.property)) continue;

    decl.value.split(',').map(trim).forEach(function (val) {
      this.inheritRule(val, selectors)
    }, this)

    declarations.splice(i--, 1)
  }
}

Inherit.prototype.inheritRule = function (val, selectors) {
  var matchedRules = this.matches[val] || this.matchRules(val)

  if (!matchedRules.rules.length)
    throw new Error('Failed to extend from ' + val + '.');

  debug('extend %j with %j', selectors, val);

  this.appendSelectors(matchedRules, val, selectors)
}

Inherit.prototype.matchQueryRule = function (val, query) {
  var matchedRules = this.matches[val] || this.matchRules(val)

  return matchedRules.media[query] = {
    media: query,
    rules: matchedRules.rules.map(function (rule) {
      return {
        selectors: rule.selectors,
        declarations: rule.declarations,
        rule: {
          type: 'rule',
          selectors: [],
          declarations: rule.declarations
        }
      }
    })
  }
}

Inherit.prototype.matchRules = function (val) {
  var matchedRules = this.matches[val] = {
    rules: [],
    media: {}
  }

  this.rules.forEach(function (rule) {
    if (!rule.selectors) return;

    var matchedSelectors = rule.selectors.filter(function (selector) {
      return selector.match(replaceRegExp(val))
    })

    if (!matchedSelectors.length) return;

    matchedRules.rules.push({
      selectors: matchedSelectors,
      declarations: rule.declarations,
      rule: rule
    })
  })

  return matchedRules
}

Inherit.prototype.appendSelectors = function (matchedRules, val, selectors) {
  matchedRules.rules.forEach(function (matchedRule) {
    // Selector to actually inherit
    var selectorReference = matchedRule.rule.selectors

    matchedRule.selectors.forEach(function (matchedSelector) {
      ;[].push.apply(selectorReference, selectors.map(function (selector) {
        return replaceSelector(matchedSelector, val, selector)
      }))
    })
  })
}

// Placeholders are not allowed in media queries
Inherit.prototype.removePlaceholders = function () {
  var rules = this.rules

  for (var i = 0; i < rules.length; i++) {
    var selectors = rules[i].selectors
    if (!selectors) continue;

    for (var j = 0; j < selectors.length; j++) {
      var selector = selectors[j]
      if (~selector.indexOf('%')) selectors.splice(j--, 1);
    }

    if (!selectors.length) rules.splice(i--, 1);
  }
}

function replaceSelector(matchedSelector, val, selector) {
  return matchedSelector.replace(replaceRegExp(val), function (_, first, last) {
    return first + selector + last
  })
}

function replaceRegExp(val) {
  return new RegExp(
    '(^|\\s|\\>|\\+|~)' +
    escapeRegExp(val) +
    '($|\\s|\\>|\\+|~|\\:)'
    , 'g'
  )
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}

function trim(x) {
  return x.trim()
}

function getRule(x) {
  return x.rule
}

},{"debug":105}],109:[function(require,module,exports){
module.exports=require(71)
},{}],110:[function(require,module,exports){

},{}],111:[function(require,module,exports){
/**
 * The buffer module from node.js, for the browser.
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install buffer`
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
   // Detect if browser supports Typed Arrays. Supported browsers are IE 10+,
   // Firefox 4+, Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+.
  if (typeof Uint8Array !== 'function' || typeof ArrayBuffer !== 'function')
    return false

  // Does the browser support adding properties to `Uint8Array` instances? If
  // not, then that's the same as no `Uint8Array` support. We need to be able to
  // add all the node Buffer API methods.
  // Bug in Firefox 4-29, now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var arr = new Uint8Array(0)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array === 'function') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":112,"ieee754":113}],112:[function(require,module,exports){
module.exports=require(58)
},{}],113:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],114:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],115:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/usr/local/lib/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":114}]},{},[1])