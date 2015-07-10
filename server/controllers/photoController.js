var Photo = require('../db/models/photo');
var User = require('../db/models/user');
var Photos = require('../db/collections/photos');

module.exports = {
  
  addPhoto: function (req, res, next) {
    //TODO: write function to save request
    var data = req.body;  // {username: 'myname', text: 'some request'}
    console.log(data);
    new User({username: data.username})
      .fetch()
      .then(function(found){
        if (!found) {
          res.send('User not found');
        } else {
          new Photo({filename: data.filename, filetype: data.filetype, user_id: found.id})
          .save()
          .then(function(created){
            res.send(created);
          });
        }
      });
  },

  getAllPhotos: function (req, res, next) {
    Photos.reset()
      .fetch()
      .then(function(photos){
        console.log(photos);
        res.send(photos.models);
      });
  }

}