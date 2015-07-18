var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var socket = io();

socket.on('updateAvatar', function(data){
  AppDispatcher.dispatch({
    type: AppConstants.UPDATE_AVATAR,
    data: data
  });
});

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

socket.on('updateComment', function(data) {
  AppDispatcher.dispatch({
    type: AppConstants.UPDATE_COMMENT,
    data: data
  });
});