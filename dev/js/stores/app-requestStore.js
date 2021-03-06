var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

// the single request being shown on the page
var _request = {};
var _comments = {};
var _commentDisplay = {}; 
var _modalDisplay = {}; 

var _likeLog = {};

var _receiveRequest = function(data) {
  // each time you click a req from the feed, overwrite the previously focused req
  _request = data;
};

var _receivePhoto = function(photoData) {
  // _request.photos is an array of the photo objects on THIS request
  _request.photos.push(photoData);
};

var _receiveComments = function(photoData) {
  _comments[photoData.data.id] = photoData.data.comments;
};

var _toggleCommentDisplay = function(id) {
  var display = _commentDisplay[id] || false; 
  _commentDisplay[id] = !display;
};

var _toggleModal = function(id) {
  var modal = _modalDisplay[id] || false;
  _modalDisplay[id] = !modal;
};

var _receiveNewComment = function(commentData) {
  _comments[commentData.photo_id].push(commentData);
};

var _receiveNewLike = function(likeData) {
  var likeOrUnlike = likeData.config.data.like; // true or false
  var photoId = likeData.data.id;
  var currUserId = likeData.config.data.currUserId;

  // if was a like
  if (likeOrUnlike) {
    // put in log
    _likeLog[photoId] = currUserId;
  } else {
    // remove from log
    delete _likeLog[photoId];
  }
  if (_request.photos){
    for (var i = 0; i < _request.photos.length; i++) {
      var aPhoto = _request.photos[i];
      if (aPhoto.id === likeData.data.id){
        _request.photos[i] = likeData.data;
      }
    }
  }
};

var _receiveAllPhotoLikes = function(joinData) {
  // joinData is an array of objects
  _likeLog = {};
  for (var i = 0; i < joinData.length; i++) {
    var obj = joinData[i];
    _likeLog[obj.photo_id] = obj.user_id; 
  }
};

var RequestStore = assign({},EventEmitter.prototype, {
  getAllComments: function() {
    return _comments;
  },

  getComment: function(photoId) {
    return _comments[photoId]; 
  },

  getNumComments: function(photoId){
    if (_comments[photoId]) {
      return _comments[photoId].length;
    }
  },

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    }
  },

  getPhotos: function() {
    return _request.photos; 
  },

  getLikes: function(id) {
    var searched = _request.photos.filter(function(eachPhoto){
      return eachPhoto.id === id;
    });

    if (searched.length){
      return searched[0].likes;
    } else {
      return 0;
    }
  },

  getId: function () {
    return _request.id;
  },

  getUsername: function () {
    return _request.user.username;
  },

  getUserId: function () {
    return _request.user.id;
  },

  getTags: function () {
    return _request.tags;
  },

  getText: function () {
    return _request.text;
  },

  getPhotoLikeStatus: function (user_id, photo_id) {
    // if the picture has 0 likes
    if (Object.keys(_likeLog).length === 0) {
      return true;
    }
    if (_likeLog[photo_id] !== user_id) {
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

RequestStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {
    case AppConstants.RECEIVE_REQUEST:
      _receiveRequest(action.data.data);
      RequestStore.emitChange();
      break;

    case AppConstants.UPDATE_REQUEST:
      if (RequestStore.getId() === action.data.request_id){
        _receivePhoto(action.data);
        RequestStore.emitChange();        
      }
      break;

    case AppConstants.RECEIVE_COMMENTS:
      _receiveComments(action.data);
      RequestStore.emitChange();        
      break;

    case AppConstants.UPDATE_COMMENT:
      _receiveNewComment(action.data);
      RequestStore.emitChange();        
      break;

    case AppConstants.TOGGLE_COMMENT_REQUEST:
      _toggleCommentDisplay(action.data);
      RequestStore.emitChange();
      break;

    case AppConstants.TOGGLE_REQUEST_PHOTO:
      _toggleModal(action.data);
      RequestStore.emitChange();
      break;

    case AppConstants.LIKE_PHOTO:
      _receiveNewLike(action.data);
      RequestStore.emitChange();
      break;

    case AppConstants.RECEIVE_PHOTO_LIKES:
      _receiveAllPhotoLikes(action.data.data);
      RequestStore.emitChange();
      break;

    default:
  }
});


module.exports = RequestStore;

