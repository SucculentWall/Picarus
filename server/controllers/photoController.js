var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');

var Busboy = require('busboy');
var fs = require('fs');
var inspect = require('util').inspect;

module.exports = {
  
  addPhoto: function (req, res, next) {
    
    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, filestream, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename);
      var output = fs.createWriteStream('file.jpg');
      filestream.pipe(output);
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });

    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });

    req.pipe(busboy);

    // new User({username: data.username})
    //   .fetch()
    //   .then(function(found){
    //     if (!found) {
    //       res.send('User not found');
    //     } else {
    //       new Photo({filename: data.filename, filetype: data.filetype, user_id: found.id})
    //       .save()
    //       .then(function(created){
    //         res.send(created);
    //       });
    //     }
    //   });
  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .fetch()
      .then(function(photos){
        console.log(photos);
        res.send(photos.models);
      });
  }

}