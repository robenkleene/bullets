Mousetrap.bind('down', function() {
	Outliner.selectNext();
    return false;
});

Mousetrap.bind('up', function() {
	Outliner.selectPrevious();
    return false;
});