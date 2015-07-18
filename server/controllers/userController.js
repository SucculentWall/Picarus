var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var PhotoTag = require('../db/models/photoTag');

var tagController = require('./tagController');

var utils = require('../utils/utils');
var io = require('../server.js');

var Busboy = require('busboy');
var fs = require('fs');
var inspect = require('util').inspect;

module.exports = {
  addUser: function (req, res, next) {
    var data = req.body;  // {username: 'myname'}
    console.log(data);
    new User({FacebookId: data.FacebookId, username: data.username})
      .fetch()
      .then(function (found) {
        if (found) {
          res.send(found);
        } else {
          var newUser = new User({FacebookId: data.FacebookId, username: data.username});
          newUser.save()
            .then(function (created) {
              res.send(created);
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getInfoForUser: function(req, res, next) {
    var id = req.params.id;

    new User({id: id})
      .fetch({
        withRelated: ['requests', 'photos', 'comments']
      })
      .then(function (found) {
        if (found) {
          res.send(found);
        } else {
          res.send('User not found!');
        }
      });
  },

  addAvatar: function(req, res, next) {

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
      var output = fs.createWriteStream('dist/img/' + data.filename);
      filestream.pipe(output);
    });

    busboy.on('finish', function () {
      new User({
          id: data.user_id
        })
        .fetch()
        .then(function (found) {
          if (!found) {
            res.send('User not found');
          } else {
            found
              .set('avatar', data.filename)
              .save()
              .then(function (created) {
                console.log(io);
                io.emit('updateAvatar', data.filename);
              });
            res.send('avatar added');
          }
        });
    });

    req.pipe(busboy);

  }


};