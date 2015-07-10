var db = require('../config');
var Request = require('../models/request');

var Requests = new db.Collection();

Requests.model = Request;

module.exports = Requests;