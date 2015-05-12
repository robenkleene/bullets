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
