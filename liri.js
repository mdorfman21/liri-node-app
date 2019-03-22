//adding the require statements to get libraries
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
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

function runLiri(operation, searchTerms) {
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
      //make the api call with the correct url
      axios
        .get(queryURL)
        .then(response => {
          //store the data into variables and log the correct info to the screen
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
                moment(objectResponse[key].datetime).format(
                  "MMM Do YYYY, h:mm a"
                )
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
      //catch if they didn't search anything
      if (searchTerms === "") {
        return console.log("Please enter a song name");
      }
      var songName = searchTerms.split("+").join(" ");
      spotify
        .search({
          type: "track",
          query: songName
        })
        .then(response => {
          var objectResponse = response.tracks.items;
          if (objectResponse.length === 0) {
            return console.log("'The Sign' by Ace of Base");
          }
          console.log("The artist is", objectResponse[0].album.artists[0].name);
          console.log("Song Name:", objectResponse[0].name);

          //if there is no preview link, return the below string
          if (!objectResponse[0].preview_url) {
            console.log("Sorry, no preview link!");
          } else {
            console.log("Preview link:", objectResponse[0].preview_url);
          }
          console.log("From the album", objectResponse[0].album.name);
        })
        .catch(err => {
          console.log(err);
        });
      break;
    }
    case "movie-this": {
      var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=";

      if (searchTerms === "") {
        queryURL += "Mr.Nobody";
      } else {
        queryURL += searchTerms;
      }
      axios
        .get(queryURL)
        .then(response => {
          displayMovie(response);
        })
        .catch(err => {
          console.log(err);
        });
      break;
    }
    case "do-what-it-says": {
      fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);

        var dataArray = data.split(",");
        var operation = dataArray[0];
        var searchTerms = dataArray[1];
        runLiri(operation, searchTerms);
      });
      break;
    }
  }
}

function displayMovie(theResponse) {
  var title = theResponse.data.Title;
  console.log("Title:", title);
  console.log(title, "came out in", theResponse.data.Year);
  console.log("IMDB rates", title, "a", theResponse.data.Ratings[0].Value);
  console.log(
    "Rotten Tomatoes rates",
    title,
    "a",
    theResponse.data.Ratings[1].Value
  );
  console.log(title, "was filmed in", theResponse.data.Country);
  console.log(title, "is in", theResponse.data.Language);
  console.log("The plot of", title, "is", theResponse.data.Plot);
  console.log(theResponse.data.Actors, "act in", title);
}

runLiri(operation, searchTerms);
