var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");

var dbUtils = require("../utils/database-utils");

module.exports = {
  addRequest: function(text){
    AppDispatcher.dispatch({
      type: AppConstants.ADD_REQUEST,
      text: text
    });
  }
}