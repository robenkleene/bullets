(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
describe('Bullets focus and blur', function() {
  beforeEach(function() {
		Bullets.deselect();
	});

  it('only focus should run when the next tag is selected', function() {
    var element = Bullets.elementAtOffset(1);
    var focusSpy = sinon.spy(element, 'focus');
    var blurSpy = sinon.spy(element, 'blur');
    Bullets.selectNext();
    focusSpy.should.have.callCount(1);
    blurSpy.should.have.callCount(0);
    focusSpy.restore();
    blurSpy.restore();
  });

  it('focus and blur should not run when the selection doesn\'t change', function() {
    var element = Bullets.elementAtOffset(1);
    var focusSpy = sinon.spy(element, 'focus');
    var blurSpy = sinon.spy(element, 'blur');
    var stub = sinon.stub(Bullets, 'nothingToSelect');

    Bullets.selectNext();
    Bullets.selectPrevious();
    focusSpy.should.have.callCount(1);
    blurSpy.should.have.callCount(0);
    stub.should.have.callCount(1);

    stub.restore();
    focusSpy.restore();
    blurSpy.restore();
  });

  it('focus and blur should each fire once when the selection changes', function() {
    var elementOne = Bullets.elementAtOffset(1);
    var focusSpyOne = sinon.spy(elementOne, 'focus');
    var blurSpyOne = sinon.spy(elementOne, 'blur');
    Bullets.selectNext();

    var elementTwo = Bullets.elementAtOffset(1);
    var focusSpyTwo = sinon.spy(elementTwo, 'focus');
    var blurSpyTwo = sinon.spy(elementTwo, 'blur');
    Bullets.selectNext();
    focusSpyOne.should.have.callCount(1);
    blurSpyOne.should.have.callCount(1);
    focusSpyTwo.should.have.callCount(1);
    blurSpyTwo.should.have.callCount(0);


    var elementThree = Bullets.elementAtOffset(1);
    var focusSpyThree = sinon.spy(elementThree, 'focus');
    var blurSpyThree = sinon.spy(elementThree, 'blur');
    Bullets.selectNext();
    focusSpyOne.should.have.callCount(1);
    blurSpyOne.should.have.callCount(1);
    focusSpyTwo.should.have.callCount(1);
    blurSpyTwo.should.have.callCount(1);
    focusSpyThree.should.have.callCount(1);
    blurSpyThree.should.have.callCount(0);

    focusSpyOne.restore();
    blurSpyOne.restore();
    focusSpyTwo.restore();
    blurSpyTwo.restore();
    focusSpyThree.restore();
    blurSpyThree.restore();
  });
});

},{}],2:[function(require,module,exports){
var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets selection', function() {
	beforeEach(function() {
		Bullets.deselect();
	});

	describe('deselect', function() {
		it('should deselect the selection when it is passed in', function () {
			Bullets.selectNext();
			testHelper.testSelection();
			Bullets.deselect(Bullets.selectedElement);
			testHelper.testNoSelection();
		});
		it('should deselect the selection when nothing is passed in', function () {
			Bullets.selectNext();
			testHelper.testSelection();
			Bullets.deselect();
			testHelper.testNoSelection();
		});
	});

	describe('selectNext', function() {
		it('should select the first tag when nothing is selected', function() {
			Bullets.selectNext();
			testHelper.testSelection();
			testHelper.testSelectionMatchesIndex(0);
		});
		it('should select the next tag after the selection', function() {
			Bullets.selectNext();
			Bullets.selectNext();
			testHelper.testSelection();
			testHelper.testSelectionMatchesIndex(1);
		});
		it('should keep the same selected tag when the last tag is selected', function() {
			Bullets.selectPrevious();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectNext();
			stub.should.have.callCount(1);
			stub.restore();
			testHelper.testSelection();
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
			testHelper.testSelection();
			testHelper.testSelectionMatchesIndex(-1);
		});
		it('should select the previous tag before the selection', function() {
			Bullets.selectPrevious();
			Bullets.selectPrevious();
			testHelper.testSelection();
			testHelper.testSelectionMatchesIndex(-2);
		});
		it('should keep the same selected tag when the first tag is selected', function() {
			Bullets.selectNext();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectPrevious();
			stub.should.have.callCount(1);
			stub.restore();
			testHelper.testSelection();
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
		it('should follow the selected tag', function() {
			Bullets.selectNext();
			var href = testHelper.valueOfAttributeForBulletsElementAtIndex(0, 'href');
			var stub = sinon.stub(Bullets, 'redirect');
			Bullets.followSelection();
			stub.should.have.callCount(1);
			stub.should.have.been.calledWithExactly(href);
			stub.restore();
		});
	});
});

},{"../js/test-helper":3}],3:[function(require,module,exports){
module.exports = {
	testSelection: function() {
		var testSelection = document.activeElement;
		var selectedElement = Bullets.selectedElement;
		selectedElement.should.equal(testSelection);
		selectedElement.id.should.equal(Bullets.selectedID);
	},
	testNoSelection: function() {
		should.not.exist(Bullets.selectedElement);
		document.activeElement.should.equal(document.body);
		document.querySelectorAll(Bullets.selectedID).length.should.equal(0);
	},
	testSelectionMatchesIndex: function(index) {
		var testText = this.textOfBulletsElementAtIndex(index);
		var bulletsText = Bullets.selectedElement.innerText;
		bulletsText.should.equal(testText);
	},


	// Bullets Elements

	textOfBulletsElementAtIndex: function(index) {
		return this.textOfQuerySelectorAtIndex(Bullets.selectableTags, index);
	},

	valueOfAttributeForBulletsElementAtIndex: function(selectors, index, attribute) {
		return this.valueOfAttributeForQuerySelectorAtIndex(Bullets.selectableTags, index, attribute);
	},

	bulletsElementAtIndex: function(index) {
		return this.elementOfQuerySelectorAtIndex(Bullets.selectableTags, index);
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
