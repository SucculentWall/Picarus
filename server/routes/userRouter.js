var passport = require('../utils/auth.js').passport;
var accessRestriction = require('../utils/auth.js').accessRestriction;
var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();
// var passport = require('../utils/auth.js');

router.get('/:id', function(req, res, next){
  userController.getInfoForUser(req, res, next);
});

router.post('/', passport.authenticate('facebook-token'), function(req,res,next){
  userController.addUser(req, res, next);
});

router.post('/avatars/', accessRestriction, function(req,res,next){
  userController.addAvatar(req, res, next);
});

module.exports = router;