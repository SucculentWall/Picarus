var db = require('../config');
require('./tag');
require('./photo');

var PhotoTag = db.Model.extend({
  tableName: 'photos_tags',
  photo: function () {
    return this.belongsTo('Photo');
  },
  tag: function(){
    return this.belongsTo('Tag');
  }
});

module.exports = db.model('PhotoTag', PhotoTag);