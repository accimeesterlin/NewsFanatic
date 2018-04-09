var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

var Headline = require("./models/Headline.js");
var Note = require("./models/Note.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);
require("./routes/api")(app);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});