const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Scraper = require('images-scraper');
const bodyParser = require('body-parser');
var app = express();

var Image = require("./models/image.js");
var paths =[];

var indexRoutes = require('./routes/index');
var searchRoute = require('./routes/search');

var PORT = process.env.PORT || 3000;

//connect mongoose
mongoose.connect("mongodb://zillion:zillion123@ds141450.mlab.com:41450/zillion");



// app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
// app.use("")
app.set("view engine", "ejs");

//routes
app.use(indexRoutes);
app.use(searchRoute);

//starting server
app.listen(PORT, function () {
  console.log("Server started at port "+ PORT);
});
