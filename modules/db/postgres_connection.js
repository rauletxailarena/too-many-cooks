const pg = require('pg')
const pool = new pg.Pool({user:"raul", database: "raul", password:"raul", port: 5432})

module.exports = {
   query: function(text, values, cb) {
      pool.connect(function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   }
}
