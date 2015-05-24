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
	  var elementToSelect = this.nextVisibleSelectableElement();
		if (!elementToSelect) {
			this.nothingToSelect();
			return;
		}
		this.selectElement(elementToSelect);
	},
	selectPrevious: function() {
		var elementToSelect = this.previousVisibleSelectableElement();
		if (!elementToSelect) {
			this.nothingToSelect();
			return;
		}
		this.selectElement(elementToSelect);
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

	// Next

	nextVisibleSelectableElement: function() {
		var selectedNodeList = this.selectedNodes;
		if (selectedNodeList.length < 1) {
			// If nothing it selected return the first selectable element or null
			// By definition the first selectable node is always visible
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
			var equalOrHigherPrecedenceHeaderSiblingNodeList = selectedElement.parentNode.querySelectorAll(equalOrHigherPrecedenceHeaderTags);
			var nextHeaderNode = this.elementAtOffsetInNodeList(selectedElement, this.NEXT_OFFSET, equalOrHigherPrecedenceHeaderSiblingNodeList);
			if (!!nextHeaderNode) {
				return nextHeaderNode;
			}

			// In this case we have to select the next selectable node after the last child node of the parent
			return this.nextSelectableElementAfterLastSelectableChildElement(selectedElement.parentNode);
		}

		if (this.hierarchicalTags.indexOf(tagName) >= 0) {
			return this.nextSelectableElementAfterLastSelectableChildElement(selectedElement);
		}
		return null;
	},

	nextSelectableElementAfterLastSelectableChildElement: function(element) {
		var lastSelectableChildElement = this.lastSelectableChildElement(element);

		if (!lastSelectableChildElement) {
			lastSelectableChildElement = element;
		}

		var selectTagNodeList = this.rootElement.querySelectorAll(this.selectTags);
		return this.elementAtOffsetInNodeList(lastSelectableChildElement, this.NEXT_OFFSET, selectTagNodeList);
	},

	nextSelectableElement: function(element) {
		var nodeList = this.rootElement.querySelectorAll(this.selectTags);
		return this.elementAtOffsetInNodeList(element, this.NEXT_OFFSET, nodeList);
	},

	// Previous

	previousVisibleSelectableElement: function() {

		var selectedNodeList = this.selectedNodes;
		var selectableNodeList = this.rootElement.querySelectorAll(this.selectTags);
		var selectedElement;

		if (selectedNodeList.length < 1) {
			if (selectableNodeList.length > 0) {
				selectedElement = selectableNodeList[selectableNodeList.length - 1];
				if (this.elementIsVisible(selectedElement)) {
					// If there was no selection, and the last element is visible
					// Then that's the target selection
					return selectedElement;
				}
			} else {
				// No selectable elements exist
				return null;
			}
		} else {
			selectedElement = selectedNodeList[0];
		}

		var previousSelectableElement = this.elementAtOffsetInNodeList(selectedElement, this.PREVIOUS_OFFSET, selectableNodeList);
		if (!previousSelectableElement) {
			// If there's no previous element, this is the top element
			return null;
		}

		return this.findPreviousVisibleSelectableElement(previousSelectableElement);
	},

	findPreviousVisibleSelectableElement: function(element) {
		if (this.elementIsVisibleSelectable(element)) {
			return element;
		}

		var previousVisibleSibling = this.previousVisibleSibling(element);

		if (!!previousVisibleSibling) {
			var lastSelectableChildElement = this.lastSelectableChildElement(previousVisibleSibling);

			if (!lastSelectableChildElement) {
				lastSelectableChildElement = previousVisibleSibling;
			}

			return this.findPreviousVisibleSelectableElement(lastSelectableChildElement);
		} else if (element.parentNode == this.rootElement) {
			// If there are no previous visible siblings, and the parent is the root node
			// then there's nothing to select.
			// This should really never happen because the first child of the root node
			// should never be hidden, but this can prevent infinite loops in buggy conditions
			return null;
		}

		var firstAncestorWithVisibleParentOrTopLevelElement = this.firstAncestorWithVisibleParentOrTopLevelElement(element);

		return this.findPreviousVisibleSelectableElement(firstAncestorWithVisibleParentOrTopLevelElement);
	},

	firstAncestorWithVisibleParentOrTopLevelElement: function(element) {
		while(element.parentNode) {
			if (element.parentNode == this.rootElement) {
				return element;
			}

			element = element.parentNode;

			if (this.elementIsVisible(element.parentNode)) {
				return element;
			}
		}

		return null;
	},

	previousVisibleSibling: function(element) {
		while(element.previousElementSibling) {
			element = element.previousElementSibling;

			if (this.elementIsVisible(element)) {
				return element;
			}
		}

		return null;
	},

	elementIsVisibleSelectable: function(element) {
		return this.elementIsSelectable(element) && this.elementIsVisible(element);
	},

	elementIsSelectable: function(element) {
		if (element == this.rootElement) {
			return false;
		}
		var tagName = element.tagName;
		return this.selectTags.indexOf(tagName) >= 0;
	},

	// Next & Previous Selection

	elementIsVisible: function(element) {
		if (!element) {
			return false;
		}
		return element.offsetParent !== null;
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

	lastSelectableChildElement: function(element) {
		var selectableChildNodeList = element.querySelectorAll(this.selectTags);

		if (selectableChildNodeList.length < 1) {
			return null;
		}

		return selectableChildNodeList[selectableChildNodeList.length - 1];
	},

	// Nothing to do

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
