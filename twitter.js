
/***********************************************************
	This functiong getTwit() get's the last twit of the
	designated user. To get more than one twit replace
	count=1 in api call with desired amount. Requires Jquery.
	
	-Vinny Laurenzano

/***********************************************************/


function getTwit()
{	
	var twitterName = "mlcvb";
	
	var url='http://api.twitter.com/1/statuses/user_timeline/' + twitterName + '.json?count=1&include_entities=1&callback=?';

	$.getJSON(url,function(tweet){ // get the tweets
		
		console.log(tweet);
		
		tweetText = tweet[0].text;
		
		for(i = 0; i <  tweet[0].entities.urls.length; i++)
		{
			console.log(tweet[0].entities.urls[i].url);
			tweetText = tweetText.replace(tweet[0].entities.urls[i].url, '<a href=' + tweet[0].entities.urls[i].url + ' target="_blank" >'  + tweet[0].entities.urls[i].url + '</a>');
		}
				
		$("#twitter_feed").html(tweetText); 
	});
}
