var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;

//  all or most recent photo requests
var _photoList = {};
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
  // console.log('modal toggle display toggled FROM ', modal, ' TO ', _modalDisplay[id]);
};

var _receiveAllPhotoLikes = function(joinData) {
  console.log('coming in join data: ', joinData);
  // joinData is an array of objects
  _likeLog = {};
  for (var i = 0; i < joinData.length; i++) {
    var obj = joinData[i];
    _likeLog[obj.photo_id] = true; 
  }
  console.log('this is like_log: ', _likeLog);
};

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

var _updatePhotoLikes = function(data) {
  console.log('this is data passed to Gall: ', data);
  var likeOrUnlike = data.config.data.like; // true or false
  var photoId = data.data.id;
  // if was a like
  if (likeOrUnlike) {
    // put in log
    _likeLog[photoId] = true;
  } else {
    // remove from log
    delete _likeLog[photoId];
  }
  _photoList[photoId] = data.data;
};

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

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    }
  },

  getPhoto: function (id) {
    return _photoList[id];
  },

  getLikes: function(id) {
    console.log('this is photoList from galleryStore: ', _photoList);
    if (_photoList[id]){
      return _photoList[id].likes;
    }
    return 0;
  },

  getPhotoLikeStatus: function(photo_id) {
    console.log('da like log: ', _likeLog);
    // check photos_users
    if (Object.keys(_likeLog).length === 0) {
      console.log('zero likes!'); 
      return true;
    }
    if (_likeLog[photo_id] === undefined) {
      // this is how we try to init unliked
      return true;
    } else {
      console.log('this doesn\'t run?');
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

    case AppConstants.TOGGLE_REQUEST_PHOTO:
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


    default:
  }
});


module.exports = GalleryStore;

