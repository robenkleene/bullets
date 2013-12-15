var should = require('should');

// 1. Create a setup method that loads index.html into the dom
// 2. Execute "selectNext" on Outliner
// 3. Test that the selected item is

// After the above works, move the jsdom stuff into a helper file

describe('Outliner', function() {
	var w;
	before(function(done) {
		var jsdom = require("jsdom");
		jsdom.env({
			file: "../example/index.html",
			src: [""], // An empty JavaScript src forces external scripts to be processed before the callback fires.
			features: {
				FetchExternalResources   : ['script'],
				ProcessExternalResources : ['script'],
				MutationEvents           : "2.0"
			},
			done: function (errors, window) {
				w = window;
				Outliner = window.Outliner;
				$ = window.$
				done();
			}
		});
	});

    after(function() {
		w.close();
    });

	describe('selectNext', function() {
		it('should should select the first tag when nothing is selected', function() {

			// TODO Figure out how to execute JavaScript code here
			// The test is whether external scripts are loaded

			// console.log(w.document.documentElement.outerHTML);


			Outliner.selectNext();
			console.log($(Outliner.selectedID).first().text()); // TODO After tests are working, refacot to use public `selected` method


			[1, 2, 3].indexOf(4).should.equal(-1);
		});
	});
});
