var axios = require('axios');
var AppActions = require('../actions/app-actions');
var AuthStore = require('../stores/app-authStore');

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
        tags: tags,
        access_token: AuthStore.getToken()
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
        request_id: request_id,
        access_token: AuthStore.getToken()
      })
      .then(function(response) {
        AppActions.receiveComments(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addPhoto: function(photo, username, request_id, tags, description, size) {
    var context = this;
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('tags', JSON.stringify(tags));
    data.append('description', description);
    data.append('size', size);
    data.append('photo', photo);
    data.append('access_token', AuthStore.getToken());
    console.log('DATA FROM DBUTILS: ', data);
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

        // make all to be untoggled
        for (var i = 0; i < response.data.length; i++) {
          var id = response.data[i].id;
          AppActions.toggleReset(id);
        }   
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
    axios.post('/api/users', {FacebookId: id, username: name, access_token: token})
      .then(function(response) {
        AppActions.loggedIn(response.data, token);
      })
      .catch(function(error) {
        AppActions.notLoggedIn(error);
      });
  },

  logout: function() {
    axios.post('/api/logout', {})
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  likePhoto: function(photoId, currUserId) {
    axios.post('/api/photos/likes', {photo_id: photoId, like: true, currUserId: currUserId }) // this api request goes to photoRouter
      .then(function(response) {  // this reponse AppActions to fire an action type
        AppActions.receivePhotoLike(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  unlikePhoto: function(photoId, currUserId) {
    axios.post('/api/photos/likes', {photo_id: photoId, like: false, currUserId: currUserId }) // this api request goes to photoRouter
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

        // make sure their toggle statuses are false
        var photos = response.data.photos;
        if (photos) {
          for (var i = 0; i < photos.length; i++) {
            var id = photos[i].id;
            AppActions.toggleReset(id);
          }
        }
      })
      .catch(function(error) {
        console.log('dispatching in the middle: ',error);
      });
  },

  addAvatar: function(photo, user_id, size) {
    var context = this;
    var data = new FormData();
    data.append('size', size);
    data.append('user_id', user_id);
    data.append('photo', photo);
    axios.post('/api/users/avatars', data)
      .then(function(response) {
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getPhotoLikes: function(user_id, photos) {
    // axios.get('/api/photos/check', {params: {user_id: user_id, photos: photos}})
    axios.post('/api/photos/check', {user_id: user_id, photos: photos})
      .then(function(response) {
        AppActions.receivePhotoLikesCheck(response);
      })
      .catch(function(error) {
        // not found
      });
  }
};