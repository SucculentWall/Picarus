var db = require('../config');
var Comment = require('../models/Comment');

var Comments = new db.Collection();

Comments.model = Comment;

module.exports = Comments;