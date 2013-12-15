var should = require('should');

// 1. Create a setup method that loads index.html into the dom
// 2. Execute "selectNext" on Outliner
// 3. Test that the selected item is

// After the above works, move the jsdom stuff into a helper file

describe('Array', function() {
	var w;

	before(function(done) {
		var jsdom = require("jsdom");
		jsdom.env("../example/index.html", function(errors, window) {
			w = window;
			done();
		});
	});

    after(function() {
		console.log("after");

		// console.log(w);
		w.close();
    });

	describe('#indexOf()', function() {
		it('should return -1 when not present', function() {
			console.log(w.document.documentElement.outerHTML);
			[1, 2, 3].indexOf(4).should.equal(-1);
		});
	});
});
