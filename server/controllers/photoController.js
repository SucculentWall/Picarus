var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var PhotoTag = require('../db/models/photoTag');
var PhotoUser = require('../db/models/photoUser');

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

  addMobilePhoto: function (req, res, next) {

    var filename = utils.makeid(10) + '_' + req.body.photo.slice(5,10) + '.jpg';

    var data = {
      username: req.body.username,
      request_id: req.body.request_id,
      tags: req.body.tags,
      description: req.body.description,
      filename: filename,
      filetype: '.jpg'
    };

    var finalBuffer = new Buffer(req.body.photo, 'base64');

    s3.putObject({
      ACL: 'public-read',
      Bucket: 'picarus',
      Key: filename,
      Body: finalBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    }, function(error, response) {

        console.log('uploaded file[' + data.filename + '] to [' + data.filename + '] as image/jpg');

        // resize image to store and then use for display retrieval (speeds page load)
        vs3.src({
          Bucket: 'picarus',
          Key: data.filename
        })
        .pipe(imageResize({
          width: 400,
          height: 400
        }))
        .pipe(vs3.dest('s3://picarus/small'))
        .pipe(through2.obj(function(file, enc, next){
          new User({
              username: data.username
            })
            .fetch()
            .then(function (found) {

              console.log('found', found);

              if (!found) {
                res.send('User not found');
              } else {
                new Photo({
                    filename: data.filename,
                    filetype: data.filetype,
                    username: data.username,
                    description: data.description,
                    likes: 0,
                    user_id: found.id,
                    request_id: parseInt(data.request_id, 10) // assume this is how front-end passes it
                  })
                  .save()
                  .then(function (createdPhoto) {

                    console.log('createdPhoto', createdPhoto);

                    // assume that tags are also passed in
                    var parsedTags = JSON.parse(data.tags);
                    if (parsedTags) {
                      for (var i = 0; i < parsedTags.length; i++) {
                        tagController.findOrCreate(parsedTags[i])
                          .then(function (tag) {
                            //increment the photos count for the tag
                            // console.log('getting photo count for ', tag.get('tagname'), ': ', tag.get('photos_count'));
                            tag.save({photos_count: (tag.get('photos_count') || 0) + 1}, {patch: true})
                              .then(function (model) {});

                            // put tag id and request id in join table
                            new PhotoTag({
                                photo_id: createdPhoto.id,
                                tag_id: tag.id
                              })
                              .save()
                              .then(function (PhotoTag) {});
                          }) // tagController.findOrCreate.then
                        } // for i < parsedTags.length
                      } // if parsedTags
                      io.emit('updateRequest', createdPhoto);
                    }); // new Photo.save.then
                  res.send('photo added');
                }
              });
            next();
          }));

        }); // end of s3
  },

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
      // get length of filestream
      filestream.fileRead = [];
      filestream.on('data', function(dataChunk){
        this.fileRead.push(dataChunk);
      });
      filestream.on('end',  function() {
        var finalBuffer = Buffer.concat(this.fileRead);
        console.log('FILESTREAM LENGTH', finalBuffer.length);

        data.filename = utils.makeid(10) + '_' + filename; // random alphanum string + icarus.jpg
        data.filetype = filename.split('.').pop();

      s3.putObject({
        ACL: 'public-read',
        Bucket: 'picarus',
        Key: data.filename,
        Body: finalBuffer,
        ContentType: 'image/jpg'
      }, function(error, response) {
        console.log('FINAL BUFFER ', finalBuffer);
        console.log('uploaded file[' + data.filename + '] to [' + data.filename + '] as image/jpg');

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
                    username: data.username,
                    description: data.description,
                    likes: 0,
                    user_id: found.id,
                    request_id: parseInt(data.request_id, 10) // assume this is how front-end passes it
                  })
                  .save()
                  .then(function (createdPhoto) {
                    // assume that tags are also passed in
                    var parsedTags = JSON.parse(data.tags);
                    if (parsedTags) {
                      for (var i = 0; i < parsedTags.length; i++) {
                        tagController.findOrCreate(parsedTags[i])
                          .then(function (tag) {
                            //increment the photos count for the tag
                            // console.log('getting photo count for ', tag.get('tagname'), ': ', tag.get('photos_count'));
                            tag.save({photos_count: (tag.get('photos_count') || 0) + 1}, {patch: true})
                              .then(function (model) {});

                            // put tag id and request id in join table
                            new PhotoTag({
                                photo_id: createdPhoto.id,
                                tag_id: tag.id
                              })
                              .save()
                              .then(function (PhotoTag) {});
                          }) // tagController.findOrCreate.then
                        } // for i < parsedTags.length
                      } // if parsedTags
                      io.emit('updateRequest', createdPhoto);
                    }); // new Photo.save.then
                  res.send('photo added');
                }
              });
            next();
          }));

        }); // end of s3
      }); // end of filestream.on('end')

    }); // end of busboy.on('file')

    busboy.on('finish', function () {
      console.log('busboy finished parsing upload');
    });
    req.pipe(busboy);
  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .query(function(qb){
        qb.orderBy('created_at', 'DESC'); 
      })
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
        withRelated: ['user', 'request', 'tags', 'comments']
      })
      .then(function (photo) {
        res.send(photo);
      });
  },

  handlePhotoLike: function(req, res, next) {
    var photo_id = req.body.photo_id;
    var liked = req.body.like ? 1 : -1;
    var currUserId = req.body.currUserId;
    // increment likes in Photo table
    new Photo({
        id: photo_id
      })
      .fetch()
      .then(function (photo) {
        photo.save({likes: photo.get('likes')+liked}, {patch: true})
        .then(function(updatedPhoto){
          // fetch 
          new PhotoUser({
            user_id: currUserId,
            photo_id: photo_id
          })
          .fetch()
          .then(function(found){
            // if found, means it was already liked
            if (found){
              // can only be unliked (deleted)
              found.destroy()
              .then(function(destroyed){
                // res.send(destroyed);
              })
            } else {
              new PhotoUser({
                user_id: currUserId,
                photo_id: photo_id
              })
              .save()
              .then(function(createdRelationship){
                // res.send(createdRelationship);
              });
            }
          });
          updatedPhoto.currUserId = currUserId;
          res.send(updatedPhoto);
        });
      });

  },

  getPhotoLikes: function(req, res, next) {
    var user_id = req.body.user_id;
    new PhotoUser()
    .query('where', 'user_id', '=', user_id)
    .fetchAll()
    .then(function(collection) {
      res.send(collection.models); 
    });
  }
}