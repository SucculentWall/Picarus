var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

//  all or most recent photo requests
var _photoList = [];
var _requestList = {};
var _tagList = [];

var _commentDisplay = {}; // photo_ids are keys
var _modalDisplay = {}; // eg photo_id: true

// whether or not the current user has already liked (photo_id : true)
var _likeLog = {};

var _toggleCommentDisplay = function(id) {
  var display = _commentDisplay[id] || false; 
  _commentDisplay[id] = !display;
};

var _toggleModal = function(id) {
  var modal = _modalDisplay[id] || false;
  _modalDisplay[id] = !modal;
};

var _resetToggle = function(id) {
  var display = _commentDisplay[id] || false; 
  var modal = _modalDisplay[id] || false;
  _commentDisplay[id] = false;
  _modalDisplay[id] = false;

};

var _receiveAllPhotoLikes = function(joinData) {
  // joinData is an array of objects
  _likeLog = {};
  for (var i = 0; i < joinData.length; i++) {
    var obj = joinData[i];
    _likeLog[obj.photo_id] = obj.user_id; 
  }
};

var _receivePhotos = function(photos) {
  _photoList = [];
  for (var i = 0; i < photos.length; i++) {
    _photoList.push(photos[i]);
  }
};

var _receiveSearchRequests = function(requests) {
  _requestList = [];
  for (var i = 0; i < requests.length; i++) {
    _requestList.push(requests[i]);
  }
};

var _updatePhotoLikes = function(data) {
  var likeOrUnlike = data.config.data.like; // true or false
  var photoId = data.data.id;
  var currUserId = data.config.data.currUserId;
  // if was a like
  if (likeOrUnlike) {
    // put in log
    _likeLog[photoId] = currUserId;
  } else {
    // remove from log
    delete _likeLog[photoId];
  }
  // TODO: this is causing inconsistent gallery photo
  for (var i = 0; i < _photoList.length; i++) {
    var aPhoto = _photoList[i];
    if (aPhoto.id === data.data.id){
      _photoList[i] = data.data;
    }
  }
};

var _receiveTags = function(tagsArray) {
  _tagList = tagsArray;
};

var GalleryStore = assign({},EventEmitter.prototype, {

  getAllPhotos: function() {
    return _photoList;
  },

  getAllTags: function() {
    return _tagList;
  },

  getAllRequests: function() {
    return _requestList;
  },

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    }
  },

  getPhoto: function (id) {
    for (var i = 0; i < _photoList.length; i++) {
       if (_photoList[i].id === id) {
        return _photoList[i].id
       }
    };
  },

  getLikes: function(id) {
    if (_photoList[id]){
      return _photoList[id].likes;
    }
    return 0;
  },

  getPhotoLikeStatus: function(user_id, photo_id) {
    // check photos_users
    if (Object.keys(_likeLog).length === 0) {
      return true;
    }
    if (_likeLog[photo_id] !== user_id) {
      // this is how we try to init unliked
      return true;
    } else {
      return false;
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

    case AppConstants.TOGGLE_COMMENT:
      _toggleCommentDisplay(action.data);

      GalleryStore.emitChange();
      break;

    case AppConstants.TOGGLE_MODAL_PHOTO:
      _toggleModal(action.data);

      GalleryStore.emitChange();
      break;

    case AppConstants.LIKE_PHOTO:
      _updatePhotoLikes(action.data);
      GalleryStore.emitChange();
      break;

    case AppConstants.RECEIVE_PHOTO_LIKES:
      _receiveAllPhotoLikes(action.data.data);
      GalleryStore.emitChange();
      break;

    case AppConstants.TOGGLE_RESET:
      _resetToggle(action.data);     
      GalleryStore.emitChange();
      break; 

    default:
  }
});


module.exports = GalleryStore;

