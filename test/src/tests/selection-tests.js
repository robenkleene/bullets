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
