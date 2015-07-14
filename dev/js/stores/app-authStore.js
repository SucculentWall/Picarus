var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;



//  all or most recent photo requests
var user = {};

// var _receiveRequests = function(requests) {
//   for (var i = 0; i < requests.length; i++) {
//     _requestList[requests[i].id] = requests[i];
//   }
// };

// var _addToRequestList = function(request) {
//   _requestList[request.id] = request;
// };

var AuthStore = assign({},EventEmitter.prototype, {
  loggedIn: function() {
    return user.id !== undefined;
  },

  getId: function() {
    return user.id;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AuthStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.LOGGED_IN:
      //_receiveRequests(action.data.data);
      AuthStore.emitChange();
      break;

    case AppConstants.NOT_LOGGED_IN:
      //_addToRequestList(action.data);
      AuthStore.emitChange();
      break;

    default:
  }
});


module.exports = AuthStore;

