function runTest(name, attribute, backward) {
  var element = document.getElementById(name);
  var testResult = element.getAttribute(attribute);
  var result = Bullets.findVisibleElementFromElement(element, backward);
  if (!!testResult) {
    var text = result.innerText;
    text.should.equal(testResult);
  } else {
    should.equal(result, null);
  }
}

function runForwardTest(name) {
  runTest(name, 'data-forward', false);
}

function runBackwardTest(name) {
  runTest(name, 'data-backward', true);
}

function runBothTests(name) {
  runBackwardTest(name);
  runForwardTest(name);
}

describe('Bullets visible elements', function() {
  beforeEach(function() {
		Bullets.rootElement = document.getElementById("visible-element-tests");
		Bullets.deselectAll();
	});

	describe('Test 1', function() {
		it('should find the correct element', function () {
      runBothTests('test-1');
		});
	});
  describe('Test 2', function() {
		it('should find the correct element', function () {
      runBothTests('test-2');
		});
	});
  describe('Test 3', function() {
		it('should find the correct element', function () {
      runBothTests('test-3');
		});
	});
});
