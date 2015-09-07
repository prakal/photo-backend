var knex =  !process.env.DATABASE_URL ? require('../local_config.js') :
  require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var db = require('bookshelf')(knex);
db.plugin('registry');

db.knex.schema.hasTable('photos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('photos', function (table) {
      //normal stuff
      table.increments('id').primary();
      table.string('image_url', 255).unique();//.notNullable();
      table.integer('user_id');//.notNullable();
      table.integer('group_id');//.notNullable();
      table.integer('views').defaultTo(0);//start at zero;
      table.timestamps();
    }).then(function (table) {
      console.log('Created the table:', table);
    });
  }
});

module.exports = db;