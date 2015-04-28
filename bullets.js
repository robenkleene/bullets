var Bullets = {
	// Constants
	NEXT_OFFSET: 1,
	PREVIOUS_OFFSET: -1,

	// Public
	selectedID: 'selected',
	tags: 'a',
  // selectedIDValue: 'selected',
  //   get selectedSelector () {
  //   return '#' + this.selectedIDValue;
  // },
  get selectedElement() {
		if (document.body != document.activeElement) {
console.log("activeElement = " + activeElement);
			return document.activeElement;
		}
console.log("document.getElementById(this.selectedID) = " + document.getElementById(this.selectedID));
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
			var firstOrLastElement = offset > 0 ? tagsNodeList[0] : tagsNodeList.last();
			this.select(firstOrLastElement);
			return;
		}

		var indexToSelect = tagsNodeList.index(selectedElement) + offset;

  	if (indexToSelect < 0) {
			// No next tag was found.
			// Ignore indexes less than zero to prevent wrapping.
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
		object.focus();
console.log("object = " + object);
		object.attr('id', this.selectedID);
	},

	deselect: function(object) {
// console.log("object = " + object);
		element = object || this.selectedElement;
// console.log("element = " + element);
		if (!!element) {
			object.blur();
			object.removeAttr('id');
		}
	},

	nothingToSelect: function() {
		// TODO Beep or visual bell here?
		console.log("Nothing to select");
	}
};
