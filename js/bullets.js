var Bullets = {

	// Public
	tags: 'a',
	selected: 'selected',
    get selection () {
		if (document.body != document.activeElement) {
			return $(document.activeElement);
		}
		return $(Bullets.selectedID);
	},

	// Private
    init: function() {
		$(this.tags).focus(function() {
			$(this).attr('id', Bullets.selected);
		});
		$(this.tags).blur(function() {
			$(this).removeAttr('id');
		});
    },
	nextOffset: 1,
	previousOffset: -1,
    get selectedID () {
		return '#' + Bullets.selected;
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
		this.select(tag);
	},

	followSelection: function() {
		var selection = this.selection;
		var address = selection.attr('href');
		window.location = address;
	},
	select: function(object) {
		object.focus();
	},

	deselect: function(object) {
		object = object || this.selection;
		object.blur();
	},

	nothingToSelect: function() {
		// TODO Beep or visual bell here?
		console.log("Nothing to select");
	}
}

$(document).ready(function () {
	Bullets.init();
});