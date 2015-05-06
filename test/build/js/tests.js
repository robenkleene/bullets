(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var testhelper = require('../../lib/js/test_helper');

describe('Bullets', function() {
	beforeEach(function() {
		Bullets.deselect();
	});
	describe('deselect', function() {
		it('should deselect the selection when it is passed in', function () {
			Bullets.selectNext();
			testhelper.testSelection();
			Bullets.deselect(Bullets.selectedElement);
			testhelper.testNoSelection();
		});
		it('should deselect the selection when nothing is passed in', function () {
			Bullets.selectNext();
			testhelper.testSelection();
			Bullets.deselect();
			testhelper.testNoSelection();
		});
	});

	describe('selectNext', function() {
		it('should select the first tag when nothing is selected', function() {
			Bullets.selectNext();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(0);
		});
		it('should select the next tag after the selection', function() {
			Bullets.selectNext();
			Bullets.selectNext();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(1);
		});
		it('should keep the same selected tag when the last tag is selected', function() {
			Bullets.selectPrevious();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectNext();
			stub.should.have.callCount(1);
			stub.restore();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(-1);
		});
	});

	describe('selectPrevious', function() {
		it('should select the last tag when nothing is selected', function() {
			Bullets.selectPrevious();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(-1);
		});
		it('should select the previous tag before the selection', function() {
			Bullets.selectPrevious();
			Bullets.selectPrevious();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(-2);
		});
		it('should keep the same selected tag when the first tag is selected', function() {
			Bullets.selectNext();
			var stub = sinon.stub(Bullets, 'nothingToSelect');
			Bullets.selectPrevious();
			stub.should.have.callCount(1);
			stub.restore();
			testhelper.testSelection();
			testhelper.testSelectionMatchesIndex(0);
		});
	});

	describe('focus and blur', function() {
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


		it('focus and blur should not run when the selection doen\'t change', function() {
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

});

},{"../../lib/js/test_helper":2}],2:[function(require,module,exports){
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
		var testText = this.textOfQuerySelectorAtIndex(Bullets.tags, index);
		var bulletsText = Bullets.selectedElement.innerText;
		bulletsText.should.equal(testText);
	},

	// Private
	textOfQuerySelectorAtIndex: function(selectors, index) {
		var nodeList = document.querySelectorAll(selectors);
		if (index < 0) {
			index = nodeList.length + index;
		}
		return nodeList[index].innerText;
	}

};

},{}]},{},[1]);
