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
	spotify.search({ type: 'track', query: item }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	console.log(data); 
	});
}