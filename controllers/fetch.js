var request = require("request");
var cheerio = require("cheerio");
var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");
var index = require("../models/index.js");
var axios = require("axios");




module.exports = function (app) {

  app.get("/", function (req, res) {
    Headline.find({}, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        res.render("index", { result: data });
      }
    })
  });


  app.post("/add/note", function (req, res) {
    // TODO
    // add notes

    // req.body = {}

    Headline.findOne({ _id: "5ace9a60dfe8000966cc5b07" })
      .then((article) => {

        Note.create(req.body)
          .then((note) => {
            console.log("Notes: ", note);

            article.notes.push(note._id); // push inside the headline not key
            article.save(function (err) {
              if (err) {
                console.log("Error, not saving: ", err);
                
              } else {
                res.json({ msg: "Now, it officialy works!" });
              }
            });

          })
          .catch((err) => {
            res.status(500).json({ error: "Ooops, error" });
          })
      })
      .catch((err) => {
        // TODO
      });




  });

  app.get("/articles", function(req, res) {

    // TODO
    Headline.find({})
      .populate("notes")
      .then((articles) => {
        res.json(articles);
      })
      .catch(() => {

      })
  });


  app.get("/scrape", function (req, res) {

    // Make a request for the news section of `ycombinator`
    axios.get("https://www.newyorker.com/news")
      .then((response) => {

        const finalResults = []; // hold all the results
        // // Load the html body from request into cheerio
        var $ = cheerio.load(response.data);
        // // For each element with a "title" class
        $(".Card__dekImageContainer___3CRKY").each(function (i, element) {
          // Save an empty result object
          var result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("p")
            .text();
          result.url = $(this)
            .children("a")
            .attr("href");


          finalResults.push(result);


        }); // end of the loop
        // res.redirect("/")

        // // Create a new Article using the `result` object built from scraping
        Headline.create(finalResults)
          .then(function (dbHeadline) {
            // View the added result in the console
            // console.log(dbHeadline);
            res.json({ msg: "Scrape is successfully completed" });
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            // return res.json(err);
            console.log("Error: ", err);

            res.status(500).json({ error: "Internal error" });
          });


      })
      .catch(() => {

      });

    // If we were able to successfully scrape and save an Article, send a message to the client
    // res.send("Scrape Complete");
  });


}



