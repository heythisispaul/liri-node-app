// Pulls in the NPMS required:
var Spotify = require("node-spotify-api");
var twitter = require("twitter");
var request = require("request");
var fs = require("fs");

// keys:
// Twitter:
var consKey = "1MWj9qHbXQSBoajIYsByw9nKU";
var accessToken = "876496954456383488-iqhfAbGXryQqxOZ9oXEMEOOseoc7cO2";
// Spotify:
var spotify = new Spotify({
	id: "3744b9af059d466096c9e3b23ca31506",
	secret: "481386b4a57c4075a7d998263d7b03b6"
});
// sets the command and queries to entries in command line:
var cmd = process.argv[2];
var item = process.argv[3];

// If else tree with commands:
// Spotify:
if (cmd === "spotify-this-song") {
	spotify.search({ type: 'track', query: item }).then(function(response) {
		console.log(response);
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
}

// Dispalys Mr Nobody:
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