(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets collapse', function() {
	beforeEach(function() {
		Bullets.deselect();
	});
  describe('collapse', function() {
		it('should collapse the selection', function () {
			Bullets.selectNext();
      console.log("Got here");
		});

    it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToCollapse');
      Bullets.collapseSelection();
      stub.should.have.callCount(1);
      stub.restore();
    });

    // TODO It should call `nothingToCollapse` if there's no collapsable selection
  });
});

},{"../js/test-helper":3}],2:[function(require,module,exports){
var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets selection', function() {
	beforeEach(function() {
		Bullets.deselect();
	});

	describe('deselect', function() {
		it('should deselect the selection when it is passed in', function () {
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(0);
			Bullets.deselect(Bullets.selectedElement);
			testHelper.testNoSelectedElement();
		});
		it('should deselect the selection when nothing is passed in', function () {
			Bullets.selectNext();
			testHelper.testSelectionMatchesIndex(0);
			Bullets.deselect();
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
			var followTagNodeList = Bullets.selectedElement.querySelectorAll(Bullets.followTags);
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

},{"../js/test-helper":3}],3:[function(require,module,exports){
module.exports = {

	testNoSelectedElement: function() {
		should.not.exist(Bullets.selectedElement);
		document.querySelectorAll(Bullets.selectedID).length.should.equal(0);
	},
	testSelectionMatchesIndex: function(index) {
    // Confirm a selected element exists
		var selectedElement = Bullets.selectedElement;
		selectedElement.id.should.equal(Bullets.selectedID);

    // Confirm that the inner text of that element equals
    // the inner text of the element at the index
		var testText = this.textOfBulletsElementAtIndex(index);
		var bulletsText = Bullets.selectedElement.innerText;
		bulletsText.should.equal(testText);
	},

	indexOfBulletsElementWithChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, false);
	},

	indexOfBulletsElementWithoutChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, true);
	},

	indexOfBulletsElementUsingChildMatchingQuerySelector: function(selectors, invert) {
		var selectableNodeList = document.querySelectorAll(Bullets.selectTags);
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
		var nodeList = document.querySelectorAll(selectors);
		if (index < 0) {
			index = nodeList.length + index;
		}
		return nodeList[index];
	}

};

},{}]},{},[1,2]);
