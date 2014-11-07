
/**
 * Module dependencies.
 */

var rework = require('rework');
var vars = require('rework-vars')();
var extend = require('rework-inherit')();
var ruleBinding = require('rework-rule-binding');
var validator = require('rework-extend-validator');
var imprt = require('rework-import')();
var autoprefixer = require('autoprefixer');
var whitespace = require('css-whitespace');


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
    if (options.whitespace) {
        this.str = whitespace(str);
    }

    this.parse();

    this.compress = options.compress;
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
 * Return the AST
 *
 * @return {Object}
 */


Yacp.prototype.parse = function() {
    var ast = this.rework = rework(this.str);

    return ast;
}


/**
 * Return the compiled CSS.
 *
 * @return {String}
 */

Yacp.prototype.stringify = function() {
    var self = this;

    if (checkDeclarations(self.rework)) {
        this.use(imprt);
        this.use(vars);
        this.use(validator);
        this.use(ruleBinding);
        this.use(extend);

        var res = self.rework.toString({
            compress: this.compress,
            sourcemapAsObject: true
        });

        return autoprefixer().process(res);
    }
}


function checkDeclarations(reworkObj) {
    var check = 1;
    var rules = reworkObj.obj.stylesheet.rules;

    rules.forEach(function visit (rule) {
        if (rule.type === 'rule') {
            rule.declarations.forEach(function(declaration) {
                if (declaration.property.match(/^(inherit|extend)s?$/i)) {
                    if (!declaration.value.match(/^\%.+?/)) {
                        check = 0;
                    }
                } else {
                    return;
                }
            });
        }
    });

    if (check) {
        return true;
    } else {
        var err =  new Error('YACP: only placeholder selectors can inherit.');
        throw err;
    }
}
