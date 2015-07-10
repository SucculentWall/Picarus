var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;


//  all or most recent photo requests
var _requestList = [];

var _addRequest = function(request){
  // TODO: send ajax POST request to db  
};


var FeedStore = assign(EventEmitter.prototype, {
  getAllRequests: function() {
    return _requestList;
  },

  getRequest: function(id) {
    return _requestList[id];
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

  }
});


module.exports = FeedStore;

