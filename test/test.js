var should = require('should');
var constants = require('./lib/constants');

describe('Outliner', function() {
	var dommanager;
	var testhelper;

	before(function(done) {
		// TODO Put all these constants in external module
		dommanager = require('./lib/dom_manager');
		testhelper = require('./lib/test_helper');
		dommanager.loadFile('../example/index.html', function(window) { 
			$ = window.$
			Outliner = window.Outliner;
			testhelper.init(window);
			done();		
		});
	});
	
    after(function() {
		dommanager.close();
    });

	describe('selectNext', function() {
		it('should should select the first tag when nothing is selected', function() {
			Outliner.selectNext();
			var testHelperText = testhelper.textOf('a', 0);
			var outlinerText = $(Outliner.selectedID).first().text(); // TODO After tests are working, refactor to use public `selected` method
			outlinerText.should.equal(testHelperText);
		});
	});
});
