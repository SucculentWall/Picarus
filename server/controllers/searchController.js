var Photo = require('../db/models/photo');
var Request = require('../db/models/request');
var Photos = require('../db/collections/photos');
var Promise = require('bluebird');

module.exports = {
  getPhotosForSearch : function(req, res, next){
    var query = req.params.query;

    new Photo()
      .query(function(qb) {
        qb.leftOuterJoin('photos_tags', 'photos_tags.photo_id', '=', 'photos.id')
          .leftOuterJoin('tags', 'photos_tags.tag_id', '=', 'tags.id')
          .whereRaw("to_tsvector('english', coalesce(description,'') || ' ' || coalesce(tagname,'')) @@ to_tsquery('english', '"+ query+ "')")
      })
      .fetchAll()
      .then(function(photos){
        new Request()
        .query(function(qb) {
          qb.leftOuterJoin('requests_tags', 'requests_tags.request_id', '=', 'requests.id')
            .leftOuterJoin('tags', 'requests_tags.tag_id', '=', 'tags.id')
            .whereRaw("to_tsvector('english', coalesce(text,'') || ' ' || coalesce(tagname,'')) @@ to_tsquery('english', '"+ query+ "')");
        })
        .fetchAll()
        .then(function(requests) {
          var uniq = {};
          var transferArray = [];
          for (var i = 0; i < photos.models.length; i++) {
            uniq[photos.models[i]['id']] = photos.models[i];
          };
          for (var key in uniq) {
            transferArray.push(uniq[key]);
          }
          photos.models = transferArray;

          uniq = {};
          transferArray = [];
          for (var i = 0; i < requests.models.length; i++) {
            uniq[requests.models[i]['id']] = requests.models[i];
          };
          for (var key in uniq) {
            transferArray.push(uniq[key]);
          }
          requests.models = transferArray;

          if (photos && requests) {
            res.send({photos:photos, requests: requests});
          } else if (photos){
            res.send({photos:photos, requests: 'no results found'});
          } else if (requests){
            res.send({photos:'no results found', requests: requests});
          } else {
            res.send('no results found');
          }
        });
      }); 

  }
};
