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

  getRequest:function (id) {
    axios.get('/api/requests/'+id)
      .then(function(response) {
        AppActions.receiveRequest(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addRequest: function(text, username, tags) {
    var context = this;
    axios.post('/api/requests', {
        text: text,
        username: username,
        tags: tags
      })
      .then(function(response) {
        //Once added, requery the database
        context.getAllRequests();
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addPhoto: function(photo, username, request_id, tags) {
    var context = this;
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('photo', photo);
    data.append('tags', JSON.stringify(tags));
    console.log('these are strung tags: ', JSON.stringify(tags));
    axios.post('/api/photos', data)
      .then(function(response) {
        //Once added, requery the database
        context.getRequest(request_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllPhotos: function() {
    axios.get('/api/photos')
      .then(function(response) {
        AppActions.receiveAllPhotos(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  findOrCreateUser: function(id) {
    console.log('BEGINS QUERY', id);
    axios.post('/api/users', {username: id})
      .then(function(response) {
        console.log('GOT TO FIND OR CREATES');
        AppActions.loggedIn(response);
      })
      .catch(function(error) {
        console.log('FAILED TO FIND OR CREATES');
        AppActions.notLoggedIn(error);
      });
  }
};