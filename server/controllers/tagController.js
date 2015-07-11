var Tag = require('../db/models/tag');
var Promise = require('bluebird');

module.exports = {
  findOrCreate: function (tagName) {
    return new Promise(function(resolve, reject){
      new Tag({tagname: tagName})
      .fetch()
      .then(function (found) {
        if (found) {
          resolve(found);
        } else {
          var newTag = new Tag({tagname: tagName});
          newTag.save()
            .then(function (created) {
              resolve(created);
            });
        }
      })
      .catch(reject);
    }); // close Promise   
  }
}

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