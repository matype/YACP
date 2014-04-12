#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var pkg = require('../package.json');
var stdin = require('stdin');
var Yacp = require('../lib/yacp.js');

/**
 *  Options
 */

program
  .version(pkg.version)
  .option('-c, --compress', 'use output compression')
  .parse(process.argv);

/**
 * Stdin
 */

stdin(function(str) {
  var options = {};
  options.compress = program.compress;

  var yacp = new Yacp(str, options);
  process.stdout.write(yacp.toString());
});
