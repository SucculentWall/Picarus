var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

//  all or most recent photo requests
var _photoList = {};

var _receivePhotos = function(photos) {
  for (var i = 0; i < photos.length; i++) {
    _photoList[photos[i].id] = photos[i];
  }
};

var GalleryStore = assign({},EventEmitter.prototype, {

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

GalleryStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_PHOTOS:
      _receivePhotos(action.data.data);
      GalleryStore.emitChange();
      break;



    default:
  }
});


module.exports = GalleryStore;

