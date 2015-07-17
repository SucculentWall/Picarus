var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

//  user data
var _user;

var _receiveProfileInfo = function(data) {
  _user = data;
};

var _receiveRequest = function(requestData) {
  _user.requests.push(requestData);
};

var _receiveComment = function(commentData) {
  _user.comments.push(commentData);
};

var _receivePhoto = function(photoData) {
  _user.photos.push(photoData);
};

var _receiveAvatar = function(avatarPath) {
  _user.avatar = avatarPath;
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
      console.log('UPDATE AVATAR', action.data);
      _receiveAvatar(action.data);
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
      console.log('UPDATE_COMMENT action.data: ', action.data);
      if (_user && UserStore.getUserId() === action.data.user_id){
      _receiveComment(action.data);
      UserStore.emitChange();
      }
      break;

    // New photos
    case AppConstants.UPDATE_REQUEST:
      console.log(action.data);
      if (_user && UserStore.getUserId() === action.data.user_id){
        _receivePhoto(action.data);
        UserStore.emitChange();        
      }
      break;

    default:
  }
});

module.exports = UserStore;

