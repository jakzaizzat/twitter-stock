var express = require("express");
var port = process.env.PORT || 3000;

var dotenv = require("dotenv").config();

var Twitter = require("twitter");

var app = express();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  var tweetsArr = [];

  if (!req.query.name) {
    res.send("No query");
    return;
  }

  client.get(
    "search/tweets",
    { q: req.query.name, count: 5, result_type: "recent" },
    function(error, tweets, response) {
      tweets.statuses.forEach(function(tweet) {
        var tweet = {
          profile: tweet.user.profile_image_url,
          username: tweet.user.screen_name,
          message: tweet.text
        };
        tweetsArr.push(tweet);
      });
      res.send(tweetsArr);
    }
  );
});

app.listen(port, function() {
  console.log("Example app listening on port !");
});
