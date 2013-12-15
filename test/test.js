var should = require('should');

// 1. Create a setup method that loads index.html into the dom
// 2. Execute "selectNext" on Outliner
// 3. Test that the selected item is

// After the above works, move the jsdom stuff into a helper file

describe('Array', function(){
  before(function(){
	  var jsdom = require("jsdom");
	  jsdom.env("../example/index.html", function (errors, window) {
	    // free memory associated with the window
		console.log(window.document.documentElement.outerHTML);
	    window.close();
	  });
  });

  describe('#indexOf()', function(){
    it('should return -1 when not present', function(){
      [1,2,3].indexOf(4).should.equal(-1);
    });
  });
});