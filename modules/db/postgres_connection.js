const pg = require('pg')
const users_pool = new pg.Pool({user:"raul", database: "users", password:"raul", port: 5432})
const events_pool = new pg.Pool({user:"raul", database: "events", password:"raul", port: 5432})
const ratings_pool = new pg.Pool({user:"raul", database: "ratings", password:"raul", port: 5432})
const messages_pool = new pg.Pool({user:"raul", database: "messages", password:"raul", port: 5432})
const payments_pool = new pg.Pool({user:"raul", database: "payments", password:"raul", port: 5432})

module.exports = {
   users_query: function(text, values, cb) {
      users_pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   },
   events_query: function(text, values, cb) {
      events_pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   },
   ratings_query: function(text, values, cb) {
      ratings_pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   },
   messages_query: function(text, values, cb) {
      messages_pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   },
   payments_query: function(text, values, cb) {
      payments_pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   }
}
