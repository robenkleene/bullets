module.exports = {
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
		var testText = this.textOfBulletsElementAtIndex(index);
		var bulletsText = Bullets.selectedElement.innerText;
		bulletsText.should.equal(testText);
	},


	// Bullets Elements

	textOfBulletsElementAtIndex: function(index) {
		return this.textOfQuerySelectorAtIndex(Bullets.selectableTags, index);
	},

	valueOfAttributeForBulletsElementAtIndex: function(selectors, index, attribute) {
		return this.valueOfAttributeForQuerySelectorAtIndex(Bullets.selectableTags, index, attribute);
	},

	bulletsElementAtIndex: function(index) {
		return this.elementOfQuerySelectorAtIndex(Bullets.selectableTags, index);
	},


	// Element Helpers

	textOfQuerySelectorAtIndex: function(selectors, index) {
		var node = this.elementOfQuerySelectorAtIndex(selectors, index);
		return node.innerText;
	},

	valueOfAttributeForQuerySelectorAtIndex: function(selectors, index, attribute) {
		var node = this.elementOfQuerySelectorAtIndex(selectors, index);
		return node.getAttribute(attribute);
	},

	elementOfQuerySelectorAtIndex: function (selectors, index) {
		var nodeList = document.querySelectorAll(selectors);
		if (index < 0) {
			index = nodeList.length + index;
		}
		return nodeList[index];
	}

};
