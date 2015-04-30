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
		this.selectOffset(this.NEXT_OFFSET);
	},
	selectPrevious: function() {
		this.selectOffset(this.PREVIOUS_OFFSET);
	},

	// Private
	selectOffset: function(offset) {
		var tagsNodeList = document.querySelectorAll(this.tags);
		if (tagsNodeList.length < 1) {
			this.nothingToSelect();
			return;
		}

		var selectedElement = this.selectedElement;
		if (!selectedElement) {
			// Nothing selection, select first or last element
			var firstOrLastElement = offset > 0 ? tagsNodeList[0] : tagsNodeList[tagsNodeList.length - 1];
			this.select(firstOrLastElement);
			return;
		}

		var indexToSelect = Array.prototype.indexOf.call(tagsNodeList, selectedElement) + offset;
  	if (indexToSelect < 0 || indexToSelect >= tagsNodeList.length) {
			// Ignore out of bounds indexes
			this.nothingToSelect();
			return;
		}

    var elementToSelect = tagsNodeList[indexToSelect];
		this.select(elementToSelect);
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
