// Pulls in the NPMS required:
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
// keys:
// Twitter:
var client = new Twitter({
  consumer_key: '1MWj9qHbXQSBoajIYsByw9nKU',
  consumer_secret: '0mHg5DTQ3rgOEUThabHE2A4nPoLihVVriLbIfBEpe2ftRoLIAh',
  access_token_key: '876496954456383488-iqhfAbGXryQqxOZ9oXEMEOOseoc7cO2',
  access_token_secret: 'iaLZr8bRp4X3KBEFjlG1ZHfGTyxXKQlyqGnmRvM4ox9jh'
});
// Spotify:
var spotify = new Spotify({
	id: "3744b9af059d466096c9e3b23ca31506",
	secret: "481386b4a57c4075a7d998263d7b03b6"
});
// sets the command and queries to entries in command line:
var cmd = process.argv[2];
var item = process.argv.slice(3);

// function that displays the movie, and if no movie is stated displays Mr Nobody:
function movieThis(item) {
	if (item == "") {
		// console.log("Item equals: " + item);
		request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				movieDisplay(body);
				console.log("mr nobody?");
			}
		});
	} else {
			// console.log("Item equals: " + item);
		request("http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				movieDisplay(body);
			}
		});
	}
}

// function to console log movie info chosen from above:
function movieDisplay(body){
	console.log(JSON.parse(body).Title);
	console.log("Released: " + JSON.parse(body).Released);
	console.log("IMDB Score: " + JSON.parse(body).imdbRating);
	console.log("Country Produced In: " + JSON.parse(body).Country);
	console.log("Original Language: " + JSON.parse(body).Language);
	console.log("Plot Summary: " + JSON.parse(body).Plot);
	console.log("Starring: " + JSON.parse(body).Actors);
	console.log("Website: " + JSON.parse(body).Website);
	fs.appendFile("log.txt", "<---NEW OBJECT---> " + JSON.parse(body).Title + JSON.parse(body).Released + JSON.parse(body).imdbRating + JSON.parse(body).imdbRating + JSON.parse(body).Country 
		+ JSON.parse(body).Language  + JSON.parse(body).Plot + JSON.parse(body).Actors + JSON.parse(body).Website, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

// function that pulls my feed from twitter:
function tweetPull() {
	client.get('statuses/user_timeline.json?screen_name=PaulPostsTweets&count=20', function(error, tweets, response) {
		if (error) {
			console.log(error);
		}
		// Prints the text property of each of tweets pulled:
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text);
		}
	});
}

// function that runs when spotify is entered:
function spotifyThis(item) {
	spotify.search({
	type: 'track',
	query: item,
	limit: 1
	 }).then(function(response) {
		console.log("Title: " +  response.tracks.items[0].name)
		console.log("Artist: " + response.tracks.items[0].artists[0].name);
		console.log("Album: " + response.tracks.items[0].album.name);
		console.log("Preview link: " + response.tracks.items[0].preview_url);
		});
}


// if-else statement that walks through what to do with each input:
function CommandTree(cmd, item) {
	if (cmd === "spotify-this-song") {
		spotifyThis(item);
	}
	// Displays movie info:
	if (cmd === "movie-this") {
		movieThis(item);
	}

	// Fetch Tweets:
	if (cmd === "my-tweets") {
		tweetPull();
	}
	// runs the random function:
	if (cmd === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(error, data) {
		  // If the code experiences any errors it will log the error to the console.
		  if (error) {
		    return console.log(error);
		  }
		  // Splits the response pulled from the file into an array:
		  var dataArr = data.split(",");
		  // Takes the split values at the index and passes them through the CommandTree:
		  if (dataArr[0] === "spotify-this-song") {
		  	spotifyThis(dataArr[1]);
		  } else if (dataArr[0] === "movie-this") {
		  	movieThis(dataArr[1]);
		  } else if (dataArr[0] === "my-tweets") {
		  	tweetPull();
		  } else {
		  	console.log("uh oh something went wrong, try again");
		  }
		});
	}
}

// runs the command tree line when the program initializes:
CommandTree(cmd, item);
