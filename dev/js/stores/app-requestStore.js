var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;


//  all or most recent photo requests
var _request = {};

var _receiveRequest = function(data) {
  _request = data;
};

var RequestStore = assign({},EventEmitter.prototype, {
  // getAllComments: function() {
  //   return _commentList;
  // },

  // getComment: function(id) {
  //   return _commentList[id];
  // },

  getPhotos: function() {
    return _request.photos;
  },

  getId: function () {
    return _request.id;
  },

  getUsername: function () {
    return _request.username;
  },

  getTags: function () {
    return _request.tags;
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

RequestStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_REQUEST:
      _receiveRequest(action.data.data);
      RequestStore.emitChange();
      break;



    default:
  }
});


module.exports = RequestStore;

