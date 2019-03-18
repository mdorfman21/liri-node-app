require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
moment().format();

if (process.argv.length == 2) {
  return console.log("bad args");
}

var operation = process.argv[2];
var searchTerms = "";
process.argv.forEach((x, index) => {
  if (index > 2 && index == process.argv.length - 1) {
    searchTerms += x;
  } else if (index > 2) {
    searchTerms += x + "+";
  }
});

console.log(searchTerms);
console.log(operation);
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
