var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
//var dbUtils = require("../utils/database-utils");

module.exports = {

  //User Action
  addRequest: function(text, username){
    var dbUtils = require("../utils/database-utils");
    dbUtils.addRequest(text, username);
    AppDispatcher.dispatch({
      type: AppConstants.ADD_REQUEST,
      username: 'BOB', //hardcoded for testing
      text: text
    });
  },


  // Server Action
  receiveAllRequests: function(data) {
    AppDispatcher.dispatch({
      type: AppConstants.RECEIVE_REQUESTS,
      data: data
    });
  }
};