var jsdom = require("jsdom");
var w;

module.exports = {
	loadFile: function(file, done) {
		jsdom.env({
			file: file,
			src: [""], // An empty JavaScript src forces external scripts to be processed before the callback fires.
			features: {
				FetchExternalResources   : ['script'],
				ProcessExternalResources : ['script'],
				MutationEvents           : "2.0"
			},
			done: function (errors, window) {
				w = window;
				done(window);
			}
		});
	},
	close: function() {
		w.close();
	}
};