var should = require('should');
var constants = require('./lib/constants');

// TODO Outliner to Bullets
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
	describe('deselect', function() {
		it('should deselect the selection when it is passed in', function () {
			Outliner.selectNext();
			Outliner.selection.length.should.equal(1);
			Outliner.deselect(Outliner.selection);
			Outliner.selection.length.should.equal(0);
		});
		it('should deselect the selection when nothing is passed in', function () {
			Outliner.selectNext();
			Outliner.selection.length.should.equal(1);
			Outliner.deselect();
			Outliner.selection.length.should.equal(0);
		});
	});

	describe('selectNext', function() {
	    afterEach(function() {
			Outliner.deselect();
	    });
		it('should select the first tag when nothing is selected', function() {
			Outliner.selectNext();
			var testHelperText = testhelper.textOf('a', 0);
			var outlinerText = Outliner.selection.text();
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
		it('should select the next tag after the selection', function() {
			Outliner.selectNext();
			Outliner.selectNext();
			var outlinerText = Outliner.selection.text();
			var testHelperText = testhelper.textOf('a', 1);
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
		it('should keep the same selected tag when the last tag is selected', function() {
			Outliner.selectNext();
			Outliner.selectNext();
			Outliner.selectNext();
			var outlinerText = Outliner.selection.text();
			var testHelperText = testhelper.textOf('a', 1);
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
	});

	describe('selectPrevious', function() {
	    afterEach(function() {
			Outliner.deselect();
	    });
		it('should select the last tag when nothing is selected', function() {
			Outliner.selectPrevious();
			var testHelperText = testhelper.textOf('a', 1);
			var outlinerText = Outliner.selection.text();
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
		it('should select the previous tag before the selection', function() {
			Outliner.selectPrevious();
			Outliner.selectPrevious();
			var outlinerText = Outliner.selection.text();
			var testHelperText = testhelper.textOf('a', 0);
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
		it('should keep the same selected tag when the first tag is selected', function() {
			Outliner.selectPrevious();
			Outliner.selectPrevious();
			Outliner.selectPrevious();
			var outlinerText = Outliner.selection.text();
			var testHelperText = testhelper.textOf('a', 0);
			Outliner.selection.length.should.equal(1);
			outlinerText.should.equal(testHelperText);
		});
	});

});
