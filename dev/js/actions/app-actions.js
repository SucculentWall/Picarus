var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
//var dbUtils = require("../utils/database-utils");

module.exports = {

  //User Actions
  addRequest: function(text, username, tags){
    var dbUtils = require("../utils/database-utils");
    dbUtils.addRequest(text, username, tags);
  },

  pickRequest: function(id) {
    var dbUtils = require("../utils/database-utils");
    dbUtils.getRequest(id);
  },

  addPhoto: function(photo, username, request_id, tags){
    var dbUtils = require("../utils/database-utils");
    dbUtils.addPhoto(photo, username, request_id, tags);
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
  }

};