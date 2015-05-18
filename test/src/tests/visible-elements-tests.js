function runTest(name) {
  var element = document.getElementById(name);
  var forward = element.getAttribute('data-forward');
  var backward = element.getAttribute('data-backward');
  var forwardResult = Bullets.findVisibleElementFromElement(element, false).innerText;
  forwardResult.should.equal(forward);
  var backwardResult = Bullets.findVisibleElementFromElement(element, true).innerText;
  backwardResult.should.equal(backward);
}

describe('Bullets findVisibleElementFromElement', function() {
  beforeEach(function() {
		Bullets.rootElement = document.getElementById("test-content");
		Bullets.deselectAll();
	});

	describe('Test 1', function() {
		it('should find the correct visible element', function () {
      runTest('test-1');
		});
	});
});
