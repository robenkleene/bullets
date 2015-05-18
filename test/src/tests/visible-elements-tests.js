describe('Bullets visible elements', function() {
  beforeEach(function() {
		Bullets.rootElement = document.getElementById("test-content");
		Bullets.deselectAll();
	});

	describe('findVisibleElementFromElement', function() {
		it('should find the correct visible element', function () {
      var element = document.getElementById('vet-hidden-paragraph');
      var result = Bullets.findVisibleElementFromElement(element, false);

      console.log("result.outerHTML = " + result.outerHTML);
		});
	});
});
