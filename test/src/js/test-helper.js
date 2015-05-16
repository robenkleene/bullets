module.exports = {

	testNoSelectedElement: function() {
		should.not.exist(Bullets.selectedElement);
		document.querySelectorAll(Bullets.selectedID).length.should.equal(0);
	},
	testSelectionMatchesIndex: function(index) {
    // Confirm a selected element exists
		var selectedElement = Bullets.selectedElement;
		selectedElement.id.should.equal(Bullets.selectedID);

    // Confirm that the inner text of that element equals
    // the inner text of the element at the index
		var testText = this.textOfBulletsElementAtIndex(index);
		var bulletsText = Bullets.selectedElement.innerText;
		bulletsText.should.equal(testText);
	},

	isSelectedElementCollapsed: function() {
		var selectedElement = Bullets.selectedElement;
		if (!selectedElement) {
			return false;
		}
		return selectedElement.classList.contains(Bullets.collapsedClass);
	},

	indexOfBulletsElementWithChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, false);
	},

	indexOfBulletsElementWithoutChildMatchingQuerySelector: function(selectors) {
		return this.indexOfBulletsElementUsingChildMatchingQuerySelector(selectors, true);
	},

	indexOfBulletsElementUsingChildMatchingQuerySelector: function(selectors, invert) {
		var selectableNodeList = document.querySelectorAll(Bullets.selectTags);
		for (var i = 0; i < selectableNodeList.length; i++) {
	    var selectableElement = selectableNodeList[i];
			var followNodeList = selectableElement.querySelectorAll(selectors);
			if (!invert) {
				if (followNodeList.length > 0) {
					return i;
				}
			} else {
				if (followNodeList.length < 1) {
					return i;
				}
			}
		}
	},

	// Bullets Elements

	textOfBulletsElementAtIndex: function(index) {
		return this.textOfQuerySelectorAtIndex(Bullets.selectTags, index);
	},

	valueOfAttributeForBulletsElementAtIndex: function(selectors, index, attribute) {
		return this.valueOfAttributeForQuerySelectorAtIndex(Bullets.selectTags, index, attribute);
	},

	bulletsElementAtIndex: function(index) {
		return this.elementOfQuerySelectorAtIndex(Bullets.selectTags, index);
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
