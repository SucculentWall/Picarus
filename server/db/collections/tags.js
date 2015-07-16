var db = require('../config');
var Tag = require('../models/tag');

var Tags = new db.Collection();

Tags.model = Tag;

module.exports = Tags;