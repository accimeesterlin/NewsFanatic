var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  
  title: {
  	type: String,
  	required: true
  },

  url: {
  	type: String,
  	required: true
  },
  
  notes:
  {
  	type: Schema.Types.ObjectID,
  	ref: "Note"
  }
});


var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;