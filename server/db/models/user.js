var db = require('../config');
require('./request');
require('./photo');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  requests: function () {
    return this.hasMany('Request');
  },
  photos: function() {
    return this.hasMany('Photo');
  }
});

module.exports = db.model('User', User);