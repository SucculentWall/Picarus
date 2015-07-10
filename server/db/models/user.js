var db = require('../config');
require('./request');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  requests: function () {
    return this.hasMany('Request');
  }
});

module.exports = User;