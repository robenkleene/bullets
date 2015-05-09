var testhelper = require('../js/test-helper');
window.testhelper = testhelper;

describe('Bullets selection', function() {
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

	describe('followSelection', function() {
		it('should follow the selected tag', function() {
			Bullets.selectNext();
			var href = testhelper.valueOfAttributeForQuerySelectorAtIndex(Bullets.tags, 0, 'href');
			var stub = sinon.stub(Bullets, 'redirect');
			Bullets.followSelection();
			stub.should.have.callCount(1);
			stub.should.have.been.calledWithExactly(href);
			stub.restore();
		});
	});
});
