-- command to use this file in psql:
-- psql -U raul -d users -a -f /Users/raul/Documents/Development/TooManyCooks/server/db/createUsersTable.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS user_interests;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  password VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE,
  date_of_birth DATE,
  user_name VARCHAR(30) UNIQUE,
  user_type INT,
  share_personal_details BOOLEAN,
  constraint valid_user_type
      check (user_type <= 3)
);

CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40) UNIQUE
);

CREATE TABLE user_interests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  interest_id INT REFERENCES interests(id) ON DELETE CASCADE,
  unique (user_id, interest_id)
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  score INT,
  comments TEXT,
  from_user INT REFERENCES users(id),
  to_user INT REFERENCES users(id) ON DELETE CASCADE,
  event_id INT
);



-- user seeding:

INSERT INTO users (first_name, last_name, email, password, date_of_birth, user_name, user_type, share_personal_details )
VALUES ('Raúl', 'Ruiz', 'jraulruizgarcia@gmail.com', 'raulete', '28/04/1988', 'rauletxailarena', 1, 'true');

INSERT INTO users (first_name, last_name, email, password, date_of_birth, user_name, user_type, share_personal_details)
VALUES ('Irene', 'Rodriguez', 'irenerodmer@gmail.com', 'ireneta', '04/02/1988', 'irenerodmer', 1, 'true');

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


-- ratings seeding:

INSERT INTO ratings (score, comments, from_user, to_user, event_id)
VALUES (8, 'Yummy - tapas SHOULD be free', 2, 1, 1);

INSERT INTO ratings (score, comments, from_user, to_user, event_id)
VALUES (8, 'Great host and a great meal!', 1, 2, 1);
