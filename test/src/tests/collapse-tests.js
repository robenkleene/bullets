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
