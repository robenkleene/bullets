var w;
var $;
module.exports = {
	init: function(window) {
		w = window;
		$ = window.$;
	},
	textOf: function(tag, index) {
		return $(tag).eq(index).text();
	},
	logDOM: function() {
		console.log(w.document.documentElement.outerHTML);
	}

};