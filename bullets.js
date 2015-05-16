var Bullets = {
	// Constants
	NEXT_OFFSET: 1,
	PREVIOUS_OFFSET: -1,

	// Public
	selectedID: 'bullets-selected',
	collapsedClass: 'bullets-collapsed',
	headerTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	hierarchicalTags: ['li'],
  followTags: ['a'],
  get selectTags() {
    return this.headerTags.concat(this.hierarchicalTags);
  },
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
	deselect: function(element) {
		element = element || this.selectedElement;
		if (!!element) {
			element.removeAttribute('id');
		}
	},
	toggleCollapseSelection: function() {
		var selectedElement = this.selectedElement;
		if (!selectedElement) {
			this.nothingToCollapse();
			return;
		}
		if(this.elementIsCollapsed(selectedElement)) {
			this.expandElement(selectedElement);
		} else {
			this.collapseElement(selectedElement);
		}
	},
	collapseSelection: function() {
		var selectedElement = this.selectedElement;
		if (!selectedElement || this.elementIsCollapsed(selectedElement)) {
			this.nothingToCollapse();
			return;
		}
		this.collapseElement(selectedElement);
	},
	expandSelection: function() {
		var selectedElement = this.selectedElement;
		if (!selectedElement || !this.elementIsCollapsed(selectedElement)) {
			this.nothingToExpand();
			return;
		}
		this.expandElement(selectedElement);
	},
	expandAll: function() {
		var nodeList = document.getElementsByClassName(this.collapsedClass);
		for (var i = nodeList.length - 1; i >= 0; --i) {
			var element = nodeList[i];
			this.expandElement(element);
		}
	},

	// Private

	elementIsCollapsed: function(element) {
		if (!element) {
			return false;
		}

		return element.classList.contains(this.collapsedClass);
	},

	selectAtOffset: function(offset) {
    var elementToSelect = this.elementAtOffset(offset);
		if (!elementToSelect) {
			this.nothingToSelect();
			return;
		}
		this.selectElement(elementToSelect);
	},

	elementAtOffset: function(offset) {
		var tagsNodeList = document.querySelectorAll(this.selectTags);
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
		var followTagsNodeList = selectedElement.querySelectorAll(this.followTags);
		if (followTagsNodeList.length < 1) {
			this.nothingToFollow();
			return;
		}

		for (var i = 0; i < followTagsNodeList.length; i++) {
			var followTag = followTagsNodeList[i];
			if (followTag.hasAttribute('href')) {
				var address = followTag.getAttribute('href');
				this.redirect(address);
				return;
			}
		}
		this.nothingToFollow();
	},

	redirect: function(address) {
		window.location = address;
	},

	selectElement: function(element) {
		this.deselect();
		if (!!element) {
			element.id = this.selectedID;
			if (!this.elementIsScrolledIntoView(element)) {
				element.scrollIntoView();
			}
		}
	},

	collapseElement: function(element) {
		if (!element) {
			return;
		}

		element.classList.add(this.collapsedClass);
	},
	expandElement: function(element) {
		if (!element) {
			return;
		}

		element.classList.remove(this.collapsedClass);
	},

	elementIsScrolledIntoView: function(element) {
	    var top = element.getBoundingClientRect().top;
	    var bottom = element.getBoundingClientRect().bottom;
	    var isVisible = (top >= 0) && (bottom <= window.innerHeight);
	    return isVisible;
	},


	// Beep if there's nothing to do

	nothingToFollow: function() {
		this.beep("Nothing to follow");
	},

	nothingToSelect: function() {
		this.beep("Nothing to select");
	},

	nothingToCollapse: function() {
		this.beep("Nothing to collapse");
	},

	nothingToExpand: function() {
		this.beep("Nothing to expand");
	},

	beep: function(message) {
		// TODO Beep or visual bell
		console.log(message);
	}
};
