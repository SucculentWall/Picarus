var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

//  all or most recent photo requests
var _photoList = {};
var _requestList = {};
var _tagList = [];

var _receivePhotos = function(photos) {
  _photoList = {};
  for (var i = 0; i < photos.length; i++) {
    _photoList[photos[i].id] = photos[i];
  }
};

var _receiveSearchRequests = function(requests) {
  _requestList = {};
  for (var i = 0; i < requests.length; i++) {
    _requestList[requests[i].id] = requests[i];
  }
};

var _updatePhotoLikes = function(photo) {
  _photoList[photo.id] = photo;
}

var _receiveTags = function(tagsArray) {
  _tagList = tagsArray;
};

var GalleryStore = assign({},EventEmitter.prototype, {

  getAllPhotos: function() {
    console.log('this is photoList from galleryStore: ', _photoList);
    return _photoList;
  },

  getAllTags: function() {
    return _tagList;
  },

  getAllRequests: function() {
    return _requestList;
  },

  getPhoto: function (id) {
    return _photoList[id];
  },

  getLikes: function(id) {
    console.log('this is photoList from galleryStore: ', _photoList);
    // if (_photoList[id]){
    //   return _photoList[id].likes;
    // } else {
    //   return 0;
    // }
    return _photoList[id].likes;
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
      _receivePhotos(action.data);
      GalleryStore.emitChange();
      break;

    case AppConstants.RECEIVE_SEARCH_REQUESTS:
      _receiveSearchRequests(action.data);
      GalleryStore.emitChange();
      break;

    case AppConstants.RECEIVE_TAGS:
      _receiveTags(action.data.data);
      GalleryStore.emitChange();
      break;

    case AppConstants.LIKE_PHOTO:
      _updatePhotoLikes(action.data.data);
      GalleryStore.emitChange();
      break;


    default:
  }
});


module.exports = GalleryStore;

