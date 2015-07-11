var db = require('../config');
require('./tag');
require('./request');

var RequestTag = db.Model.extend({
  tableName: 'requests_tags',
  request: function () {
    return this.belongsTo('Request');
  },
  tag: function(){
    return this.belongsTo('Tag');
  }
});

module.exports = db.model('RequestTag', RequestTag);