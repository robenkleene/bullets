var Bullets = {
	// Constants

	NEXT_OFFSET: 1,
	PREVIOUS_OFFSET: -1,


	// Properties

	rootElement: document,
	selectedClass: 'bullets-selected',
	collapsedClass: 'bullets-collapsed',
	headerTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	hierarchicalTags: ['li'],
  followTags: ['a'],
  get selectTags() {
    return this.headerTags.concat(this.hierarchicalTags);
  },
  get selectedNodes() {
    return this.rootElement.getElementsByClassName(this.selectedClass);
	},


	// Public

	selectNext: function() {
		this.selectAtOffset(this.NEXT_OFFSET);
	},
	selectPrevious: function() {
		this.selectAtOffset(this.PREVIOUS_OFFSET);
	},
	deselectElement: function(element) {
		if (!!element) {
			element.classList.remove(this.selectedClass);
		}
	},
	deselectAll: function() {
		var nodeList = this.selectedNodes;
		for (var i = nodeList.length - 1; i >= 0; --i) {
			var element = nodeList[i];
			element.classList.remove(this.selectedClass);
		}
	},
	toggleCollapseSelection: function() {
		var nodeList = this.selectedNodes;
		if (nodeList.length < 1) {
			this.nothingToCollapse();
			return;
		}

		for (var i = nodeList.length - 1; i >= 0; --i) {
			var element = nodeList[i];
			if(this.elementIsCollapsed(element)) {
				this.expandElement(element);
			} else {
				this.collapseElement(element);
			}
		}

	},
	collapseSelection: function() {
		var nodeList = this.selectedNodes;
		var elementsToCollapse = Array.prototype.filter.call(nodeList, function(node) {
			return !this.elementIsCollapsed(node);
		}.bind(this));

		if (elementsToCollapse.length < 1) {
			this.nothingToCollapse();
			return;
		}

		for (var i = 0; i < elementsToCollapse.length; i++) {
			var element = elementsToCollapse[i];
			this.collapseElement(element);
		}
	},

	expandSelection: function() {
		var nodeList = this.selectedNodes;
		var elementsToExpand = Array.prototype.filter.call(nodeList, function(node) {
			return this.elementIsCollapsed(node);
		}.bind(this));

		if (elementsToExpand.length < 1) {
			this.nothingToExpand();
			return;
		}

		for (var i = 0; i < elementsToExpand.length; i++) {
			var element = elementsToExpand[i];
			this.expandElement(element);
		}
	},

	expandAll: function() {
		var nodeList = this.rootElement.getElementsByClassName(this.collapsedClass);
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
		var tagsNodeList = this.rootElement.querySelectorAll(this.selectTags);
		if (tagsNodeList.length < 1) {
			return;
		}

		var selectedNodeList = this.selectedNodes;
		if (selectedNodeList.length < 1) {
			// No selected element, return first or last element
			var firstOrLastElement = offset > 0 ? tagsNodeList[0] : tagsNodeList[tagsNodeList.length - 1];
			return firstOrLastElement;
		}

		var lastSelectedElement = selectedNodeList[selectedNodeList.length - 1];

		var indexToSelect = Array.prototype.indexOf.call(tagsNodeList, lastSelectedElement) + offset;
		if (indexToSelect < 0 || indexToSelect >= tagsNodeList.length) {
			// Ignore out of bounds indexes
			return;
		}

		var elementToSelect = tagsNodeList[indexToSelect];
		return elementToSelect;
	},

	findVisibleElementFromElement: function (element, backwards) {
		if (element == this.rootElement) {
			return null;
		}

	  if (this.elementIsVisible(element)) {
			return element;
		}

		if (this.elementIsVisible(element.parentNode)) {
			var nodeList = element.parentNode.querySelectorAll(this.selectTags);

			var increment = backwards ? -1 : 1;
			var nextIndex = Array.prototype.indexOf.call(nodeList, element) + increment;
			if (nextIndex < nodeList.length) {
				var nextElement = nodeList[nextIndex];
				return this.findVisibleElementFromElement(nextElement, backwards);
			}
		}

		return this.findVisibleElementFromElement(element.parentNode, backwards);
	},

	elementIsVisible: function(element) {
	    return element.offsetParent !== null;
	},

	followSelection: function() {
		var nodeList = this.selectedNodes;
		if (nodeList.length < 1) {
			this.nothingToFollow();
			return;
		}

		for (var i = nodeList.length - 1; i >= 0; --i) {
			var element = nodeList[i];
			var followTagsNodeList = element.querySelectorAll(this.followTags);
			for (var j = 0; j < followTagsNodeList.length; j++) {
				var followTag = followTagsNodeList[j];
				if (followTag.hasAttribute('href')) {
					var address = followTag.getAttribute('href');
					this.redirect(address);
					return;
				}
			}
		}

		this.nothingToFollow();
		return;
	},

	redirect: function(address) {
		window.location = address;
	},

	selectElement: function(element) {
		this.deselectAll();
		if (!!element) {
  		element.classList.add(this.selectedClass);
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
