var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets collapse', function() {
	beforeEach(function() {
		Bullets.deselect();
	});
  describe('toggle collapse', function() {
		it('should toggle collapse for the selection', function () {
			Bullets.selectNext();
			Bullets.toggleCollapseSelection();
			var result = testHelper.isSelectedElementCollapsed();
			result.should.equal(true);
			Bullets.toggleCollapseSelection();
			result = testHelper.isSelectedElementCollapsed();
			result.should.equal(false);
		});

    it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToCollapse');
      Bullets.toggleCollapseSelection();
      stub.should.have.callCount(1);
      stub.restore();
    });
	});
	describe('collapse selection', function() {
    // TODO It should call `nothingToCollapse` if an element is already collapsed
		// TODO It should call `nothingToCollapse` there's nothing selected
		// TODO It should collapse the selection
  });
	describe('expand selection', function() {
    // TODO It should call `nothingToExpand` if an element is already collapsed
		// TODO It should call `nothingToExpand` there's nothing selected
		// TODO It should expand the selection
  });
});
