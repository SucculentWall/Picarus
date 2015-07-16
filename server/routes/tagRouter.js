var express = require('express');
var tagController = require('../controllers/tagController');
var router = express.Router();

router.get('/:tag', function(req, res, next){
  tagController.getInfoForTag(req, res, next);
});

router.get('/', function(req, res, next){
  tagController.getAllTags(req, res, next);
});

// router.post('/', function(req,res,next){
//   tagController.findOrCreate(req, res, next);
// });

module.exports = router;