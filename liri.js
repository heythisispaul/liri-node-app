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
var myTweets = "PaulPostsTweets";
// Spotify:
var spotify = new Spotify({
	id: "3744b9af059d466096c9e3b23ca31506",
	secret: "481386b4a57c4075a7d998263d7b03b6"
});
// sets the command and queries to entries in command line:
var cmd = process.argv[2];
var item = process.argv.slice(3);

// If else tree with commands:
// Spotify:
if (cmd === "spotify-this-song") {
	spotify.search({
	type: 'track',
	query: item,
	limit: 1
	 }).then(function(response) {
	 	console.log(item);
		console.log("Title: " +  response.tracks.items[0].name)
		console.log("Artist: " + response.tracks.items[0].artists[0].name);
		console.log("Album: " + response.tracks.items[0].album.name);
		console.log("Preview link: " + response.tracks.items[0].preview_url);
		});
}

// function to console log movie info:
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

// Displays movie info:
if (cmd === "movie-this" && item != undefined) {
	request("http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			movieDisplay(body);
		}
	});
// If a movie is not entered displays Mr Nobody:
} else if (cmd === "movie-this") {
	request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			movieDisplay(body);
		}
	});
}

// Fetch Tweets:
if (cmd === "my-tweets") {
	// Pulls tweets by my username and displays the latest 20:
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

if (cmd === "do-what-it-says") {
	fs.readFile("random.txt", "utf-8", function(err, data) {
		if (err) {
			return console.log(err);
		}
	});
}