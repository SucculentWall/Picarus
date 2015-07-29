var accessRestriction = require('../utils/auth.js').accessRestriction;
var express = require('express');
var requestController = require('../controllers/requestController');
var router = express.Router();

router.get('/:request_id', function(req, res, next){
  requestController.getInfoForRequest(req, res, next);
});

router.post('/', accessRestriction, function(req,res,next){
  requestController.addRequest(req, res, next);
});

router.get('/', function(req,res,next){
  requestController.getAllRequests(req, res, next);
});

module.exports = router;