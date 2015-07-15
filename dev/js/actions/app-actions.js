var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
//var dbUtils = require("../utils/database-utils"); //can't have it here, causes circular reference

var dbUtils;

module.exports = {

  //User Actions
  addRequest: function(text, username, tags){
    dbUtils = require("../utils/database-utils");
    dbUtils.addRequest(text, username, tags);
  },

  pickRequest: function(id) {
    dbUtils = require("../utils/database-utils");
    dbUtils.getRequest(id);
  },

  addPhoto: function(photo, username, request_id, tags){
    dbUtils = require("../utils/database-utils");
    dbUtils.addPhoto(photo, username, request_id, tags);
  },

  addComment: function(text, username, photo_id){
    dbUtils = require("../utils/database-utils");
    dbUtils.addComment(text, username, photo_id);
  },

  loadComments: function(id) {
    dbUtils = require("../utils/database-utils");
    dbUtils.getComments(id);
  },

  // Server Actions
  receiveAllRequests: function(data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_REQUESTS,
      data: data
    });
  },

  receiveRequest: function (data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_REQUEST,
      data: data
    });
  },

  receiveAllPhotos: function(data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_PHOTOS,
      data: data
    });
  },

  receiveComments: function(data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_COMMENTS,
      data: data
    });
  },

  loggedIn: function(data, token) {
    AppDispatcher.dispatch({
      type: AppConstants.LOGGED_IN,
      data: data,
      token: token
    });
  },

  notLoggedIn: function(data) {
    AppDispatcher.dispatch({
      type: AppConstants.NOT_LOGGED_IN,
      data: data
    });
  }

};