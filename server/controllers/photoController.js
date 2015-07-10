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

    busboy.on('file', function (fieldname, filestream, filename, encoding, mimetype) {
      var name = data.filename + utils.makeid();
      var output = fs.createWriteStream('photos/' + name + '.' + data.filetype);
      filestream.pipe(output);
    });

    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
      data[fieldname] = val;
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
                user_id: found.id
              })
              .save();
          }
        });
      res.writeHead(303, {
        Connection: 'close',
        Location: '/'
      });
      res.end();
    });

    req.pipe(busboy);

  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .fetch()
      .then(function (photos) {
        console.log(photos);
        res.send(photos.models);
      });
  }

}