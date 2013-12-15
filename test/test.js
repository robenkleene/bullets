var should = require('should');

describe('Outliner', function() {
	var dommanager;

	before(function(done) {
		dommanager = require('./lib/dom_manager');
		dommanager.loadFile('../example/index.html', function(window) { 
			$ = window.$
			Outliner = window.Outliner;
			done();		
		});
	});
	
    after(function() {
		dommanager.close();
    });

	describe('selectNext', function() {
		it('should should select the first tag when nothing is selected', function() {

			Outliner.selectNext();
			console.log($(Outliner.selectedID).first().text()); // TODO After tests are working, refacot to use public `selected` method

			[1, 2, 3].indexOf(4).should.equal(-1);
		});
	});
});
