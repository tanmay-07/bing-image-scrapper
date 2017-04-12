var image_downloader = require('image-downloader');
var compress = require('./compress');

var download = function (images, query) {

  images.forEach(function (img, index) {
    var options = {
        url: img.url,
        dest: 'images',                  // Save to /images directory(local)
        done: function(err, filename, image) {
            if (err) {
                console.log(err);

            }else{
              compress(filename, query, index);
            
              console.log('File saved to', filename);
            }
        },
    };
    image_downloader(options);
  });
};

module.exports = download;
