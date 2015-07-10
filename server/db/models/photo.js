var db = require('../config');
require('./user');

var Photo = db.Model.extend({
  tableName: 'photos',
  hasTimestamps: true,
  photos: function () {
    return this.belongsTo('User');
  }
});

module.exports = Photo;