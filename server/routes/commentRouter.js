var express = require('express');
var commentController = require('../controllers/commentController');
var photoController = require('../controllers/photoController');

var router = express.Router();

router.get('/photo/:photo_id', function(req, res, next){
  //get comments and related meta data for photo
  photoController.getInfoForPhoto(req, res, next);
});

router.post('/', function(req,res,next){
  commentController.addComment(req, res, next);
});

module.exports = router;