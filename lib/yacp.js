
/**
 * Module dependencies.
 */

var rework = require('rework');
var vars = require('rework-vars')();
var extend = require('rework-inherit')();
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
  this.compress = options.compress;
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

    var res = self.rework.toString({
        compress: this.compress,
        sourcemapAsObject: true
    });
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
