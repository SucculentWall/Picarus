var db = require('../config');
require('./user');
require('./photo');

var Request = db.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  photos: function() {
    return this.hasMany('Photo');
  }
});

module.exports = db.model('Request', Request);