var Request = require('../db/models/request');
var User = require('../db/models/user');
var Requests = require('../db/collections/requests');
var RequestTag = require('../db/models/requestTag');
var tagController = require('./tagController');

module.exports = {
  
  addRequest: function (req, res, next) {
    //TODO: write function to save request
    var data = req.body;  // {username: 'myname', text: 'some request', tags: ['barcelona', 'sunset']}
    console.log(data);
    new User({username: data.username})
      .fetch()
      .then(function(found){
        if (!found) {
          res.send('User not found');
        } else {
          new Request({text: data.text, user_id: found.id})
            .save()
            .then(function(createdRequest){
              // create tags
              if (data.tags) {
                for (var i = 0; i < data.tags.length; i++) {
                  tagController.findOrCreate(data.tags[i])
                    .then(function(tag){
                      // put tag id and request id in join table
                      new RequestTag({request_id: createdRequest.id, tag_id: tag.id})
                        .save()
                        .then(function(requestTag){
                          console.log('created a request tag relationship: ', requestTag.attributes.request_id + " " + requestTag.attributes.tag_id);
                        })
                    })
                }
              }
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
      .then(function(requests){
        console.log(requests);
        res.send(requests.models);
      });
  },

  getInfoForRequest: function (req, res, next) {
    var request_id = req.params.request_id;
    new Request({id: request_id})
      .fetch({
        withRelated: ['photos', 'user', 'tags']
      })
      .then(function(request){
        console.log('photo request: ', request);
        res.send(request);
      });
  }

}