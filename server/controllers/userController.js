var User = require('../db/models/user');

module.exports = {
  addUser: function (req, res, next) {
    var data = req.body;  // {username: myname}
    // console.log(data);

    new User({username: data.username})
      .fetch()
      .then(function (found) {
        if (found) {
          res.send('username already exists');
        } else {
          var newUser = new User({username: data.username});
          newUser.save()
            .then(function (created) {
              res.send(created);
            });
        }
      });
  }

}