var rework = require('rework');
var extend = require('rework').extend();
var ruleBinding = require('rework-rule-binding');
var autoprefixer = require('autoprefixer');

function Yacp(str, options) {
  if(!(this instanceof Yacp)) {
    return new Yacp(str, options);
  }
  options = options || {};

  this.str = str;
  this.rework = rework(str);
}

Yacp.prototype.toString = function() {
  var pre = this.rework
             .use(vars)
             .use(ruleBinding);
  pre.obj.stylesheet.rules.forEach(function(rule) {
    rule.declarations.forEach(function(declaration) {
      if (declaration.property.match(/^extends$|^inherits$/)  && declaration.value.match(/^\%.+?/)) {
        console.log("found!!");
        var css = this.rework
                  .use(vars)
                  .use(extend)
                  .use(ruleBinding)
                  .toString();

        css = autoprefixer().process(css);
        return css;

      } else {
        var err =  new Error('YACP: only placeholder selectors inherit.');
        err.position = declaration.position;
        throw err;
      }
    });
  });
}



