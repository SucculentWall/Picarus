var db = require('../config');
require('./user');
require('./request');

var UserLikedRequest = db.Model.extend({
  tableName: 'users_liked_requests',
  request: function () {
    return this.belongsTo('Request');
  },
  user: function(){
    return this.belongsTo('User');
  }
});

module.exports = db.model('UserLikedRequest', UserLikedRequest);