  var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var Headline = require('../models/Headline')
var Note = require('../models/Note')

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