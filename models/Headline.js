var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  
  title: {
  	type: String,
    unique: true,
  	required: true
  },

  url: {
  	type: String,
    unique: true,
  	required: true
  },
  
  notes: [
  {
  	type: Schema.Types.ObjectId,
  	ref: "Note"
  }
   ]
});


var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;