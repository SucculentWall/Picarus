var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var PhotoTag = require('../db/models/photoTag');

var tagController = require('./tagController');

var utils = require('../utils/utils');
var io = require('../server.js');

var Busboy = require('busboy');

var aws = require('aws-sdk');
aws.config.loadFromPath('./AWSConfig.json');

var s3 = new aws.S3();

var fs = require('fs');
var inspect = require('util').inspect;

var gulp = require('gulp');
var vs3 = require('vinyl-s3');
var through2 = require('through2');
var imageResize = require('gulp-image-resize');

module.exports = {
  addUser: function (req, res, next) {
    var data = req.body;
    new User({FacebookId: data.FacebookId})
      .fetch()
      .then(function (found) {
        if (found) {
          found.set('username', data.username);
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

      filestream.length = +data.size;

      s3.putObject({
        ACL: 'public-read',
        Bucket: 'picarus',
        Key: data.filename,
        Body: filestream,
        ContentType: 'image/jpg'
      }, function(error, response) {
        console.log('uploaded profile avatar file[' + data.filename + '] to [' + data.filename + '] as image/jpg');

        // resize image to store and then use for display retrieval (speeds page load)
        vs3.src({
          Bucket: 'picarus',
          Key: data.filename
        })
        .pipe(imageResize({
          width: 400,
          height: 400,
          imageMagick: true
        }))
        .pipe(vs3.dest('s3://picarus/small'))
        .pipe(through2.obj(function(file, enc, next){
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
                    console.log(' this is data: ', data);
                    io.emit('updateAvatar', data.filename, data.user_id);
                  });
                res.send('avatar added');
              }
            });
          next();
        }));

      });

    });

    busboy.on('finish', function () {
      console.log('busboy finished parsing');
    });

    req.pipe(busboy);
  }

};