var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var PhotoTag = require('../db/models/photoTag');

var tagController = require('./tagController');

var utils = require('../utils/utils');
var io = require('../server.js');

var Busboy = require('busboy');

//Mongoose setup
// var mongoose = require('mongoose');
// var Grid = require('gridfs-stream');
var fs = require('fs');
var inspect = require('util').inspect;

// must install the following during deployment for resize to work:
// brew install imagemagick
// brew install graphicsmagick

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');

module.exports = {
  addUser: function (req, res, next) {
    var data = req.body;  // {username: 'myname'}
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
        withRelated: ['requests', { 'photos': function(qb) {qb.orderBy('created_at','DESC');} }, 'comments']
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
<<<<<<< HEAD
      // Grid.mongo = mongoose.mongo;
      // var conn = mongoose.createConnection('mongodb://127.0.0.1/picarus');
      // conn.once('open', function() {
      //   var gfs = Grid(conn.db);
      //   var output = gfs.createWriteStream({filename: data.filename});
      //   filestream.pipe(output);
      // });

      // var output = fs.createWriteStream('dist/img/' + data.filename);
      // filestream.pipe(output);
      filestream.length = +data.size;

      s3.putObject({
        ACL: 'public-read',
        Bucket: 'picarus',
        Key: data.filename,
        Body: filestream,
        ContentType: 'image/jpg'
      }, function(error, response) {
        console.log('uploaded profile avatar file[' + data.filename + '] to [' + data.filename + '] as image/jpg');
        console.log(arguments);
      });
=======
      var output = fs.createWriteStream('dist/img/' + data.filename);
      filestream.pipe(output);
>>>>>>> (deploy) ignore node_modules, build, dist, AWSConfig.json, bower components
    });

    busboy.on('finish', function () {

      gulp.src('dist/img/' + data.filename)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(imageResize({
          width: 150,
          height: 150,
          crop: true
        }))
        .pipe(gulp.dest('dist/img'));

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
                io.emit('updateAvatar', data.filename);
              });
            res.send('avatar added');
          }
        });
    });

    req.pipe(busboy);

  }


};