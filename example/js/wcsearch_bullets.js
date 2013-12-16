Mousetrap.bind('down', function() {
	Bullets.selectNext();
    return false;
});

Mousetrap.bind('up', function() {
	Bullets.selectPrevious();
    return false;
});