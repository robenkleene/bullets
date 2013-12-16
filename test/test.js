var should = require('should');
var constants = require('./lib/constants');

describe('Outliner', function() {
	var dommanager;
	var testhelper;

	before(function(done) {
		dommanager = require(constants.dommanagerFile);
		testhelper = require(constants.testhelperFile);
		dommanager.loadFile(constants.HTMLFile, function(window) { 
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
			var outlinerText = Outliner.selection.first().text();
			outlinerText.should.equal(testHelperText);
		});
		it('should select the next tag when after the selection', function() {
			Outliner.selectNext();
			var outlinerText = Outliner.selection.first().text();
			var testHelperText = testhelper.textOf('a', 1);
			outlinerText.should.equal(testHelperText);
		});
	});
});
