/***********************************************************
	This script grabs a youtube chanel and displays it's videos. 
	
	-Vinny Laurenzano

/***********************************************************/

$(document).ready(function () 
	{
		
		//get the channel data here and send off to process data
		userName = 'mlcvbnewjersey';				
		$.getScript("http://gdata.youtube.com/feeds/base/users/" + userName  + "/uploads?alt=json-in-script&callback=processData");
																		
		//bind mouse hover to control scrolling logic 					
		$('#outer_box').mousemove(function(e){move(e)});
		
		//handle cick event for images
		$("#thumb_box img").live('click', function() {
								
			if ( ! $(this).hasClass('current') )
		
			handleClick($(this));
									
		});										
							
	});
							
	function handleClick(clickedThumb)
	{
		//change red border then set video
		$('#thumb_box .current').toggleClass('current');
		clickedThumb.toggleClass('current');
		setVid(clickedThumb.attr('id'));
								
	}
							
	function setVid(vUrl)
	{							
		// set the source of the iframe url
		var embedUrl = "http://www.youtube.com/embed/" + vUrl; 						
		$('#m_video').attr('src', embedUrl);
							
	}
	
	function move(e)
	{
		//handle logic for the thumbnail scrolling
		oWidth = $('#outer_box').width();
		iWidth = $('#thumb_box').width();
											
		var left = (e.pageX - $('#outer_box').offset().left) * (iWidth-oWidth) / oWidth;
		$('#outer_box').scrollLeft(left);
							
	}
							
							
	function processData(data)
	{
		var vidUrls = new Array(); 
		var j = 0;
		//loop through data, pull out video id and add it to vidUrls array. videoId is the unique part, eq youtube.com/video/watch/thisistheuniquepart
		$.each(data.feed.entry, function(i,e)
		{
			var parts = e.id.$t.split('/');
			var videoId = parts[parts.length-1];
			vidUrls[j] = videoId;
			j++;
		});
	
		var thumbNailUrl;	
		
		var rand_no = Math.floor((vidUrls.length)*Math.random());
		
		setVid(vidUrls[rand_no]);
		var thumbs = "";
		// get urls for thumbnails
		for (i=0; i < vidUrls.length ; i++)
		{
			thumbNailUrl = "http://img.youtube.com/vi/" + vidUrls[i] + "/1.jpg";
			
			if (i != rand_no)
			{
			thumbs += '<img src="' + thumbNailUrl + '" id="' + vidUrls[i] + '" />';
			}
			else
			{
			thumbs += '<img src="' + thumbNailUrl + '" id="' + vidUrls[i] + '" class="current" />';
			}
			
		}
		
		//append thumbnails and set width of inner thumbnail box. 
		minwidth =vidUrls.length * 140;
		$('#thumb_box').append(thumbs).css('min-width' , minwidth + 'px');
			
	}
	
/********************************************************************
**********************REQUIRED MARKUP********************************
********************************************************************/	
<div id="video_container" >
							
	<iframe id="m_video" width="425" height="349" frameborder="0" allowfullscreen></iframe>
	
	<div id ="outer_box">
		<div id ="thumb_box">
		
		</div>
	</div>
</div>
