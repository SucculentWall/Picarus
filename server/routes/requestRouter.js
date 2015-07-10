var express = require('express');
var Request = require('../db/models/request');
var router = express.Router();


router.post('/', function(req,res,next){
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

});


module.exports = router;