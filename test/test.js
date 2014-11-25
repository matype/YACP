var Yacp = require('../lib/yacp.js');
var fs = require('fs');
var expect = require('chai').expect;


function fixture(name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim();
}


function compareFixtures(name) {
    var yacp = new Yacp(fixture(name));
    return expect(
        yacp.stringify().css
    ).to.equal(fixture(name + '.out'));
}

function compareFixturesForStrict(name) {
    var options = {
        "strict": true
    };
    var yacp = new Yacp(fixture(name), options);
    return expect(
        yacp.stringify().css
    ).to.equal(fixture(name + '.out'));
}

function compareFixturesForWhitespace(name) {
    var options = {
        "whitespace": true
    };
    var yacp = new Yacp(fixture(name), options);
    return expect(
        yacp.stringify().css
    ).to.equal(fixture(name + '.out'));
}


describe('YACP', function() {
    it('automatic vendor-prefixed property', function() {
        compareFixtures('auto-vendor-prefix');
    });

    it('rework-vars new syntax', function() {
        compareFixtures('variable-new-syntax');
    });

    it('extend', function() {
        compareFixtures('extend');
    });

    it('multi-extends', function() {
        compareFixtures('multi-extends');
    });

    it('import', function() {
        compareFixtures('import');
    });

    it('calc', function() {
        compareFixtures('calc');
    });

    it('extend-with-import', function() {
        compareFixtures('extend-with-import');
    });

    it('multiple-extend', function() {
        compareFixtures('multiple-extend');
    });

    it('whitespace', function() {
        compareFixturesForStrict('strict');
    });

    it('whitespace', function() {
        compareFixturesForWhitespace('whitespace');
    });

    it('throw error when extend non-placeholder-selector', function() {
        var yacp = new Yacp(fixture('extend-non-placeholder'));
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'YACP: only placeholder selectors can inherit.');
    });

    it('throw error when cascade binding-selector', function() {
        var yacp = new Yacp(fixture('binding-selector'));
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'rework-rule-binding: binding-selector must not cascade');
    });

    it('throw error when cascade placeholder selector', function() {
        var yacp = new Yacp(fixture('placeholder'));
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'rework-rule-binding: placeholder selector must not cascade');
    });

    it('throw error if extended rule-sets have same properties', function() {
        var yacp = new Yacp(fixture('validator'));
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'rework-extend-validator: extended rules have same properties');
    });

    it('strict mode: error using not only class selector', function() {
        var options = {
            "strict": true
        };
        var yacp = new Yacp(fixture('strict-only-class'), options);
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'YACP strict mode: using not only class selector');
    });

    it('strict mode: error using !important', function() {
        var options = {
            "strict": true
        };
        var yacp = new Yacp(fixture('strict-important'), options);
        var output = function() {
            return yacp.stringify();
        };

        expect(output).to.Throw(Error, 'YACP strict mode: using !important');
    });
});
