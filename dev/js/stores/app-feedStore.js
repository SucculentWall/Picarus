var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;


var _requestList = [];

var _receiveRequests = function(requests) {
  _requestList = requests;
};

var _addToRequestList = function(request) {
  _requestList.push(request);
};

var FeedStore = assign({},EventEmitter.prototype, {
  getAllRequests: function() {
    return _requestList;
  },

  getRequest: function(id) {
    for (var i = 0; i < _requestList.length; i++) {
      if (_requestList[i].id === id) { return _requestList[i];}
    }
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

FeedStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_REQUESTS:
      _receiveRequests(action.data.data);
      FeedStore.emitChange();
      break;

    case AppConstants.UPDATE_FEED:
      _addToRequestList(action.data);
      FeedStore.emitChange();
      break;

    default:
  }
});


module.exports = FeedStore;

