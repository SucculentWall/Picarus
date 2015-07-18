var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

// the single request being shown on the page
var _request = {};
// the comments on the above single request
  // each item within is an object tied to photoId key
var _comments = {};
var _commentDisplay = {}; // photo_ids are keys
var _modalDisplay = {}; // eg photo_id: true

// whether or not a photo is liked (user : photo)
var _likeLog = {};

var _receiveRequest = function(data) {
  // console.log('requestStore received request data: ', data);
  // each time you click a req from the feed, overwrite the previously focused req
  _request = data;
};

var _receivePhoto = function(photoData) {
  // console.log('requestStore received photo data: ', photoData);
  // _request.photos is an array of the photo objects on THIS request
  _request.photos.push(photoData);
};

var _receiveComments = function(photoData) {
  _comments[photoData.data.id] = photoData.data.comments;
};

var _toggleCommentDisplay = function(id) {
  var display = _commentDisplay[id] || false; 
  _commentDisplay[id] = !display;
  // console.log('comment display toggled FROM ', display, ' TO ', _commentDisplay[id]);
};

var _toggleModal = function(id) {
  var modal = _modalDisplay[id] || false;
  _modalDisplay[id] = !modal;
  console.log('modal toggle display toggled FROM ', modal, ' TO ', _modalDisplay[id]);
};

var _receiveNewComment = function(commentData) {
  _comments[commentData.photo_id].push(commentData);
};

var _receiveNewLike = function(likeData) {
  // console.log('this is data from the liking: ', likeData);
  // _request[likeData.photo_id].push(likeData);
  // console.log('this is _request.photos: ',_request.photos);
  // update _request.photos array (iterate to find photo first)
  for (var i = 0; i < _request.photos.length; i++) {
    var aPhoto = _request.photos[i];
    if (aPhoto.id === likeData.data.id){
      _request.photos[i] = likeData.data;
    }
  }
};

var _receiveAllPhotoLikes = function(joinData) {
  _likeLog = joinData;
}

var RequestStore = assign({},EventEmitter.prototype, {
  getAllComments: function() {
    return _comments;
  },

  getComment: function(photoId) {
    // if (_comments[photoId]) { 
    //   return _comments[photoId]; // {showCommentEntry: false, comments: [...] }
    // } else {
    //   _comments[photoId] = {comments:[], showCommentEntry: false, showModal: false};
    // }
    return _comments[photoId]; 
  },

  getDisplayToggle: function(id){
    return {
      showCommentEntry: _commentDisplay[id],
      showModal: _modalDisplay[id]
    }
  },

  getPhotos: function() {
    return _request.photos; // an ARRAY of photos
  },

  getLikes: function(id) {
    // console.log('this is the id that was passed in--- ', id);
    // console.log('this is request? :', _request);
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
    return _request.tags; // [{tagname: 'dogs'}, {}, {} ]
  },

  getText: function () {
    return _request.text;
  },

  getPhotoLikeStatus: function (user_id, photo_id) {
    if (_likeLog[user_id] === photo_id) {
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
    // pickRequest in SelectedRequest View (on mount) -> getRequest ajax fn -> receiveRequest action type dispatch
    case AppConstants.RECEIVE_REQUEST:
      _receiveRequest(action.data.data);
      RequestStore.emitChange();
      break;

    // when a new picture is added (photos are what update the single request page)
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

    case AppConstants.TOGGLE_COMMENT:
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
      _receiveAllPhotoLikes(action.data);
      RequestStore.emitChange();
      break;

    default:
  }
});


module.exports = RequestStore;

