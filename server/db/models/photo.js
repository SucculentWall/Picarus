var db = require('../config');
require('./user');
require('./request');
require('./tag');

var Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  requests: function() {
    return this.belongsTo('Request');
  },
  tags: function() {
    return this.belongsToMany('Tag');
  }
});

module.exports = db.model('Photo', Photo);