var axios = require('axios');
var AppActions = require('../actions/app-actions');

module.exports = {
  
  getAllRequests: function() {
    axios.get('/api/requests')
      .then(function(response) {
        AppActions.receiveAllRequests(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllTags: function() {
    axios.get('/api/tags')
      .then(function(response) {
        AppActions.receiveTags(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addRequest: function(text, username, tags) {
    // var context = this;
    axios.post('/api/requests', {
        text: text,
        username: username,
        tags: tags
      })
      .then()
      .catch(function(error) {
        console.log(error);
      });
  },

  //get comments attached to particular photo, given the photo's id
  getComments:function (id) {
    axios.get('/api/comments/photo/'+id)
      .then(function(response) {
        AppActions.receiveComments(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getRequest:function (id) {
    axios.get('/api/requests/'+id)
      .then(function(response) {
        AppActions.receiveRequest(response); 
        // use this to get the comments on this request's photos     
        for (var i = 0; i < response.data.photos.length; i++) {
          var photo = response.data.photos[i];
          AppActions.loadComments(photo.id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addComment: function(text, username, photo_id, request_id) {
    // var context = this;
    axios.post('/api/comments', {
        text: text,
        username: username,
        photo_id: photo_id,
        request_id: request_id
      })
      .then(function(response) {
        AppActions.receiveComments(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addPhoto: function(photo, username, request_id, tags, description) {
    var context = this;
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('photo', photo);
    data.append('tags', JSON.stringify(tags));
    data.append('description', description);
    axios.post('/api/photos', data)
      .then(function(response) {
        // no longer need to requery (socket emit will trigger it)
        // context.getRequest(request_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllPhotos: function() {
    axios.get('/api/photos')
      .then(function(response) {
        AppActions.receivePhotos(response.data);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getPhotosForTag: function(tagName) {
    axios.get('/api/tags/'+tagName)
      .then(function(response) {
        AppActions.receivePhotos(response.data.photos);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getPhotosForSearch: function(query) {
    axios.get('api/search/'+query)
      .then(function(response) {
        AppActions.receivePhotos(response.data.photos);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getRequestsForSearch: function(query) {
    axios.get('api/search/'+query)
      .then(function(response) {
        AppActions.receiveSearchRequests(response.data.requests);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  findOrCreateUser: function(id, name, token) {
    axios.post('/api/users', {FacebookId: id, username: name })
      .then(function(response) {
        AppActions.loggedIn(response.data, token);
      })
      .catch(function(error) {
        AppActions.notLoggedIn(error);
      });
  },

  likePhoto: function(photoId) {
    axios.post('/api/photos/likes', {photo_id: photoId, like: true}) // this api request goes to photoRouter
      .then(function(response) {  // this reponse AppActions to fire an action type
        AppActions.receivePhotoLike(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  unlikePhoto: function(photoId) {
    axios.post('/api/photos/likes', {photo_id: photoId, like: false}) // this api request goes to photoRouter
      .then(function(response) {  // this reponse AppActions to fire an action type
        AppActions.receivePhotoLike(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 

  getProfileInfo: function(user_id) {
    axios.get('/api/users/' + user_id)
      .then(function(response) {
        AppActions.receiveProfileInfo(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addAvatar: function(photo, user_id) {
    var context = this;
    var data = new FormData();
    data.append('photo', photo);
    data.append('user_id', user_id);
    axios.post('/api/users/avatars', data)
      .then(function(response) {
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getPhotoLikes: function(user_id, photos) {
    axios.get('/api/photos/check', {user_id: user_id, photos: photos})
      .then(function(response) {
        AppActions.receivePhotoLikesCheck(response);
      })
      .catch(function(error) {
        // not found
      });
  }
};