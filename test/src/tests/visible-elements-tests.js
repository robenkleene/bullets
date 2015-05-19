if (typeof Element.prototype.matches === 'undefined') {
  // `Element.prototype.matches` appears to be missing from phantomjs
  Element.prototype.matches = Element.prototype.webkitMatchesSelector;
}

function runTest(name, attribute, backward) {
  var element = document.getElementById(name);
  var testResult = element.getAttribute(attribute);
  var result = Bullets.findVisibleElementFromElement(element, backward);
  if (!!testResult) {
    var text = result.innerText.trim();
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
  console.log("BACKWARDS");
  runBackwardTest(name);
  console.log("FORWARDS");
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
  describe('TARGET Test 2', function() {
		it('should find the correct element', function () {
      runBothTests('test-2');
		});
	});
  describe('Test 3', function() {
		it('should find the correct element', function () {
      runBothTests('test-3');
		});
	});
  describe('Test 4', function() {
		it('should find the correct element', function () {
      runBothTests('test-4');
		});
	});
  describe('Test 5', function() {
		it('should find the correct element', function () {
      runBothTests('test-5');
		});
	});
  describe('Test 6', function() {
		it('should find the correct element', function () {
      runBothTests('test-6');
		});
	});

});
