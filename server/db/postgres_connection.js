const pg = require('pg')
const users_pool = new pg.Pool({user:"raul", database: "users", password:"raul", port: 5432})

module.exports = {
  users_query: function(text, values, cb) {
    users_pool.connect(function(err, client, done) {
      client.query(text, values, function(err, result) {
        done();
        cb(err, result);
      })
    });
  }
}
