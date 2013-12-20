var should = require('should');
var constants = require('./lib/constants');

describe('Bullets', function() {
	var dommanager;
	var testhelper;
	var w;

	before(function(done) {
		dommanager = require(constants.dommanagerFile);
		testhelper = require(constants.testhelperFile);
		dommanager.loadFile(constants.HTMLFile, function(window) { 
			w = window;
			$ = window.$
			Bullets = window.Bullets;
			testhelper.init(window);
			done();		
		});
	});
	
    after(function() {
		dommanager.close();
    });
	describe('deselect', function() {
		it('should deselect the selection when it is passed in', function () {
			Bullets.selectNext();
			Bullets.selection.length.should.equal(1);
			Bullets.deselect(Bullets.selection);
			Bullets.selection.length.should.equal(0);
			w.document.activeElement.should.equal(w.document.body);
		});
		it('should deselect the selection when nothing is passed in', function () {
			Bullets.selectNext();
			Bullets.selection.length.should.equal(1);
			Bullets.deselect();
			Bullets.selection.length.should.equal(0);
			w.document.activeElement.should.equal(w.document.body);
		});
	});

	describe('selectNext', function() {
	    afterEach(function() {
			Bullets.deselect();
	    });
		it('should select the first tag when nothing is selected', function() {
			Bullets.selectNext();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);

			var testHelperText = testhelper.textOf('a', 0);
			var bulletsText = Bullets.selection.text();
			bulletsText.should.equal(testHelperText);
		});
		it('should select the next tag after the selection', function() {
			Bullets.selectNext();
			Bullets.selectNext();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);
			
			var bulletsText = Bullets.selection.text();
			var testHelperText = testhelper.textOf('a', 1);
			bulletsText.should.equal(testHelperText);
		});
		it('should keep the same selected tag when the last tag is selected', function() {
			Bullets.selectPrevious();
			Bullets.selectNext();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);

			var bulletsText = Bullets.selection.text();
			var testHelperText = testhelper.textOf('a', -1);
			bulletsText.should.equal(testHelperText);
		});
	});

	describe('selectPrevious', function() {
	    afterEach(function() {
			Bullets.deselect();
	    });
		it('should select the last tag when nothing is selected', function() {
			Bullets.selectPrevious();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);

			var testHelperText = testhelper.textOf('a', -1);
			var bulletsText = Bullets.selection.text();
			bulletsText.should.equal(testHelperText);
		});
		it('should select the previous tag before the selection', function() {
			Bullets.selectPrevious();
			Bullets.selectPrevious();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);

			var bulletsText = Bullets.selection.text();
			var testHelperText = testhelper.textOf('a', -2);
			bulletsText.should.equal(testHelperText);
		});
		it('should keep the same selected tag when the first tag is selected', function() {
			Bullets.selectNext();
			Bullets.selectPrevious();

			Bullets.selection.length.should.equal(1);
			var testSelection = w.document.activeElement;
			var selection = Bullets.selection[0];
			selection.should.equal(testSelection);

			var bulletsText = Bullets.selection.text();
			var testHelperText = testhelper.textOf('a', 0);
			bulletsText.should.equal(testHelperText);
		});
	});

});
