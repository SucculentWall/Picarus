var db = require('../config');
require('./photo');
require('./request');

var Tag = db.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  requests: function() {
    return this.belongsToMany('Request');
  },
  photos: function() {
    return this.belongsToMany('Photo');
  }
});

module.exports = db.model('Tag', Tag);