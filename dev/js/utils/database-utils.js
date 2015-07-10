var axios = require('axios');
var AppActions = require('../actions/app-actions');

module.exports = {
  
  getAllRequests: function() {
    axios.get('/requests')
      .then(function(response) {
        console.log(response); 
        AppActions.receiveAllRequests(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addRequest: function(text, username) {
    axios.post('/requests', {
        text: text,
        username: username
      })
      .then(function(response) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};