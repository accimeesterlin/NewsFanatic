var request = require("request");
var cheerio = require("cheerio");
var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");
var index = require("../models/index.js");
var axios = require("axios");

// var path = require("path");


  module.exports = function(app) {

  app.get("/", function (req, res) {
    Headline.find({}, function (error, data) {
        if (error) {
          console.log(error);
        } else {
          res.render("index");
        }
      })
  });

// Route for retrieving all Notes from the db
app.get("/notes", function(req, res) {
  // Find all Notes
  Note.find({})
    .then(function(dbNote) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// app.post("/submit", function(req, res) {
//   // Create a new Note in the db
//   db.Note.create(req.body)
//     .then(function(Note) {
//       // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Headline.findOneAndUpdate({}, { $push: { notes: Note._id } }, { new: true });
//     })
//     .then(function(dbUser) {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });


// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  axios.get("https://www.newyorker.com/news", function(error, response, html) {
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
      headlines.create(result)
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

}


