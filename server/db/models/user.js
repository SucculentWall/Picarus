var db = require('../config');
require('./request');
require('./photo');
require('./comment');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  comments: function() {
    return this.hasMany('Comment');
  },
  requests: function () {
    return this.hasMany('Request');
  },
  photos: function() {
    return this.hasMany('Photo');
  }
});

module.exports = db.model('User', User);