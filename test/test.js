var fs = require('fs'),
    rework = require('rework'),
    extend = require('rework').extend(),
    bind = require('rework-rule-binding'),
    expect = require('chai').expect;

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

function compareFixtures(name) {
  return expect(
    rework(fixture(name))
    .use(extend)
    .use(bind)
    .toString().trim()
    ).to.equal(fixture(name + '.out'));
}

describe('Yet Another CSS Preprocessor', function() {

  it('variable', function() {
    compareFixtures('variables');
  });

  it('extend', function() {
    compareFixtures('extends');
  });

  it('prohibit cascading placeholder selector', function() {
    var output = function() {
      return rework(fixture('bind-placeholder')).use(bind).toString();
    };
    expect(output).to.Throw(Error, 'rework-rule-binding: binding-selector must not cascade');
  })
});
