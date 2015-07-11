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
  request: function() {
    return this.belongsTo('Request');
  },
  tag: function() {
    return this.belongsToMany('Tag');
  }
});

module.exports = db.model('Photo', Photo);