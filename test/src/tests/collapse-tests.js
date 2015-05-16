var testHelper = require('../js/test-helper');
window.testHelper = testHelper;

describe('Bullets collapse', function() {
	beforeEach(function() {
		Bullets.deselect();
	});
  describe('toggle collapse', function() {
		it('should toggle collapse for the selection', function () {
			Bullets.selectNext();
			Bullets.toggleCollapse();
			var result = testHelper.isSelectedElementCollapsed();
			result.should.equal(true);
			Bullets.toggleCollapse();
			result = testHelper.isSelectedElementCollapsed();
			result.should.equal(false);
		});

    it('should do nothing when nothing is selected', function() {
      var stub = sinon.stub(Bullets, 'nothingToCollapse');
      Bullets.toggleCollapse();
      stub.should.have.callCount(1);
      stub.restore();
    });

    // TODO It should call `nothingToCollapse` if there's no collapsable selection
  });
});
