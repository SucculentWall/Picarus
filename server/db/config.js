var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
var dbuser = process.env.DBUSERNAME || 'root';
var dbpassword = process.env.DBPASSWORD || '';
var dbname = process.env.DBNAME || 'picarus';

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : host,
    user     : dbuser,
    port    : port,
    password : dbpassword,
    database : dbname,
    charset  : 'utf8'
  }
});

var db = require('bookshelf')(knex);
db.plugin('registry');

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('FacebookId', 100).unique();
      user.string('username', 100);
      user.integer('karma', 11).defaultTo(0);
      user.string('avatar', 100).defaultTo('defaultAvatar.png');
      user.timestamps();
    }).then(function(table) {
      console.log('Created users table');
    });
  }
});

db.knex.schema.hasTable('requests').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('requests', function (request) {
      request.increments('id').primary();
      request.string('text', 255);
      request.integer('likes', 11).defaultTo(0);
      request.integer('user_id').unsigned();
      request.timestamps();
    }).then(function(table) {
      console.log('Created requests table');
    });
  }
});

db.knex.schema.hasTable('photos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos', function (photo) {
      photo.increments('id').primary();
      photo.string('filename', 100);
      photo.string('filetype', 100);
      photo.string('username', 100);
      photo.string('description', 100);
      photo.integer('likes', 11).defaultTo(0);
      photo.integer('user_id').unsigned();
      photo.integer('request_id').unsigned();
      photo.timestamps();
    }).then(function(table) {
      console.log('Created photos table');
    });
  }
});

db.knex.schema.hasTable('comments').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('comments', function (comment) {
      comment.increments('id').primary();
      comment.string('text', 255);
      comment.string('username', 100);
      comment.integer('likes', 11).defaultTo(0);
      comment.integer('user_id').unsigned();
      comment.integer('photo_id').unsigned();
      comment.integer('request_id').unsigned();
      comment.timestamps();
    }).then(function(table) {
      console.log('Created comments table');
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function(tag) {
      tag.increments('id').primary();
      tag.string('tagname', 60).unique();
      tag.integer('photos_count', 11).defaultTo(0);
    }).then(function(table) {
      console.log('Created tags table');
    });
  }
});

db.knex.schema.hasTable('photos_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos_tags', function(photo_tag) {
      photo_tag.increments('id').primary();
      photo_tag.integer('photo_id');
      photo_tag.integer('tag_id');
    }).then(function(table) {
      console.log('Created photos_tags table');

      // db triggers on photo like
      var trigFunc = "CREATE FUNCTION incer() RETURNS trigger AS $$ \nBEGIN \n UPDATE users SET karma = karma+1 WHERE id = NEW.user_id; \nRETURN NULL; \n END; \n $$ LANGUAGE plpgsql;";

      db.knex.raw(trigFunc)
      .then(function(response){
        console.log('defined incer()');

        // create trigger itself AFTER creating its function
        var trigger = "CREATE TRIGGER bumpKarma AFTER UPDATE OF likes ON photos FOR EACH ROW EXECUTE PROCEDURE incer();";

        db.knex.raw("CREATE TRIGGER bumpKarma AFTER UPDATE OF likes ON photos FOR EACH ROW EXECUTE PROCEDURE incer();")
        .then(function(response){
          console.log('defined bumpKarma trigger');
        });
      });

    });
  }
});

db.knex.schema.hasTable('requests_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('requests_tags', function(request_tag) {
      request_tag.increments('id').primary();
      request_tag.integer('request_id');
      request_tag.integer('tag_id');
    }).then(function(table) {
      console.log('Created requests_tags table');
    });
  }
});


db.knex.schema.hasTable('photos_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos_users', function(photo_user) {
      photo_user.increments('id').primary();
      photo_user.integer('user_id');
      photo_user.integer('photo_id');
    }).then(function(table) {
      console.log('Created photos_users');

      // db triggers on photo UNlike (when a photos_users row is destroyed)
      var trigFunc = "CREATE FUNCTION decer() RETURNS trigger AS $$ \nBEGIN \n UPDATE users SET karma = karma-2 WHERE id = OLD.user_id; \nRETURN NULL; \n END; \n $$ LANGUAGE plpgsql;";

      db.knex.raw(trigFunc)
      .then(function(response){
        console.log('defined decer()');

        // create trigger itself AFTER creating its function
        //var trigger = "CREATE TRIGGER decKarma AFTER UPDATE OF likes ON photos FOR EACH ROW EXECUTE PROCEDURE decer();";

        db.knex.raw("CREATE TRIGGER decKarma AFTER DELETE ON photos_users FOR EACH ROW EXECUTE PROCEDURE decer();")
        .then(function(response){
          console.log('defined decKarma trigger');
        });
      });


    });
  }
});

// create users_liked_requests join table

db.knex.schema.hasTable('users_liked_requests').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users_liked_requests', function(user_liked_request) {
      user_liked_request.increments('id').primary();
      user_liked_request.integer('user_id');
      user_liked_request.integer('request_id');
    }).then(function(table) {
      console.log('Created users_liked_request table');
    });
  }
});


module.exports = db;