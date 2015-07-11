var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : '',
    port    : 5432,
    password : '',
    database : 'icarus',
    charset  : 'utf8'
  }
});

var db = require('bookshelf')(knex);
db.plugin('registry');

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
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
      request.integer('user_id').unsigned().references('id').inTable('users');
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
      photo.integer('user_id').unsigned().references('id').inTable('users');
      photo.integer('request_id').unsigned().references('id').inTable('requests');
      photo.timestamps();
    }).then(function(table) {
      console.log('Created photos table');
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function(tag) {
      tag.increments('id').primary();
      tag.string('tagname', 60);
    });
  }
});

db.knex.schema.hasTable('photos_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos_tags', function(photo_tag) {
      photo_tag.increments('id').primary();
      photo_tag.integer('photo_id');
      photo_tag.integer('tag_id');
    });
  }
});

db.knex.schema.hasTable('requests_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('requests_tags', function(request_tag) {
      request_tag.increments('id').primary();
      request_tag.integer('request_id');
      request_tag.integer('tag_id');
    });
  }
});




module.exports = db;