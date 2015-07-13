var axios = require('axios');
var AppActions = require('../actions/app-actions');


module.exports = {
  
  getAllRequests: function() {
    axios.get('/requests')
      .then(function(response) {
        AppActions.receiveAllRequests(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getRequest:function (id) {
    axios.get('/requests/'+id)
      .then(function(response) {
        AppActions.receiveRequest(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addRequest: function(text, username, tags) {
    var context = this;
    axios.post('/requests', {
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
    axios.post('/photos', data)
      .then(function(response) {
        //Once added, requery the database
        context.getRequest(request_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllPhotos: function() {
    axios.get('/photos')
      .then(function(response) {
        AppActions.receiveAllPhotos(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};