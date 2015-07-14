var db = require('../config');
require('./user');
require('./photo');

var Comment = db.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  photo: function() {
    return this.belongsTo('Photo');
  }
});

module.exports = db.model('Comment', Comment);