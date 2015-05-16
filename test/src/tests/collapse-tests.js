var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets collapse', function() {
	beforeEach(function() {
		Bullets.deselect();
		Bullets.expandAll();
	});
  describe('toggle collapse', function() {
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
	describe('expand all', function() {
		it('should expand all', function() {
			Bullets.selectNext();
			Bullets.collapseSelection();
			Bullets.selectNext();
			Bullets.collapseSelection();
			Bullets.expandAll();
			var nodeList = document.getElementsByClassName(Bullets.collapsedClass);
			nodeList.length.should.equal(0);
    });
	});
	describe('collapse selection', function() {
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
    // TODO It should call `nothingToCollapse` if an element is already collapsed
		// TODO It should call `nothingToCollapse` there's nothing selected
  });
	describe('expand selection', function() {
    // TODO It should call `nothingToExpand` if an element is already collapsed
		// TODO It should call `nothingToExpand` there's nothing selected
		// TODO It should expand the selection (calling again should not collapse the selection)
  });
});
