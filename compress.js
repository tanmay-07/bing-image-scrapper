const sharp = require('sharp');
var UploadToS3 = require('./upload');
var Image = require('./models/image');


var compress = function(input, query, index) {
  var output = 'tmp/' +query + '_' + index +'.jpg';
  var temp =  'tmp/' +query + '_' + index ;
  paths.push(temp);
  console.log('paths = '+ paths);
  // output += query + '_' + i++;
  sharp(input)
    .rotate()
    .resize(200)
    .grayscale()
    .toFile(output, function (err, info) {
      if(err){
        console.log(err);
      }else {
        console.log("File compressed =>"+ info);

        UploadToS3(output, output.substr(0,output.length-4));


        Image.findOneAndUpdate({query:query},{$set:{images:paths}}, function (err, doc) {
          if(err)
            console.log(err);
          else {
            console.log(doc);
          }
        });
        // Image.save();
      }
    });
    // .then( data => {console.log(data);} )
    // .catch( err => {console.log(err);} );
}
module.exports  = compress;
