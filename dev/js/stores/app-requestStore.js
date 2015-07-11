var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;


//  all or most recent photo requests
var _commentList = {};
var _photoList = {};

var RequestStore = assign({},EventEmitter.prototype, {
  getAllComments: function() {
    return _commentList;
  },

  getComment: function(id) {
    return _commentList[id];
  },

  getAllPhotos: function() {
    return _photoList;
  },

  getPhoto: function (id) {
    return _photoList(id);
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

    // case AppConstants.RECEIVE_REQUESTS:
    //   _receiveRequests(action.data.data);
    //   RequestStore.emitChange();
    //   break;



    default:
  }
});


module.exports = RequestStore;

