var db = require('../config');
require('./user');
require('./photo');
require('./tag');

var Request = db.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  photos: function() {
    return this.hasMany('Photo');
  },
  tags: function(){
    return this.belongsToMany('Tag');
  }
});

module.exports = db.model('Request', Request);