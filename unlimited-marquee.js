/***********************************************************
	The function unlimitedMarquee takes in a jquery object
	to scroll.
	
	-Vinny Laurenzano

/***********************************************************/

 function unlimitedMarquee(divToScroll){

        var scrollHeight = divToScroll.height();
        var parentDiv = divToScroll.parent();
        var scrollRemaining = scrollHeight - parentDiv.scrollTop();
        var speedConstant = 20;
        var speed = scrollRemaining * speedConstant;
        var divTwo = divToScroll.clone().appendTo(parentDiv);

        parentDiv.hover(
            function(){$(this).stop()} ,
            function(){
                var newSpeed = scrollHeight - $(this).scrollTop();
                newSpeed *= speedConstant;
                startScroll(newSpeed);
                });
        startScroll(speed);

    function startScroll(scrollSpeed){
			parentDiv.animate({
			scrollTop: scrollHeight
			}, scrollSpeed , 'linear', function() {

			parentDiv.children('div').eq(0).appendTo(parentDiv);
			parentDiv.scrollTop(0);

			startScroll(speed);
			});
        }
    }