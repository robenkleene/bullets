var Outliner = {

	// Public
	tags: 'a',
	selected: 'selected',
    get selection () {
		return $(Outliner.selectedID);
	},

	// Private
	nextOffset: 1,
	previousOffset: -1,
    get selectedID () {
		return '#' + Outliner.selected;
	},

	// Public
	selectNext: function() {
		this.selectOffset(this.nextOffset);
	},
	selectPrevious: function() {
		this.selectOffset(this.previousOffset);
	},

	// Private
	selectOffset: function(offset) {
		var tags = $(this.tags);
		if (!tags.length > 0) {
			this.nothingToSelect();
			return;
		}


		var selection = this.selection;
		if (!selection.length > 0) {
			// Nothing selection, select first or last element
			var select;
			if (offset > 0) {
				select = tags.first();
			} else {
				select = tags.last();
			}
			this.select(select);
			return;
		}
		var indexToSelect = tags.index(selection) + offset;
		var tag = tags.eq(indexToSelect);
		if (!tag.length > 0 || indexToSelect < 0) { 
			// No next tag was found.
			// Ignore indexes less than zero to prevent wrapping.
			this.nothingToSelect();
			return;
		}
		this.deselect(selection);
		this.select(tag);
	},


	select: function(object) {
		object.attr('id', this.selected);
	},

	deselect: function(object) {
		object.removeAttr('id');
	},

	nothingToSelect: function() {
		// TODO Beep or visual bell here?
		console.log("Nothing to select");
	}
}