var Photo = require('../db/models/photo');
var Photos = require('../db/collections/photos');
var Promise = require('bluebird');

module.exports = {
  getPhotosForSearch : function(req, res, next){
    var query = req.params.query;

    new Photo()
      .query(function(qb) {
        qb.fullOuterJoin('photos_tags', 'photos_tags.photo_id', '=', 'photos.id')
          .fullOuterJoin('tags', 'photos_tags.tag_id', '=', 'tags.id')
          .whereRaw("to_tsvector('english', coalesce(description,'') || ' ' || coalesce(tagname,'')) @@ to_tsquery('english', '"+ query+ "')");
      })
      .fetchAll()
      .then(function(found){
        if (found) {
          res.send(found);
        } else {
          res.send('no results found');
        }
      }); 
    // requests
    // photos
  }
};

/*

// getInfoForUser: function(req, res, next) {
//   var username = req.params.username;

//   new User({username: username})
//     .fetch({
//       withRelated: ['requests', 'photos']
//     })
//     .then(function (found) {
//       if (found) {
//         res.send(found);
//       } else {
//         res.send('User not found!');
//       }
//     });
// }



// // checks for #thisIsHashtag
// var tagRegEx = /\S*#(?:\[[^\]]+\]|\S+)/ig;
// var tags = data.text.match(tagRegEx); // ['#barcelona, #sunset']
// var refinedTags = tags.map(function(tag){});
// ^--- move into client! 

// loop over the tags
for (var i = 0; i < data.tags.length; i++) {
  var tag = data.tags[i];
  // find or create each tag
  new Tag({tagname: tag})
    .fetch()
    .then(function(found){
      if (found){
        
      }
    })
}
*/