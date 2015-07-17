var db = require('../config');
require('./user');
require('./photo');

var UserLikedPhoto = db.Model.extend({
  tableName: 'users_liked_photos',
  photo: function () {
    return this.belongsTo('Photo');
  },
  user: function(){
    return this.belongsTo('User');
  }
});

module.exports = db.model('UserLikedPhoto', UserLikedPhoto);