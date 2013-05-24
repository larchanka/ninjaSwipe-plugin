ninjaSwipe-plugin
=================

Plugin to detect scroll direction


Example usage
-----------------

Jquery 1.10.0 used


    $('#ID').ninjaSwipe({
        deltaMove : 30,
        deltaSwipe : $(document).height() / 2,
        moveLeft : movefunction,
        moveRight : movefunction,
        swipeLeft : swipefunction,
        swipeRight : swipefunction,
        moveUp : movefunction2,
        moveDown : movefunction2,
        swipeUp : swipefunction2,
        swipeDown : swipefunction2
    });
