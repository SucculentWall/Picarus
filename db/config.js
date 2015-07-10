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

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.timestamps();
    }).then(function(table) {
      console.log('Created table:', table);
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
      console.log('Created table:', table);
    });
  }
});

module.exports = db;