var db = require('../config');
require('./user');

var Request = db.Model.extend({
  tableName: 'requests',
  hasTimestamps: true,
  requests: function () {
    return this.belongsTo('User');
  }
});

module.exports = Request;