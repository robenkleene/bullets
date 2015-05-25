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
		var elementToSelect = this.visibleSelectableElementFromOffset(this.NEXT_OFFSET);
		if (!elementToSelect) {
			this.nothingToSelect();
			return;
		}
		this.selectElement(elementToSelect);
	},
	selectPrevious: function() {
		// var elementToSelect = this.previousVisibleSelectableElement();
		var elementToSelect = this.visibleSelectableElementFromOffset(this.PREVIOUS_OFFSET);
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

	visibleSelectableElementFromOffset: function(offset) {
		var selectedNodeList = this.selectedNodes;
		var selectedElement;

		if (selectedNodeList.length < 1) {
			var selectableNodeList = this.rootElement.querySelectorAll(this.selectTags);
			if (selectableNodeList.length < 1) {
				// No selectable nodes
				return null;
			}

			var selectableIndex = offset > 0 ? 0 : selectableNodeList.length - 1;
			selectedElement = selectableNodeList[selectableIndex];
			if (this.elementIsVisible(selectedElement)) {
				// If there's no existing selection return the first or last element if it's visible
				return selectedElement;
			}
		}

		var selectedIndex = offset > 0 ? 0 : selectedNodeList.length - 1;
		selectedElement = selectedNodeList[selectedIndex];

		if (offset < 0) {
			return this.findPreviousVisibleSelectableElement(selectedElement);
		} else {
			return this.findNextVisibleSelectableElement(selectedElement);
		}
	},

	// Next

	findNextVisibleSelectableElement: function(element) {
		var offset = this.NEXT_OFFSET;
		var nextVisibleSibling = this.visibleSibling(element, offset);
		if (!!nextVisibleSibling) {
			if (this.elementIsSelectable(nextVisibleSibling)) {
				return nextVisibleSibling;
			}

			var nextElement = this.selectableDescendant(nextVisibleSibling, offset);

			if (!!nextElement) {
				if (this.elementIsVisible(nextElement)) {
					return nextElement;
				}
			} else {
				nextElement = nextVisibleSibling;
			}
			return this.findNextVisibleSelectableElement(nextElement);
		}


		if (element.parentNode == this.rootElement) {
			// If there are no previous visible siblings, and the parent is the root node
			// then there's nothing to select.
			// This should really never happen because the first child of the root node
			// should never be hidden, but this can prevent infinite loops in buggy conditions
			return null;
		}

		var ancestorSiblingWithVisibleParent = this.ancestorSiblingWithVisibleParent(element);
		if (!!ancestorSiblingWithVisibleParent) {

			if (this.elementIsVisibleSelectable(ancestorSiblingWithVisibleParent)) {
				return ancestorSiblingWithVisibleParent;
			}

			var selectableDescendant = this.selectableDescendant(ancestorSiblingWithVisibleParent, offset);
			if (!!selectableDescendant && this.elementIsVisible(selectableDescendant)) {
				return selectableDescendant;
			}

			return this.findNextVisibleSelectableElement(ancestorSiblingWithVisibleParent);
		}

		return null;
	},

	// Previous

	findPreviousVisibleSelectableElement: function(element) {
		var offset = this.PREVIOUS_OFFSET;
		var previousVisibleSibling = this.visibleSibling(element, offset);

		if (!!previousVisibleSibling) {
			var previousElement = this.selectableDescendant(previousVisibleSibling, offset);

			if (!!previousElement) {
				if (this.elementIsVisible(previousElement)) {
					return previousElement;
				}
			} else {
				if (this.elementIsSelectable(previousVisibleSibling)) {
					return previousVisibleSibling;
				}
				previousElement = previousVisibleSibling;
			}

			return this.findPreviousVisibleSelectableElement(previousElement);
		}

		if (element.parentNode == this.rootElement) {
			// If there are no previous visible siblings, and the parent is the root node
			// then there's nothing to select.
			// This should really never happen because the first child of the root node
			// should never be hidden, but this can prevent infinite loops in buggy conditions
			return null;
		}

		var ancestorWithVisibleParent = this.ancestorWithVisibleParent(element);
		if (!!ancestorWithVisibleParent) {
			if (this.elementIsVisibleSelectable(ancestorWithVisibleParent)) {
				return ancestorWithVisibleParent;
			}

			return this.findPreviousVisibleSelectableElement(ancestorWithVisibleParent);
		}

		return null;
	},

	// Next & Previous

	ancestorSiblingWithVisibleParent: function(element) {
		while(element.parentNode) {

			if (element.parentNode == this.rootElement) {
				return null;
			}

			element = element.parentNode;

			if (this.elementIsVisible(element.parentNode)) {
				var sibling = element.nextElementSibling;
				if (!!sibling) {
					return sibling;
				}
			}
		}

		return null;
	},

	ancestorWithVisibleParent: function(element) {
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

	visibleSibling: function(element, offset) {
		var sibling = offset > 0 ? 'nextElementSibling' : 'previousElementSibling';

		while(element[sibling]) {
			element = element[sibling];

			if (this.elementIsVisible(element)) {
				return element;
			}
		}

		return null;
	},

	selectableDescendant: function(element, offset) {
		var selectableDescendants = element.querySelectorAll(this.selectTags);

		if (selectableDescendants.length < 1) {
			return null;
		}

		var index = offset > 0 ? 0 : selectableDescendants.length - 1;
		return selectableDescendants[index];
	},


	// TODO Refactor

	findVisibleSelectableElement: function(element, offset) {
console.log("element = " + element);
console.log("element.outerHTML = " + element.outerHTML);

		// Check the siblings
		// Go to the next ancestors sibling
		var visibleSelectableElement = this.visibleSelectableSiblingOrSiblingsDescendant(element, offset);
		if (!!visibleSelectableElement) {
			return visibleSelectableElement;
		}

		if (element.parentNode == this.rootElement) {
			// If there are no visible siblings, and the parent is the root node
			// then there's nothing to select.
			// This should really never happen because the first child of the root node
			// always be visible and selectable, but this can prevent infinite loops caused by bugs.
			return null;
		}

		var ancestorsSiblingWithVisibleParent = this.ancestorsSiblingWithVisibleParent(element, offset);

		if (offset > 0) {
			visibleSelectableElement = this.visibleSelectableElementOrDescendant(ancestorsSiblingWithVisibleParent, offset);
			if (!!visibleSelectableElement) {
				return visibleSelectableElement;
			}


		} else {
			if (this.elementIsSelectable(ancestorsSiblingWithVisibleParent)) {
				return ancestorsSiblingWithVisibleParent;
			}
		}



		return this.findVisibleSelectableElement(ancestorsSiblingWithVisibleParent, offset);
	},

	visibleSelectableSiblingOrSiblingsDescendant: function(element, offset) {

		var siblingProperty = offset > 0 ? 'nextElementSibling' : 'previousElementSibling';

		var sibling = element;
		while(sibling[siblingProperty]) {
			sibling = sibling[siblingProperty];
			if (this.elementIsVisible(sibling)) {
				// If the offset is negative, than the visible element is the last selectable
				// descendant of the element.
				var visibleSelectableElement = this.visibleSelectableElementOrDescendant(sibling, offset);
				if (!!visibleSelectableElement) {
					return visibleSelectableElement;
				}
			}
		}

		return null;
	},

	visibleSelectableElementOrDescendant: function(element, offset) {
		if (offset > 0) {
			return this.firstVisibleSelectableDescendantOrElement(element);
		} else {
			return this.lastVisibleSelectableDescendantOrElement(element);
		}
	},

	firstVisibleSelectableDescendantOrElement: function(element) {
		if (this.elementIsSelectable(element)) {
			return element;
		}
		var selectableDescendants = element.querySelectorAll(this.selectTags);
		if (selectableDescendants.length < 1) {
			return null;
		}

		var selectableDescendant = selectableDescendants[0];
		if (this.elementIsVisible(selectableDescendant)) {
			return selectableDescendant;
		}
		return null;
	},

	lastVisibleSelectableDescendantOrElement: function(element) {

		var selectableDescendants = element.querySelectorAll(this.selectTags);
		if (selectableDescendants.length < 1) {
			if (this.elementIsSelectable(element)) {
				return element;
			}
			return null;
		}

		var lastSelectableDescendant = selectableDescendants[selectableDescendants.length - 1];
		if (this.elementIsVisible(lastSelectableDescendant)) {
			return lastSelectableDescendant;
		}

		var ancestor = lastSelectableDescendant;
		while(ancestor.parentNode) {
			if (ancestor.parentNode == element) {
				return null;
			}

			ancestor = ancestor.parentNode;

			if (this.elementIsVisible(ancestor)) {
				var firstVisibleSelectableDescendant = this.firstVisibleSelectableDescendantOrElement(ancestor);
				if (!!firstVisibleSelectableDescendant) {
					return firstVisibleSelectableDescendant;
				}
			}
		}

		return null;
	},

	ancestorsSiblingWithVisibleParent: function(element, offset) {
		while(element.parentNode) {
			if (element.parentNode == this.rootElement) {
				return element;
			}

			element = element.parentNode;

			if (this.elementIsVisible(element.parentNode)) {
				var sibling = offset > 0 ? element.nextElementSibling : element.previousElementSibling;
				if (!!sibling) {
					return sibling;
				}
			}
		}

		return null;
	},





	// Next

	// nextVisibleSelectableElement: function() {
	// 	var selectedNodeList = this.selectedNodes;
	// 	if (selectedNodeList.length < 1) {
	// 		// If nothing it selected return the first selectable element or null
	// 		// By definition the first selectable node is always visible
	// 		var firstSelectTagNodeList = this.rootElement.querySelectorAll(this.selectTags);
	// 		if (firstSelectTagNodeList.length > 0) {
	// 			return firstSelectTagNodeList[0];
	// 		}
	// 		return null;
	// 	}
	//
	// 	// Get the last selected node
	// 	var selectedElement = selectedNodeList[selectedNodeList.length - 1];
	// 	if (!this.elementIsCollapsed(selectedElement)) {
	// 		return this.nextSelectableElement(selectedElement);
	// 	}
	//
	// 	var tagName = selectedElement.tagName;
	//
	// 	// If it's a header tag, jump to the next higher precendence header
	// 	var headerIndex	= this.headerTags.indexOf(tagName);
	// 	if (headerIndex >= 0) {
	// 		var equalOrHigherPrecedenceHeaderTags = this.headerTags.slice(0, headerIndex + 1);
	// 		var equalOrHigherPrecedenceHeaderSiblingNodeList = selectedElement.parentNode.querySelectorAll(equalOrHigherPrecedenceHeaderTags);
	// 		var nextHeaderNode = this.elementAtOffsetInNodeList(selectedElement, this.NEXT_OFFSET, equalOrHigherPrecedenceHeaderSiblingNodeList);
	// 		if (!!nextHeaderNode) {
	// 			return nextHeaderNode;
	// 		}
	//
	// 		// In this case we have to select the next selectable node after the last child node of the parent
	// 		return this.nextSelectableElementAfterLastSelectableChildElement(selectedElement.parentNode);
	// 	}
	//
	// 	if (this.hierarchicalTags.indexOf(tagName) >= 0) {
	// 		return this.nextSelectableElementAfterLastSelectableChildElement(selectedElement);
	// 	}
	// 	return null;
	// },
	//
	// nextSelectableElementAfterLastSelectableChildElement: function(element) {
	// 	var lastSelectableChildElement = this.lastSelectableChildElement(element);
	//
	// 	if (!lastSelectableChildElement) {
	// 		lastSelectableChildElement = element;
	// 	}
	//
	// 	var selectTagNodeList = this.rootElement.querySelectorAll(this.selectTags);
	// 	return this.elementAtOffsetInNodeList(lastSelectableChildElement, this.NEXT_OFFSET, selectTagNodeList);
	// },
	//
	// nextSelectableElement: function(element) {
	// 	var nodeList = this.rootElement.querySelectorAll(this.selectTags);
	// 	return this.elementAtOffsetInNodeList(element, this.NEXT_OFFSET, nodeList);
	// },
	//
	// // Previous
	//
	// previousVisibleSelectableElement: function() {
	//
	// 	var selectedNodeList = this.selectedNodes;
	// 	var selectableNodeList = this.rootElement.querySelectorAll(this.selectTags);
	// 	var selectedElement;
	//
	// 	if (selectedNodeList.length < 1) {
	// 		if (selectableNodeList.length > 0) {
	// 			selectedElement = selectableNodeList[selectableNodeList.length - 1];
	// 			if (this.elementIsVisible(selectedElement)) {
	// 				// If there was no selection, and the last element is visible
	// 				// Then that's the target selection
	// 				return selectedElement;
	// 			}
	// 		} else {
	// 			// No selectable elements exist
	// 			return null;
	// 		}
	// 	} else {
	// 		selectedElement = selectedNodeList[0];
	// 	}
	//
	// 	var previousSelectableElement = this.elementAtOffsetInNodeList(selectedElement, this.PREVIOUS_OFFSET, selectableNodeList);
	// 	if (!previousSelectableElement) {
	// 		// If there's no previous element, this is the top element
	// 		return null;
	// 	}
	//
	// 	return this.findPreviousVisibleSelectableElement(previousSelectableElement);
	// },

	// findPreviousVisibleSelectableElement: function(element) {
	// 	if (this.elementIsVisibleSelectable(element)) {
	// 		return element;
	// 	}
	//
	// 	var previousVisibleSibling = this.previousVisibleSibling(element);
	//
	// 	if (!!previousVisibleSibling) {
	// 		var lastSelectableChildElement = this.lastSelectableChildElement(previousVisibleSibling);
	//
	// 		if (!lastSelectableChildElement) {
	// 			lastSelectableChildElement = previousVisibleSibling;
	// 		}
	//
	// 		return this.findPreviousVisibleSelectableElement(lastSelectableChildElement);
	// 	} else if (element.parentNode == this.rootElement) {
	// 		// If there are no previous visible siblings, and the parent is the root node
	// 		// then there's nothing to select.
	// 		// This should really never happen because the first child of the root node
	// 		// should never be hidden, but this can prevent infinite loops in buggy conditions
	// 		return null;
	// 	}
	//
	// 	var ancestorWithVisibleParentOrTopLevelElement = this.ancestorWithVisibleParentOrTopLevelElement(element);
	//
	// 	return this.findPreviousVisibleSelectableElement(ancestorWithVisibleParentOrTopLevelElement);
	// },

	// ancestorWithVisibleParentOrTopLevelElement: function(element) {
	// 	while(element.parentNode) {
	// 		if (element.parentNode == this.rootElement) {
	// 			return element;
	// 		}
	//
	// 		element = element.parentNode;
	//
	// 		if (this.elementIsVisible(element.parentNode)) {
	// 			return element;
	// 		}
	// 	}
	//
	// 	return null;
	// },
	//
	// ancestorVisibleSiblintOrTopLevelElement: function(element) {
	// 	while(element.parentNode) {
	// 		if (element.parentNode == this.rootElement) {
	// 			return element;
	// 		}
	//
	// 		element = element.parentNode;
	//
	//
	//
	// 		// Need to traverse all the siblings here
	//
	// 		// if (this.elementIsVisible(element.parentNode)) {
	// 		// 	return element;
	// 		// }
	// 	}
	//
	// 	return null;
	// },
	//
	// previousVisibleSibling: function(element) {
	// 	while(element.previousElementSibling) {
	// 		element = element.previousElementSibling;
	//
	// 		if (this.elementIsVisible(element)) {
	// 			return element;
	// 		}
	// 	}
	//
	// 	return null;
	// },

	// elementAtOffsetInNodeList: function(element, offset, nodeList) {
	// 	if (nodeList.length < 1) {
	// 		return null;
	// 	}
	//
	// 	var index = Array.prototype.indexOf.call(nodeList, element);
	// 	var offsetIndex = index + offset;
	// 	if (offsetIndex < 0 || offsetIndex >= nodeList.length) {
	// 		return null;
	// 	}
	//
	// 	return nodeList[offsetIndex];
	// },

	// lastSelectableChildElement: function(element) {
	// 	var selectableChildNodeList = element.querySelectorAll(this.selectTags);
	//
	// 	if (selectableChildNodeList.length < 1) {
	// 		return null;
	// 	}
	//
	// 	return selectableChildNodeList[selectableChildNodeList.length - 1];
	// },

	// Next & Previous Selection

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


	elementIsVisible: function(element) {
		if (!element) {
			return false;
		}
		return element.offsetParent !== null;
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
