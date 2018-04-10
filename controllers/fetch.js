var request = require("request");
var cheerio = require("cheerio");
var Note = require("../models/note.js");
var Headline = require("../models/headline.js");

var path = require("path");


  module.exports = function(router) {


  app.get("/headlines", function (req, res) {
    Headline.find({}, function (error, data) {
        if (error) {
          console.log(error);
        } else {
          res.render("index", {result: data});
        }
      })
      .sort({'_id': -1});
  });

}

module.exports = function(app) {


}