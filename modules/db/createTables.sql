-- command to use this file in psql:
-- psql -U raul -d raul -a -f /Users/raul/Documents/Development/TooManyCooks/modules/db/createTables.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS user_ratings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS user_events;
DROP TABLE IF EXISTS event_tags;
DROP TABLE IF EXISTS user_tags;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS events ;
DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40)
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  latitude REAL,
  longitude REAL,
  postcode VARCHAR(10),
  address TEXT,
  city VARCHAR(50),
  description TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50) UNIQUE,
  date_of_birth DATE,
  display_name VARCHAR(30) UNIQUE
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  host_id INT REFERENCES users(id) ON DELETE CASCADE,
  location_id INT REFERENCES locations(id),
  title VARCHAR(50),
  description TEXT
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30)
);

CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  badge_id INT REFERENCES badges(id),
  obtained_on VARCHAR(20)
);

CREATE TABLE event_tags (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id)
);

CREATE TABLE user_tags (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id)
);

CREATE TABLE user_events (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payee_id INT REFERENCES users(id),
  payer_id INT REFERENCES users(id),
  status VARCHAR(30),
  sort_number VARCHAR(8),
  account_number VARCHAR(8),
  bank_name VARCHAR(50)
);

CREATE TABLE user_ratings (
  id SERIAL PRIMARY KEY,
  score INT,
  comments TEXT,
  from_user INT REFERENCES users(id) ON DELETE SET NULL,
  to_user INT REFERENCES users(id) ON DELETE CASCADE,
  event_id INT REFERENCES events(id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender INT REFERENCES users(id) ON DELETE CASCADE,
  receiver INT REFERENCES users(id) ON DELETE CASCADE,
  text TEXT,
  date_time VARCHAR(30)
);




-- Insert seed data:

-- user seeding:

INSERT INTO users (first_name, last_name, email, date_of_birth, display_name )
VALUES ('Raúl', 'Ruiz', 'jraulruizgarcia@gmail.com', '28/04/1988', 'rauletxailarena');

INSERT INTO users (first_name, last_name, email, date_of_birth, display_name)
VALUES ('Irene', 'Rodriguez', 'irenerodmer@gmail.com', '04/02/1988', 'irenerodmer');

-- tags seeding:

INSERT INTO tags (title)
VALUES ('Noodles');

INSERT INTO tags (title)
VALUES ('Tapas');

INSERT INTO tags (title)
VALUES ('Pizza');

INSERT INTO tags (title)
VALUES ('Desserts');

INSERT INTO user_tags (user_id, tag_id)
VALUES (1, 1);

INSERT INTO user_tags (user_id, tag_id)
VALUES (1, 2);

INSERT INTO user_tags (user_id, tag_id)
VALUES (2, 3);

INSERT INTO user_tags (user_id, tag_id)
VALUES (2, 4);

-- events seeding:

INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (1515, 4242, 'H11 1HD', '12 Duff Road', 'Edinburgh', 'My house');

INSERT INTO events (host_id, location_id, title, description)
VALUES (1, 1, 'Learn how to cook tapas with Pancho', 'A workshop in which our Spanish chef will introduce you into the tapas world');

INSERT INTO user_events (event_id, user_id)
VALUES (1, 2);

INSERT INTO event_tags (event_id, tag_id)
VALUES (1, 2);

-- ratings seeding:

INSERT INTO user_ratings (score, comments, from_user, to_user, event_id)
VALUES (8, 'Yummy - tapas SHOULD be free', 2, 1, 1);

-- messages seeding:

INSERT INTO messages (sender, receiver, text, date_time)
VALUES (2, 1, 'Hey, I really loved your tapas <3', '28/04/1988T03:03:03')
