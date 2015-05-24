if (typeof Element.prototype.matches === 'undefined') {
  // `Element.prototype.matches` appears to be missing from phantomjs
  Element.prototype.matches = Element.prototype.webkitMatchesSelector;
}

function runTest(name, attribute, backward) {
  var element = document.getElementById(name);
  var testResult = element.getAttribute(attribute);
  Bullets.selectElement(element);

  var result = backward ? Bullets.previousVisibleSelectableElement() : Bullets.nextVisibleSelectableElement();

  if (!!testResult) {
    var text = result.innerText.trim();
    var index = text.indexOf('\n');
    if (index > 0) {
      text = text.substring(0, index);
    }
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
    Bullets.deselectAll();
  });
  describe('Collapse Selection Tests', function() {
    beforeEach(function() {
  		Bullets.rootElement = document.getElementById("collapse-selection-tests");
  	});
    describe('Collapse Selection Test 1', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-1');
  		});
  	});
    describe('Collapse Selection Test 2', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-2');
  		});
  	});
    describe('Collapse Selection Test 3', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-3');
  		});
  	});
    describe('Collapse Selection Test 4', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-4');
  		});
  	});
    describe('Collapse Selection Test 5', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-5');
  		});
  	});
    describe('Collapse Selection Test 6', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-6');
  		});
  	});
    describe('Collapse Selection Test 7', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-7');
  		});
  	});
    describe('Collapse Selection Test 8', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-8');
  		});
  	});
    describe('Collapse Selection Test 9', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-9');
  		});
  	});
    describe('Collapse Selection Test 10', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-10');
  		});
  	});
    describe('Collapse Selection Test 11', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-11');
  		});
  	});
    describe('Collapse Selection Test 12', function() {
  		it('should find the correct element', function () {
        runBothTests('cs-test-12');
  		});
  	});
	});

});
