var Bullets = {
	// Constants

	NEXT_OFFSET: 1,
	PREVIOUS_OFFSET: -1,


	// Properties

	rootElement: document,
	selectedClass: 'bullets-selected',
	collapsedClass: 'bullets-collapsed',
	headerTags: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
	hierarchicalTags: ['LI'],
  followTags: ['A'],
  get selectTags() {
    return this.headerTags.concat(this.hierarchicalTags);
  },
  get selectedNodes() {
    return this.rootElement.getElementsByClassName(this.selectedClass);
	},


	// Public

	selectNext: function() {
	  // var elementToSelect = this.nextVisibleSelectableElement();
		// if (!elementToSelect) {
		// 	this.nothingToSelect();
		// 	return;
		// }
		// this.selectElement(elementToSelect);
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



// TODO DEPRECATED Delete when new selection logic is in place
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
// TODO DEPRECATED Delete when new selection logic is in place



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

	// Selection

	nextVisibleSelectableElement: function() {
		var selectedNodeList = this.selectedNodes;
		if (selectedNodeList.length < 1) {
			// If nothing it selected return the first selectable element or null
			var firstSelectTagNodeList = this.rootElement.querySelectorAll(this.selectTags);
			if (firstSelectTagNodeList.length > 0) {
				return firstSelectTagNodeList[0];
			}
			return null;
		}

		// Get the last selected node
		var selectedElement = selectedNodeList[selectedNodeList.length - 1];
		if (!this.elementIsCollapsed(selectedElement)) {
			return this.nextSelectableElement(selectedElement);
		}

		var tagName = selectedElement.tagName;

		// If it's a header tag, jump to the next higher precendence header
		var headerIndex	= this.headerTags.indexOf(tagName);
		if (headerIndex >= 0) {
			var equalOrHigherPrecedenceHeaderTags = this.headerTags.slice(0, headerIndex + 1);
			var equalOrHigherPrecedenceHeaderNodeList = this.rootElement.querySelectorAll(equalOrHigherPrecedenceHeaderTags);
			return this.elementAtOffsetInNodeList(selectedElement, this.NEXT_OFFSET, equalOrHigherPrecedenceHeaderNodeList);
		}

		if (this.hierarchicalTags.indexOf(tagName) >= 0) {
			var childSelectableNodeList = selectedElement.querySelectorAll(this.selectTags);

			var lastCollapsedElement = childSelectableNodeList.length > 0 ? childSelectableNodeList[childSelectableNodeList.length -1] : selectedElement;

			var selectTagNodeList = this.rootElement.querySelectorAll(this.selectTags);
			return this.elementAtOffsetInNodeList(lastCollapsedElement, this.NEXT_OFFSET, selectTagNodeList);
		}
		return null;
	},

	previousVisibleSelectableElement: function() {
		// TODO Implement
	},

	nextSelectableElement: function(element) {
		var nodeList = this.rootElement.querySelectorAll(this.selectTags);
		return this.elementAtOffsetInNodeList(element, this.NEXT_OFFSET, nodeList);
	},

	previousSelectableElement: function(element) {
		var nodeList = this.rootElement.querySelectorAll(this.selectTags);
		return this.elementAtOffsetInNodeList(element, this.PREVIOUS_OFFSET, nodeList);
	},

	elementAtOffsetInNodeList: function(element, offset, nodeList) {
		if (nodeList.length < 1) {
			return null;
		}

		var index = Array.prototype.indexOf.call(nodeList, element);
		var offsetIndex = index + offset;
		if (offsetIndex < 0 || offsetIndex >= nodeList.length) {
			return null;
		}

		return nodeList[offsetIndex];
	},

	// elementIsHeader: function(element) {
	// 	var tagName = element.tagName;
	// 	return this.headerTags.indexOf(needle) >= 0;
	// },

	elementIsVisible: function(element) {
		if (!element) {
			return false;
		}
		return element.offsetParent !== null;
	},


	// nextEqualOrHigherPrecendenceSiblingOfHeader: function(headerElement) {
	// 	var headerTagName =
	// },

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
