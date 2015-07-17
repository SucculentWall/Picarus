var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;


//  user data
var _user;

var _receiveProfileInfo = function(data) {
  _user = data;
};
// var _receiveRequest = function(data) {
//   // console.log('requestStore received request data: ', data);
//   _request = data;
// };

// var _receivePhoto = function(photoData) {
//   // console.log('requestStore received photo data: ', photoData);
//   _request.photos.push(photoData);
// };

// var _receiveComments = function(photoData) {
//   // console.log('received photo data: ', photoData);
//   _comments[photoData.data.id] = photoData.data.comments;
// };

// var _receiveNewComment = function(commentData) {
//   _comments[commentData.photo_id].push(commentData);
// };

var UserStore = assign({},EventEmitter.prototype, {
  getProfileInfo: function() {
    return _user;
  },
  // getAllComments: function() {
  //   return _comments;
  // },

  // getComment: function(photoId) {
  //   return _comments[photoId];
  // },

  // getPhotos: function() {
  //   return _request.photos;
  // },

  // getId: function () {
  //   return _request.id;
  // },

  // getUsername: function () {
  //   return _request.user.username;
  // },

  // getTags: function () {
  //   return _request.tags; // [{tagname: 'dogs'}, {}, {} ]
  // },

  // getText: function () {
  //   return _request.text;
  // },

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

    // case AppConstants.UPDATE_FEED:
    //   UserStore.emitChange();
    //   break;

    case AppConstants.RECEIVE_PROFILE_INFO:
      _receiveProfileInfo(action.data);
      UserStore.emitChange();
      break;

    // case AppConstants.RECEIVE_COMMENTS:
    //   _receiveProfileInfo(action.data);
    //   UserStore.emitChange();
    //   break;


    // case AppConstants.UPDATE_REQUEST:
    //   if (UserStore.getId() === action.data.request_id){
    //     _receivePhoto(action.data);
    //     UserStore.emitChange();        
    //   }
    //   break;

    // case AppConstants.RECEIVE_COMMENTS:
    //   _receiveComments(action.data);
    //   UserStore.emitChange();        
    //   break;

    // case AppConstants.UPDATE_COMMENT:
    //   console.log('detecting change');
    //   console.log('here are comments: ', _comments);
    //   // ^-- not updating for the other end of socket
    //   console.log('this is action.data: ', action.data);
    //   _receiveNewComment(action.data);
    //   UserStore.emitChange();        
    //   break;

    default:
  }
});

module.exports = UserStore;

