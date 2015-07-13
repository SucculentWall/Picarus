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
  //TODO: pase data to see if it's relevant to this user
  //update app-requestStore with new data



});