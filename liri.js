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
    break;
  }
  case "spotify-this-song": {
    break;
  }
  case "movie-this": {
    break;
  }
  case "do-what-it-says": {
    break;
  }
}
