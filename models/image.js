const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  query: String,
  images: [String]
});

module.exports = mongoose.model("Image", schema);
