var Tag = require('../db/models/tag');
var Tags = require('../db/collections/tags');
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
  },

  getAllTags: function (req, res, next) {
    Tags.reset()
      .query(function(qb){
        qb.orderBy('photos_count','DESC'); 
      })
      .fetch()
      .then(function (tags) {
        res.send(tags);
      });
  },

  getInfoForTag: function(req, res, next){
    var tag = req.params.tag;

    new Tag({tagname: tag})
      .fetch({
        withRelated: ['requests', 'photos']
      })
      .then(function(found){
        if (found) {
          res.send(found);
        } else {
          res.send('no tag found');
        }
      }); 

  }
}

