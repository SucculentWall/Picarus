var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

//  all or most recent photo requests
var _requestList = [];

// all or most recent pictures (may or may not be tied to reqs)
var _photoList = [];

var _addRequest = function(request){
  // TODO: send ajax POST request to db  
}

