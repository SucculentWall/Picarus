var express = require('express');
var photoController = require('../controllers/photoController');
var router = express.Router();

router.post('/', function(req,res,next){
  photoController.addPhoto(req, res, next);
});

router.get('/', function(req,res,next){
  photoController.getAllPhotos(req, res, next);
});

// router.get('/:photo_id', function(req, res, next){
//   photoController.getInfoForPhoto(req, res, next);
// });

router.post('/likes/:photo_id', function(req, res, next){
  photoController.handlePhotoLike(req, res, next);
});

module.exports = router;