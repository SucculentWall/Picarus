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

  addRequest: function(text, username) {
    var context = this;
    axios.post('/requests', {
        text: text,
        username: username
      })
      .then(function(response) {
        //Once added, requery the database
        context.getAllRequests();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};