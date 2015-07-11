var Request = require('../db/models/request');
var User = require('../db/models/user');
var Requests = require('../db/collections/requests');

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
          // // checks for #thisIsHashtag
          // var tagRegEx = /\S*#(?:\[[^\]]+\]|\S+)/ig;
          // var tags = data.text.match(tagRegEx); // ['#barcelona, #sunset']
          // ^--- move into client! 

          // loop over the tags
          // for (var i = 0; i < data.tags.length; i++) {
          //   var tag = data.tags[i];
          //   // find or create each tag
          //   new Tag({tagname: tag})
          //     .fetch()
          //     .then(function)
          // }

          new Request({text: data.text, user_id: found.id})
            .save()
            .then(function(created){
              res.send(created);
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
    var requestId = req.params.requestId;
    new Request({id: requestId})
      .fetch({
        withRelated: ['photos', 'user']
      })
      .then(function(request){
        console.log(request);
        res.send(request);
      });
  }

}