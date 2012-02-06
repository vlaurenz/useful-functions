/***********************************************************
	This functiong getTwit() get's the last twit of the
	designated user. To get more than one twit replace
	count=1 in api call with desired amount. Currently it
	will diplay one url in the link correctly, it would have
	to be modified to display more than one.
	
	-Vinny Laurenzano

/***********************************************************/
function getTwit()
{	
	var twitterName = "mlcvb";
	
	var url='http://api.twitter.com/1/statuses/user_timeline/' + twitterName + '.json?count=1&include_entities=1&callback=?';

	$.getJSON(url,function(tweet){ // get the tweets
		
		console.log(tweet);
		
		startIndex = tweet[0].entities.urls[0].indices[0];
		
		link = '<a href=' + tweet[0].entities.urls[0].expanded_url + ' target="_blank" >' + tweet[0].entities.urls[0].display_url + '</a>';
		
		
		$("#twitter_feed").html(tweet[0].text.substring(0, startIndex) + link); 
	});
}