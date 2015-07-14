var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");

var socket = io();

socket.on('updateFeed', function(data){
  AppDispatcher.dispatch({
    type: AppConstants.UPDATE_FEED,
    data: data
  });
});

socket.on('updateRequest', function(data) {
  AppDispatcher.dispatch({
    type: AppConstants.UPDATE_REQUEST,
    data: data
  });
});