var express = require("express");
var port = process.env.PORT || 3000;

var axios = require("axios");
var dotenv = require("dotenv").config();

var Twitter = require("twitter");

var app = express();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

//https://cors-anywhere.herokuapp.com/

app.get("/", function(req, res) {
  var tweetsArr = [];
  client.get("search/tweets", { q: "$goog" }, function(
    error,
    tweets,
    response
  ) {
    tweets.statuses.forEach(function(tweet) {
      //console.log("tweet: " + tweet.text);
      console.log(tweet);

      var tweet = {
        profile: tweet.user.profile_image_url,
        username: tweet.user.screen_name,
        message: tweet.text
      };

      tweetsArr.push(tweet);
    });
    res.send(tweetsArr);
  });

  //res.send(JSON.stringify({ name: "aizzat" }));
});

app.listen(port, function() {
  console.log("Example app listening on port !");
});
