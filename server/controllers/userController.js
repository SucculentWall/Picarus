var User = require('../db/models/user');

module.exports = {
  addUser: function (req, res, next) {
    var data = req.body;  // {username: 'myname'}
    console.log('GOT HERE', data);
    new User({username: data.username})
      .fetch()
      .then(function (found) {
        if (found) {
          res.send(found);
        } else {
          var newUser = new User({username: data.username});
          newUser.save()
            .then(function (created) {
              res.send(created);
            });
        }
      })
      .catch(function(error) {
        console.log('FAILED', error);
      });
  },

  findOrCreate: function (profile_id) {
    return new Promise(function(resolve, reject){
      new User({username: profile_id})
      .fetch()
      .then(function (found) {
        if (found) {
          resolve(found);
        } else {
          var newUser = new User({username: profile_id});
          newUser.save()
            .then(function (created) {
              resolve(created);
            });
        }
      })
      .catch(reject);
    }); // close Promise   
  },

  getInfoForUser: function(req, res, next) {
    var username = req.params.username;

    new User({username: username})
      .fetch({
        withRelated: ['requests', 'photos']
      })
      .then(function (found) {
        if (found) {
          res.send(found);
        } else {
          res.send('User not found!');
        }
      });
  }

}