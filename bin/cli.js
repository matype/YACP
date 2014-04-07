#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var stdin = require('stdin');
var Yacp = require('../lib/yacp.js');

program
  .version(pkg.version)
  .parse(process.argv);

stdin(function(str) {
  var options = {};

  var yacp = new Yacp(str, options);
  process.stdout.write(yacp.toString());
});

