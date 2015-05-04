var Bullets = {
	// Constants
	NEXT_OFFSET: 1,
	PREVIOUS_OFFSET: -1,

	// Public
	selectedID: 'selected',
	tags: 'a',
  get selectedElement() {
		if (document.body != document.activeElement) {
			return document.activeElement;
		}
    return document.getElementById(this.selectedID);
	},

	// Public
	selectNext: function() {
		this.selectAtOffset(this.NEXT_OFFSET);
	},
	selectPrevious: function() {
		this.selectAtOffset(this.PREVIOUS_OFFSET);
	},

	// Private
	selectAtOffset: function(offset) {
    var elementToSelect = this.elementAtOffset(offset);
		if (!elementToSelect) {
			this.nothingToSelect();
			return;
		}
		this.select(elementToSelect);
	},

	elementAtOffset: function(offset) {
		var tagsNodeList = document.querySelectorAll(this.tags);
		if (tagsNodeList.length < 1) {
			return;
		}

		var selectedElement = this.selectedElement;
		if (!selectedElement) {
			// No selected element, return first or last element
			var firstOrLastElement = offset > 0 ? tagsNodeList[0] : tagsNodeList[tagsNodeList.length - 1];
			return firstOrLastElement;
		}

		var indexToSelect = Array.prototype.indexOf.call(tagsNodeList, selectedElement) + offset;
		if (indexToSelect < 0 || indexToSelect >= tagsNodeList.length) {
			// Ignore out of bounds indexes
			return;
		}

		var elementToSelect = tagsNodeList[indexToSelect];
		return elementToSelect;
	},

	followSelection: function() {
		var selectedElement = this.selectedElement;
		var address = selectedElement.attr('href');
		window.location = address;
	},

	select: function(object) {
		this.deselect();
		if (!!object) {
			object.focus();
			object.id = this.selectedID;
		}
	},

	deselect: function(object) {
		element = object || this.selectedElement;
		if (!!element) {
			element.blur();
			element.removeAttribute('id');
		}
	},

	nothingToSelect: function() {
		// TODO Beep or visual bell here?
		console.log("Nothing to select");
	}
};