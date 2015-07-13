var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var PhotoTag = require('../db/models/photoTag');

var tagController = require('./tagController');

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
      new User({
          // username: data.username
          username: 'BOB'
        })
        .fetch()
        .then(function (found) {
          if (!found) {
            res.send('User not found');
          } else {
            new Photo({
                filename: data.filename,
                filetype: data.filetype,
                username: data.username,
                user_id: found.id,
                request_id: data.request_id, // assume this is how front-end passes it
              })
              .save()
              .then(function (createdPhoto) {
                // assume that tags are also passed in
                var parsedTags = JSON.parse(data.tags);
                if (parsedTags) {
                  for (var i = 0; i < parsedTags.length; i++) {
                    tagController.findOrCreate(parsedTags[i])
                      .then(function (tag) {
                        // put tag id and request id in join table
                        new PhotoTag({
                            photo_id: createdPhoto.id,
                            tag_id: tag.id
                          })
                          .save()
                          .then(function (PhotoTag) {});
                      })
                  }
                }
              });
            // res.writeHead(303, {
            //   Connection: 'close',
            //   Location: '/'
            // });
            // res.end();
            res.send('photo added');
          }
        });
    });

    req.pipe(busboy);

  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .fetch({
        withRelated: ['user']
      })
      .then(function (photos) {
        res.send(photos.models);
      });
  },

  getInfoForPhoto: function (req, res, next) {
    var photo_id = req.params.photo_id;
    new Photo({
        id: photo_id
      })
      .fetch({
        withRelated: ['user', 'requests', 'tags']
      })
      .then(function (photo) {
        res.send(photo);
      });
  }

}