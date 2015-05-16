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
