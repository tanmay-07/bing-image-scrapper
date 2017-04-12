const express = require('express');
var router = express.Router();
var Image = require("../models/image.js");
var download  = require('../download.js');
const Scraper = require('images-scraper');
var  bing = new Scraper.Bing();

router.post("/search", function (req, resp) {
    paths =[];
    Image.findOne({query: req.body.search}, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        if(doc){
          resp.redirect('/tags');
        }else{
          console.log(doc);
          Image.create({query:req.body.search, images:[]}, function (err, img) {
            if(!err){
              console.log(img);
            }
          });
          bing.list({
                keyword: req.body.search,
                num: 15,
                detail: false,
                // nightmare: {
                //     show: true
                // }
            })
        .then(function (res) {
            console.log('first 15 results from bing', res);
            download(res, req.body.search);
            resp.redirect("/tags");
        }).catch(function(err) {
            console.log('err', err);
        });
        }
      }
    });

});
module.exports = router;
