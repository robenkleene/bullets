(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof Element.prototype.matches === 'undefined') {
  // `Element.prototype.matches` appears to be missing from phantomjs
  Element.prototype.matches = Element.prototype.webkitMatchesSelector;
}

function runTest(name, attribute, backward) {
  var element = document.getElementById(name);
  var testResult = element.getAttribute(attribute);
  Bullets.selectElement(element);

  var offset = backward ? Bullets.PREVIOUS_OFFSET : Bullets.NEXT_OFFSET;
  var result = Bullets.visibleSelectableElementFromOffset(offset);

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

  describe('Header Collapse Selection Tests', function() {
    beforeEach(function() {
  		Bullets.rootElement = document.getElementById("header-collapse-selection-tests");
  	});
    describe('Header Collapse Selection Test 1', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-1');
  		});
  	});
    describe('Header Collapse Selection Test 2', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-2');
  		});
  	});
    describe('Header Collapse Selection Test 3', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-3');
  		});
  	});
    describe('Header Collapse Selection Test 4', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-4');
  		});
  	});
    describe('Header Collapse Selection Test 5', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-5');
  		});
  	});
    describe('Header Collapse Selection Test 6', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-6');
  		});
  	});
    describe('Header Collapse Selection Test 7', function() {
  		it('should find the correct element', function () {
        runBothTests('hcs-test-7');
  		});
  	});

	});

});

},{}],2:[function(require,module,exports){
var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets collapse', function() {
	beforeEach(function() {
		Bullets.rootElement = document.getElementById("test-content");
		Bullets.deselectAll();
		Bullets.expandAll();
	});
  describe('toggleCollapseSelection', function() {
		it('should toggle collapse for the selection', function () {
			Bullets.selectNext();
			Bullets.toggleCollapseSelection();
			testHelper.isSelectedElementCollapsed().should.equal(true);
			Bullets.toggleCollapseSelection();
			testHelper.isSelectedElementCollapsed().should.equal(false);
		});
    it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToCollapse');
      Bullets.toggleCollapseSelection();
      stub.should.have.callCount(1);
      stub.restore();
    });
	});
	describe('expandAll', function() {
		it('should expand all', function() {
			Bullets.selectNext();
			Bullets.collapseSelection();
			Bullets.selectNext();
			Bullets.collapseSelection();
			Bullets.expandAll();
			var nodeList = Bullets.rootElement.getElementsByClassName(Bullets.collapsedClass);
			nodeList.length.should.equal(0);
    });
	});
	describe('collapseSelection', function() {
		it('should collapse the selection', function () {
			Bullets.selectNext();
			Bullets.collapseSelection();
			testHelper.isSelectedElementCollapsed().should.equal(true);
		});
		it('should do nothing when the selection is already collapsed', function() {
			var stub = sinon.stub(Bullets, 'nothingToCollapse');
			Bullets.selectNext();
			Bullets.collapseSelection();
      Bullets.collapseSelection();
			testHelper.isSelectedElementCollapsed().should.equal(true);
      stub.should.have.callCount(1);
      stub.restore();
    });
		it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToCollapse');
      Bullets.collapseSelection();
      stub.should.have.callCount(1);
      stub.restore();
    });
  });
	describe('expandSelection', function() {
		it('should expand the selection', function () {
			Bullets.selectNext();
			Bullets.collapseSelection();
			Bullets.expandSelection();
			testHelper.isSelectedElementCollapsed().should.equal(false);
		});
		it('should do nothing when the selection is already expanded', function() {
			var stub = sinon.stub(Bullets, 'nothingToExpand');
			Bullets.selectNext();
      Bullets.expandSelection();
			testHelper.isSelectedElementCollapsed().should.equal(false);
      stub.should.have.callCount(1);
      stub.restore();
    });
		it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToExpand');
      Bullets.expandSelection();
      stub.should.have.callCount(1);
      stub.restore();
    });
  });
});

},{"../js/test-helper":4}],3:[function(require,module,exports){
var testHelper = require('../js/test-helper');
window.testHelper = testHelper;



describe('Bullets selection', function() {
	beforeEach(function() {
		Bullets.rootElement = document.getElementById("test-content");
		Bullets.deselectAll();
	});

	describe('deselectElement', function() {
		it('should deselect the element', function () {
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(0);
			var nodeList = Bullets.selectedNodes;
			for (var i = nodeList.length - 1; i >= 0; --i) {
				var element = nodeList[i];
				Bullets.deselectElement(element);
			}
			testHelper.testNoSelectedElement();
		});
	});
  describe('deselectAll', function() {
		it('should deselect every element', function () {
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(0);
			Bullets.deselectAll();
			testHelper.testNoSelectedElement();
		});
	});

	describe('selectNext', function() {
		it('should select the first tag when nothing is selected', function() {
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(0);
		});
		it('should select the next tag after the selection', function() {
			Bullets.selectNext();
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(1);
		});
		it('should keep the same selected tag when the last tag is selected', function() {
			Bullets.selectPrevious();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectNext();
			stub.should.have.callCount(1);
			stub.restore();
			testHelper.testSelectionMatchesIndex(-1);
		});
		it('should scroll out of view elements into view', function() {
			var stub = sinon.stub(Bullets, 'elementIsScrolledIntoView', function() { return false; });
			var element = testHelper.bulletsElementAtIndex(0);
			var spy = sinon.spy(element, 'scrollIntoView');
			Bullets.selectNext();
			spy.should.have.callCount(1);
			stub.restore();
			spy.restore();
		});
	});

	describe('selectPrevious', function() {
		it('should select the last tag when nothing is selected', function() {
			Bullets.selectPrevious();
			testHelper.testSelectionMatchesIndex(-1);
		});
		it('should select the previous tag before the selection', function() {
			Bullets.selectPrevious();
			Bullets.selectPrevious();
			testHelper.testSelectionMatchesIndex(-2);
		});
		it('should keep the same selected tag when the first tag is selected', function() {
			Bullets.selectNext();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectPrevious();
			stub.should.have.callCount(1);
			stub.restore();
			testHelper.testSelectionMatchesIndex(0);
		});
		it('should scroll out of view elements into view', function() {
			var stub = sinon.stub(Bullets, 'elementIsScrolledIntoView', function() { return false; });
			var element = testHelper.bulletsElementAtIndex(-1);
			var spy = sinon.spy(element, 'scrollIntoView');
			Bullets.selectPrevious();
			spy.should.have.callCount(1);
			stub.restore();
			spy.restore();
		});
	});

	describe('followSelection', function() {
		it('should follow the first follow tag child of the selected tag', function() {
			// Select the first element that has a followable child node
			var index = testHelper.indexOfBulletsElementWithChildMatchingQuerySelector(Bullets.followTags);
			for (var i = 0; i <= index; i++) {
				Bullets.selectNext();
			}

			// Get the content of the `href` attribute for the follow able node
			var followTagNodeList = Bullets.selectedNodes[0].querySelectorAll(Bullets.followTags);
			followTagNodeList.length.should.be.above(0);
			var followTag = followTagNodeList[0];
			var href = followTag.getAttribute('href');
			href.length.should.be.above(0);

			// Confirm the `followSelection` redirects
			var stub = sinon.stub(Bullets, 'redirect');
			Bullets.followSelection();
			stub.should.have.callCount(1);
			stub.should.have.been.calledWithExactly(href);
			stub.restore();
		});
		it('should not follow anything if the selected tag has no follow tag children', function() {
			var index = testHelper.indexOfBulletsElementWithoutChildMatchingQuerySelector(Bullets.followTags);
			for (var i = 0; i <= index; i++) {
				Bullets.selectNext();
			}
			var stub = sinon.stub(Bullets, 'nothingToFollow');
			Bullets.followSelection();
			stub.should.have.callCount(1);
			stub.restore();
		});

		// TODO: Test `followSelect` should skip over tags that don't have the `href` attribute
	});
});

},{"../js/test-helper":4}],4:[function(require,module,exports){
module.exports = {

	testNoSelectedElement: function() {
		var nodeList = Bullets.selectedNodes;
		nodeList.length.should.equal(0);
		Bullets.rootElement.querySelectorAll(Bullets.selectedClass).length.should.equal(0);
	},
	testSelectionMatchesIndex: function(index) {
    // Confirm a selected element exists
		var selectedElement = Bullets.selectedNodes[0];
		selectedElement.classList.contains(Bullets.selectedClass).should.equal(true);

    // Confirm that the inner text of that element equals
    // the inner text of the element at the index
		var testText = this.textOfBulletsElementAtIndex(index);
		var bulletsText = selectedElement.innerText;
		bulletsText.should.equal(testText);
	},

	isSelectedElementCollapsed: function() {
		var selectedElement = Bullets.selectedNodes[0];
		if (!selectedElement) {
			return false;
		}
		return selectedElement.classList.contains(Bullets.collapsedClass);
	},

	indexOfBulletsElementWithChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, false);
	},

	indexOfBulletsElementWithoutChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, true);
	},

	indexOfBulletsElementUsingChildMatchingQuerySelector: function(selectors, invert) {
		var selectableNodeList = Bullets.rootElement.querySelectorAll(Bullets.selectTags);
		for (var i = 0; i < selectableNodeList.length; i++) {
	    var selectableElement = selectableNodeList[i];
			var followNodeList = selectableElement.querySelectorAll(selectors);
			if (!invert) {
				if (followNodeList.length > 0) {
					return i;
				}
			} else {
				if (followNodeList.length < 1) {
					return i;
				}
			}
		}
	},

	// Bullets Elements

	textOfBulletsElementAtIndex: function(index) {
		return this.textOfQuerySelectorAtIndex(Bullets.selectTags, index);
	},

	valueOfAttributeForBulletsElementAtIndex: function(selectors, index, attribute) {
		return this.valueOfAttributeForQuerySelectorAtIndex(Bullets.selectTags, index, attribute);
	},

	bulletsElementAtIndex: function(index) {
		return this.elementOfQuerySelectorAtIndex(Bullets.selectTags, index);
	},


	// Element Helpers

	textOfQuerySelectorAtIndex: function(selectors, index) {
		var node = this.elementOfQuerySelectorAtIndex(selectors, index);
		return node.innerText;
	},

	valueOfAttributeForQuerySelectorAtIndex: function(selectors, index, attribute) {
		var node = this.elementOfQuerySelectorAtIndex(selectors, index);
		return node.getAttribute(attribute);
	},

	elementOfQuerySelectorAtIndex: function (selectors, index) {
		var nodeList = Bullets.rootElement.querySelectorAll(selectors);
		if (index < 0) {
			index = nodeList.length + index;
		}
		return nodeList[index];
	}

};

},{}]},{},[1,2,3]);
