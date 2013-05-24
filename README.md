ninjaSwipe-plugin
=================

Plugin to detect scroll direction


Example usage
-----------------
<!-- language: lang-none -->
$('#ID').ninjaSwipe({
    deltaMove : 30,
    deltaSwipe : $(document).height() / 2,
    moveLeft : movefunction,
    moveRight : movefunction,
    swipeLeft : swipefunction,
    swipeRight : swipefunction
});
