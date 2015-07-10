var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');

var utils = require('../utils/utils');

var Busboy = require('busboy');
var fs = require('fs');
var inspect = require('util').inspect;

module.exports = {

  addPhoto: function (req, res, next) {

    var data = {};

    var busboy = new Busboy({
      headers: req.headers
    });

    // fieldnames are the keys passed in with form data (eg with postman)
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
      data[fieldname] = val;
    });

    busboy.on('file', function (fieldname, filestream, filename, encoding, mimetype) {
      data.filename = utils.makeid(10) + '_' + filename; // random alphanum string + icarus.jpg
      data.filetype = filename.split('.').pop();
      var output = fs.createWriteStream('photos/' + data.filename);
      filestream.pipe(output);
    });


    busboy.on('finish', function () {
      console.log('data ', data);
      new User({
          username: data.username
        })
        .fetch()
        .then(function (found) {
          if (!found) {
            res.send('User not found');
          } else {
            new Photo({
                filename: data.filename,
                filetype: data.filetype,
                user_id: found.id,
                request_id: data.requestId // assume this is how front-end passes it
              })
              .save();
          }
        });
      // res.writeHead(303, {
      //   Connection: 'close',
      //   Location: '/'
      // });
      // res.end();
      res.send('photo added');
    });

    req.pipe(busboy);

  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .fetch({
        withRelated: ['user']
      })
      .then(function (photos) {
        console.log(photos);
        res.send(photos.models);
      });
  }

}