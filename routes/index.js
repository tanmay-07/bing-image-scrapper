const express = require('express');
var router = express.Router();
var Image  = require('../models/image');
const mongoose = require('mongoose');


//root route
router.get("/", function (req, res) {
  Image.find({}, function (err, imgs) {
    if (err) {
      console.log(err);
    } else {
      res.render("home",{images:imgs});
    }
  })

});

// route listing saved results
router.get("/tags", function (req, res) {
  Image.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("tags", {images:doc});
    }
  });
});

// show route // loading compressed and filtered images from Amazon S3
router.get("/tags/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  Image.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
      return res.redirect("/tags");
    } else {
      res.render("images", {img: doc});
    }
  });
});

router.get("*",  function (req, res) {
  res.send('404');
})

module.exports = router;
