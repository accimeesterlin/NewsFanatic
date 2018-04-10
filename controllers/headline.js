var cheerio = require("cheerio");
var request = require("request");
var path = require("path");
var Note = require("../models/note.js");
var Headline = require("../models/headline.js");
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://www.newyorker.com/news", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $(".Card__dekImageContainer___3CRKY").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("p")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
    });
  });
};