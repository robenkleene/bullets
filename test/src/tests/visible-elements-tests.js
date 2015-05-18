describe('Bullets visible elements', function() {
	describe('findVisibleElementFromElement', function() {
		it('should find the correct visible element', function () {
      var element = document.getElementById('vet-hidden-paragraph');
      var result = Bullets.findVisibleElementFromElement(element);
      console.log("result.outerHTML = " + result.outerHTML);


		});
	});
});
