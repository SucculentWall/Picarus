var express = require('express');
var commentController = require('../controllers/commentController');
var router = express.Router();

router.get('/photo/:photo_id', function(req, res, next){
  commentController.getCommentsForPhoto(req, res, next);
});

router.post('/', function(req,res,next){
  commentController.addComment(req, res, next);
});

module.exports = router;