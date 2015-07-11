var db = require('../config');
require('./user');
require('./request');

var Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
  request: function() {
    return this.belongsTo('Request');
  }
});

module.exports = db.model('Photo', Photo);