var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Comment = require('../db/models/comment');
var Comments = require('../db/collections/comments');
var io = require('../server.js');

var inspect = require('util').inspect;

module.exports = {

  addComment: function (req, res, next) {

    var data = req.body;

    new User({
        username: data.username
      })
      .fetch()
      .then(function (found) {
        if (!found) {
          res.send('User not found');
        } else {
          new Comment({
              text : data.text,
              username: data.username,
              user_id: found.id,
              photo_id: data.photo_id,
              request_id: data.request_id
            })
            .save()
            .then(function (createdComment) {
              io.emit('updateComment', createdComment);
              // increment likes in Photo table
              new Photo({
                  id: data.photo_id
                })
                .fetch()
                .then(function (photo) {
                  photo.save({comments: photo.get('comments')+1}, {patch: true})
                    .then(function(updatedPhoto){
                      console.log('>>>>>>>>>>>>>>> Increment comments count for photo ', data.photo_id, ' to: ', updatedPhoto.get('comments'));
                    });
                });
            });
          res.send('comment added');
        }
      });

  }

};