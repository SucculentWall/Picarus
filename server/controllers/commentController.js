var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Comment = require('../db/models/comment');
var Comments = require('../db/collections/comments');

var io = require('../server.js');

var inspect = require('util').inspect;

module.exports = {

  addComment: function (req, res, next) {

    var data = {};

    new User({
        // username: data.username
        username: 'BOB'
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
              photo_id: data.photo_id, // assume this is how front-end passes it
            })
            .save()
            .then(function (createdComment) {
              io.emit('updateRequest', createdComment);
            });
          // res.writeHead(303, {
          //   Connection: 'close',
          //   Location: '/'
          // });
          // res.end();
          res.send('comment added');
        }
      });

  },

  getCommentsForPhoto : function (req, res, next) {
    Comments.reset()
      .fetch({
        withRelated: ['photo']
      })
      .then(function (comments) {
        res.send(comments.models);
      });
  }
};