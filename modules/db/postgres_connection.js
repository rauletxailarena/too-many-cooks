const pg = require('pg')
const pool = new pg.Pool({user:"raul", database: "raul", password:"raul", port: 5432})

var connectString = 'postgress://raul:raul@localhost/raul'

pool.connect(function(err, client, done) {
  if (err) {
    return console.error("error fetching client from pool", err);
  }
  client.query("SELECT * FROM recipes WHERE id = 2", function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows)
    done()
  })
})

pool.end()
