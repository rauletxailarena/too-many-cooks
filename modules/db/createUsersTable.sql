-- command to use this file in psql:
-- psql -U raul -d users -a -f /Users/raul/Documents/Development/TooManyCooks/modules/db/createUsersTable.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50) UNIQUE,
  date_of_birth DATE,
  display_name VARCHAR(30) UNIQUE
);

CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40)
);

CREATE TABLE user_interests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  interest_id INT REFERENCES interests(id)
);


-- user seeding:

INSERT INTO users (first_name, last_name, email, date_of_birth, display_name )
VALUES ('Raúl', 'Ruiz', 'jraulruizgarcia@gmail.com', '28/04/1988', 'rauletxailarena');

INSERT INTO users (first_name, last_name, email, date_of_birth, display_name)
VALUES ('Irene', 'Rodriguez', 'irenerodmer@gmail.com', '04/02/1988', 'irenerodmer');

-- tags seeding:

INSERT INTO interests (title)
VALUES ('Noodles');

INSERT INTO interests (title)
VALUES ('Tapas');

INSERT INTO interests (title)
VALUES ('Pizza');

INSERT INTO interests (title)
VALUES ('Desserts');

INSERT INTO user_interests (user_id, interest_id)
VALUES (1, 1);

INSERT INTO user_interests (user_id, interest_id)
VALUES (1, 2);

INSERT INTO user_interests (user_id, interest_id)
VALUES (2, 3);

INSERT INTO user_interests (user_id, interest_id)
VALUES (2, 4);
