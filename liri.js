var dotenv = require("dotenv").config();
var key = require("./key.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(key.spotify);
var twitter = new Twitter(key.twitter);
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");

inquirer
    .prompt([{
        type: "list",
        message: "Which of the following would you like to run?",
        choices: ["My tweets", "Find a song on Spotify", "Find a movie on OMDB", "Do what the random file says"],
        name: "choice"
    }]).then(function (answer) {

        switch (answer.choice) {
            case "My tweets":
                twitter.get("statuses/user_timeline", {screen_name: "sltrib"}, function (err, tweets, response) {
                    if (err) throw err;
                    for (tweet of tweets) {
                        console.log(tweet.text);
                    }
                    // console.log(response);
                });

                break;
            case "Find a song on Spotify":
                inquirer
                    .prompt([{
                        type: "input",
                        message: "Which song would you like to look up?",
                        name: "song"
                    }]).then(function (songName) {
                        // console.log(songName.song);
                        function findSong() {
                            var song = songName.song;
                            spotify.search({
                                    type: "track",
                                    query: song
                                },
                                function (err, response) {
                                    if (err) {
                                        return console.log("Error occurred " + err);
                                    } else {
                                        console.log(response);
                                    }
                                });
                        }
                        switch (songName) {
                            case "":
                                //default to "The Sign" by Ace of Bass
                                lookUpSong();
                                console.log("Artist name: " + spotify.xxxx);
                                console.log("Song title: " + spotify.xxxx);
                                console.log("Check out this preview: " + spotify.xxxx);
                                console.log("Album title: " + spotify.xxxx);
                                break;
                            default:
                                console.log(songName.song);
                                findSong();
                                console.log("Artist name: " + spotify.xxxx);
                                console.log("Song title: " + spotify.xxxx);
                                console.log("Check out this preview: " + spotify.xxxx);
                                console.log("Album title: " + spotify.xxxx);
                        }
                    });
                break;
            case "Find a movie on OMDB":
                inquirer
                    .prompt([{
                        type: "input",
                        message: "Which movie would you like to look up?",
                        name: "movie"
                    }]).then(function (movieName) {
                        var queryUrl = "http://www.omdbapi.com/?t=" + movieName.movie + "&y=&plot=short&apikey=trilogy";

                        function lookUpMovie() {
                            request(queryUrl, function (error, response, body) {
                                if (!error && response.statusCode === 200) {
                                    console.log("Movie title: " + JSON.parse(body).Title);
                                    console.log("Release year: " + JSON.parse(body).Year);
                                    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                                    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
                                    console.log("Produced in: " + JSON.parse(body).Country);
                                    console.log("Language: " + JSON.parse(body).Language);
                                    console.log("Plot: " + JSON.parse(body).Plot);
                                    console.log("Actors: " + JSON.parse(body).Actors);
                                }
                            });
                        }
                        switch (movieName) {
                            case movieName.movie == "":
                                function lookUpNobody() {
                                    request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
                                        if (!error && response.statusCode === 200) {
                                            console.log("Movie title: " + JSON.parse(body).Title);
                                            console.log("Release year: " + JSON.parse(body).Year);
                                            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                                            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
                                            console.log("Produced in: " + JSON.parse(body).Country);
                                            console.log("Language: " + JSON.parse(body).Language);
                                            console.log("Plot: " + JSON.parse(body).Plot);
                                            console.log("Actors: " + JSON.parse(body).Actors);
                                        }
                                    });
                                }
                                lookUpNobody();
                                break;
                            default:
                                lookUpMovie();
                        }
                    });
                break;
            case "Do what it says":
                //grab random text file, parse text, run it through spotify api
                break;
                //    default:
                // console.log("Choose one of the options");
        }
    });