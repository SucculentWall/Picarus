var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

router.post('/', function(req,res,next){
  userController.addUser(req, res, next);
});

module.exports = router;