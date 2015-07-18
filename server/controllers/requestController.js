var Request = require('../db/models/request');
var User = require('../db/models/user');
var Requests = require('../db/collections/requests');
var RequestTag = require('../db/models/requestTag');
var tagController = require('./tagController');
var io = require('../server.js');

module.exports = {

  addRequest: function (req, res, next) {
    //TODO: write function to save request
    var data = req.body; // {username: 'myname', text: 'some request', tags: ['barcelona', 'sunset']}
    new User({
        username: data.username
      })
      .fetch()
      .then(function (found) {
        if (!found) {
          res.send('User not found');
        } else {
          new Request({
              text: data.text,
              user_id: found.id
            })
            .save()
            .then(function (createdRequest) {
              console.log('===== Feed Submission =====\n* request :', createdRequest.attributes);
              console.log('* tags: ', data.tags, '\n===========================');
              // create tags
              if (data.tags) {
                var addTag = function (tag) {
                  // put tag id and request id in join table
                  new RequestTag({
                      request_id: createdRequest.id,
                      tag_id: tag.id
                    })
                    .save();
                };
                for (var i = 0; i < data.tags.length; i++) {
                  tagController.findOrCreate(data.tags[i])
                    .then(addTag);
                }
              }
              io.emit('updateFeed', createdRequest);
              res.send(createdRequest);
            });
        }
      });
  },

  getAllRequests: function (req, res, next) {
    Requests.reset()
      .fetch({
        withRelated: ['user'] // refers to property on model
      })
      .then(function (requests) {
        res.send(requests.models);
      });
  },

  getInfoForRequest: function (req, res, next) {
    var request_id = req.params.request_id;
    new Request({
        id: request_id
      })
      .fetch({
        withRelated: [{'photos': function(qb) {
          // sort photos by creation order or else they will shuffle when liked
          qb.orderBy('created_at'); 
        }}, 'user', 'tags']
      })
      .then(function (request) {
        console.log('this is how request is spat out: ',request.relations.photos.models)
        res.send(request);
      });
  }

};