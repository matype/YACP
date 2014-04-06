#!/usr/bin/env node

var rework = require('rework');
var vars = require('rework-vars')();
var extend = require('rework').extend();
var ruleBinding = require('rework-rule-binding');
var autoprefixer = require('autoprefixer');
var program = require('commander');
var pkg = require('./package.json');
var stdin = require('stdin');

program.version(pkg.version).parse(process.argv);

stdin(function(str) {
  var options = {};
  var pre = rework(str).use(ruleBinding);
  var check = 0;

  pre.obj.stylesheet.rules.forEach(function(rule) {
    rule.declarations.forEach(function(declaration) {
      if (declaration.property.match(/^(inherit|extend)s?$/i)) {
        if (!declaration.value.match(/^\%.+?/)) {
          check = 1;
        }
      } else {
        return;
      }
      if (check) {
        var err =  new Error('YACP: only placeholder selectors inherit.');
        err.position = declaration.position;
        throw err;
      }
    });
  });
  var res = rework(str)
  .use(extend)
  .use(ruleBinding)
  .use(vars)
  .toString();

  res = autoprefixer().process(res);
  process.stdout.write(res);
});
