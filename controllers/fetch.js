var request = require("request");
var cheerio = require("cheerio");
var Note = require("../models/Note.js");
var Headline = require("../models/Headline.js");
var index = require("../models/index.js");

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

  app.get("/notes", function (req, res) {
    Note.find({}, function (error, data) {
        if (error) {
          console.log(error);
        } else {
          res.render("index", {result: data});
        }
      })
      .sort({'_id': -1});
  });

}

