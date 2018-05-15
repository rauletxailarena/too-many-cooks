-- command to use this file in psql:
-- psql -U raul -d ratings -a -f /Users/raul/Documents/Development/TooManyCooks/server/db/createRatingsTable.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS ratings;


CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  score INT,
  comments TEXT,
  from_user INT ,
  to_user INT,
  event_id INT
);


-- ratings seeding:

INSERT INTO ratings (score, comments, from_user, to_user, event_id)
VALUES (8, 'Yummy - tapas SHOULD be free', 2, 1, 1);
