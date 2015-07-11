var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

router.get('/:username', function(req, res, next){
  userController.getInfoForUser(req, res, next);
});

router.post('/', function(req,res,next){
  userController.addUser(req, res, next);
});

module.exports = router;