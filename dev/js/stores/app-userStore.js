var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

//  user data
var _user = {
  requests: [],
  comments: [],
  photos: []
};

// likes
var _commentDisplay = {}; 
var _modalDisplay = {}; 

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

  // replace the photo stats
  for (var i = 0; i < _user.photos.length; i++) {
    var aPhoto = _user.photos[i];
    if (aPhoto.id === photoId) {
      _user.photos[i] = data.data;
    }    
  }
};

var _receiveProfileInfo = function(data) {
  _user = data;
};

var _receiveRequest = function(requestData) {
  if (!_user.requests) _user.requests = [];
  _user.requests.push(requestData);
};

var _receiveComment = function(commentData) {
  if (!_user.comments) _user.comments = [];
  _user.comments.push(commentData);
};

var _receivePhoto = function(photoData) {
  if (!_user.photos) _user.photos = [];
  _user.photos.push(photoData);
};

var _receiveAvatar = function(filename, id) {
  id = +id;
  _user.id = +_user.id;
  if (_user.id === id) {
    _user.avatar = filename;
  }
};

var UserStore = assign({},EventEmitter.prototype, {
  getUserId: function() {
    return _user.id;
  },

  getFacebookId: function() {
    return _user.FacebookId;
  },

  getUsername: function() {
    return _user.username;
  },

  getJoinDate: function() {
    return _user.created_at;
  },

  getUserKarma: function() {
    return _user.karma;
  },

  getRecentUserRequests: function(recent) {
    var recentUserRequests = [];
    if (!_user.requests) return [];
    for (var i = _user.requests.length-1; i >= 0 && i >= _user.requests.length-recent; i--) {
      recentUserRequests.push(_user.requests[i]);
    }
    return recentUserRequests;
  },

  getRecentUserComments: function(recent) {
    var recentUserComments = [];
    if (!_user.comments) return [];
    for (var i = _user.comments.length-1; i >= 0 && i >= _user.comments.length-recent; i--) {
      recentUserComments.push(_user.comments[i]);
    }
    return recentUserComments;
  },

  getUserPhotos: function() {
    return _user.photos;
  },

  getLikes: function(id){
    for (var i = 0; i < _user.photos.length; i++) {
      var aPhoto = _user.photos[i];
      if (aPhoto.id === id) {
        return aPhoto.likes;
      }    
    } 
    return 0;
  },

  getPhotoLikeStatus: function(user_id, photo_id) {
    if (Object.keys(_likeLog).length === 0) {
      return true;
    }
    if (_likeLog[photo_id] !== user_id) {
      return true;
    } else {
      return false;
    }
  },

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    };
  },

  getAvatar: function() {
    return _user.avatar;
  },

  getAllUserRequests: function() {
    return _user.requests;
  },

  getAllUserComments: function() {
    return _user.comments;
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

UserStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_PROFILE_INFO:
      _receiveProfileInfo(action.data);


      UserStore.emitChange();
      break;

    case AppConstants.UPDATE_AVATAR:
      _receiveAvatar(action.filename, action.id);
      UserStore.emitChange();
      break;

    // New requests
    case AppConstants.UPDATE_FEED:
      if(_user && UserStore.getUserId() === action.data.user_id) {
        _receiveRequest(action.data);
        UserStore.emitChange();
      }
      break;

    // New comments
    case AppConstants.UPDATE_COMMENT:
      if(_user && UserStore.getUserId() === action.data.user_id) {
        _receiveComment(action.data);
        UserStore.emitChange();
      }
      break;

    // New photos
    case AppConstants.UPDATE_REQUEST:
      if (_user && UserStore.getUserId() === action.data.user_id){
        _receivePhoto(action.data);
        UserStore.emitChange();        
      }
      break;

    // Comment toggle
    case AppConstants.TOGGLE_COMMENT:
      _toggleCommentDisplay(action.data);
      UserStore.emitChange();
      break;

    // Modal toggle  
    case AppConstants.TOGGLE_MODAL_PHOTO:
      _toggleModal(action.data);
      UserStore.emitChange();
      break;

    // reset toggle on page change
    case AppConstants.TOGGLE_RESET:
      _resetToggle(action.data);     
      UserStore.emitChange();
      break;

    // liked a photo  
    case AppConstants.LIKE_PHOTO:
      _updatePhotoLikes(action.data);
      UserStore.emitChange();
      break;

    // load likes of photos into _likeLog
    case AppConstants.RECEIVE_PHOTO_LIKES:
      _receiveAllPhotoLikes(action.data.data);
      UserStore.emitChange();
      break;

    default:
  }
});

module.exports = UserStore;

