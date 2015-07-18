var db = require('../config');
require('./user');
require('./photo');

var PhotoUser = db.Model.extend({
  tableName: 'photos_users',
  photo: function () {
    return this.belongsTo('Photo');
  },
  user: function(){
    return this.belongsTo('User');
  }
});

module.exports = db.model('PhotoUser', PhotoUser);