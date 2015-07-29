var express = require('express');
var router = express.Router();
var accessRestriction = require('../utils/auth.js').accessRestriction;
var authController = require('../controllers/authController');

router.post('/', accessRestriction, function(req,res,next){
  authController.logout(req, res, next);
});

module.exports = router;