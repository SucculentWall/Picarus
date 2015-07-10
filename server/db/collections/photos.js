var db = require('../config');
var Photo = require('../models/photo');

var Photos = new db.Collection();

Photos.model = Photo;

module.exports = Photos;