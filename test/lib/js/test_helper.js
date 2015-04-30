var testhelper = {
	testSelection: function() {
		var testSelection = document.activeElement;
		var selectedElement = Bullets.selectedElement;
		selectedElement.should.equal(testSelection);
		selectedElement.id.should.equal(Bullets.selectedID);
	},
	testNoSelection: function() {
		should.not.exist(Bullets.selectedElement);
		document.activeElement.should.equal(document.body);
		document.querySelectorAll(Bullets.selectedID).length.should.equal(0);
	},
	testSelectionMatchesIndex: function(index) {
		var testText = testhelper.textOf(Bullets.tags, index);
		var bulletsText = Bullets.selection.text();
		bulletsText.should.equal(testText);
	},

	// Private
	textOf: function(tag, index) {
		return $(tag).eq(index).text();
	}

};
