var express = require('express');
var requestController = require('../controllers/requestController');
var router = express.Router();

router.post('/', function(req,res,next){
  requestController.addRequest(req, res, next);
});

router.get('/', function(req,res,next){
  console.log(req.body);
  requestController.getAllRequests(req, res, next);
});


module.exports = router;