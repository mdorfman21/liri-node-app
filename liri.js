//adding the require statements to get libraries
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
moment().format();

//if they user puts nothing then it gives back an error
if (process.argv.length == 2) {
  return console.log("bad args");
}

//set the operation term to the same element in the array everytime
var operation = process.argv[2];

//initialize the search terms so that I can use this to call the API's
var searchTerms = "";

//for each element after the first 3, make it into a string and add a + sign unless it's the final element in the array
process.argv.forEach((x, index) => {
  if (index > 2 && index == process.argv.length - 1) {
    searchTerms += x;
  } else if (index > 2) {
    searchTerms += x + "+";
  }
});

console.log(searchTerms);
console.log(operation);

//create a switch to have the different operation cases
switch (operation) {
  case "concert-this": {
    //if there is no artist entered return an error
    if (searchTerms === "") {
      return console.log("You need to add an artist!");
    }
    var queryURL =
      "https://rest.bandsintown.com/artists/" +
      searchTerms +
      "/events?app_id=codingbootcamp";

    axios
      .get(queryURL)
      .then(response => {
        console.log(response.data);
        var objectResponse = response.data;
        for (var key in objectResponse) {
          if (objectResponse.hasOwnProperty) {
            console.log(
              "========================================================"
            );
            console.log(
              "The name of the venue is",
              objectResponse[key].venue.name
            );
            console.log(
              "It's located at",
              objectResponse[key].venue.city,
              objectResponse[key].venue.region,
              ",",
              objectResponse[key].venue.country
            );
            console.log(
              "On",
              moment(objectResponse[key].datetime).format("MMM Do YYYY, h:mm a")
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    break;
  }
  case "spotify-this-song": {
    if (searchTerms === "") {
      return console.log("Please enter a song name");
    }
    var songName = searchTerms.split("+").join(" ");
    console.log(songName);
    spotify
      .search({
        type: "track",
        query: songName
      })
      .then(response => {
        var objectResponse = response.tracks.items;
        console.log(response.tracks.items);
        if (objectResponse.length === 0) {
          return console.log("'The Sign' by Ace of Base");
        }
        console.log("The artist is", objectResponse[0].album.artists[0].name);
      })
      .catch(err => {
        console.log(err);
      });
    break;
  }
  case "movie-this": {
    break;
  }
  case "do-what-it-says": {
    break;
  }
}
