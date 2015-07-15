var db = require('../config');
require('./user');
require('./request');
require('./tag');
require('./comment');

var Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  request: function() {
    return this.belongsTo('Request');
  },
  tags: function() {
    return this.belongsToMany('Tag');
  },
  comments: function() {
    return this.hasMany('Comment');
  }
});

module.exports = db.model('Photo', Photo);