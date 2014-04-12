
var Yacp = require('../lib/yacp.js');
var fs = require('fs');
var rework = require('rework');
var extend = require('rework').extend();
var expect = require('chai').expect;

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim();
}

function compareFixtures(name) {
  var yacp = new Yacp(fixture(name));
  return expect(
    yacp.toString().css
  ).to.equal(fixture(name + '.out'));
}


describe('YACP', function() {
  it('automatic vendor-prefixed property', function() {
    compareFixtures('auto-vendor-prefix');
  });

  it('W3C-style CSS variable syntax', function() {
    compareFixtures('variables');
  });

  it('extend', function() {
    compareFixtures('extend');
  });

  it('throw error when extend non-placeholder-selector', function() {
    var yacp = new Yacp(fixture('extend-non-placeholder'));
    var output = function() {
      return yacp.toString();
    };
    expect(output).to.Throw(Error, 'YACP: only placeholder selectors can inherit.')
  });
});
