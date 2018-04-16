-- command to use this file in psql:
-- psql -U raul -d raul -a -f /Users/raul/Documents/Development/React_learning/Microservices/TooManyCooks/modules/db/createTables.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS user_given_ratings;
DROP TABLE IF EXISTS user_received_ratings;
DROP TABLE IF EXISTS user_messages;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS event_users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS event_tags;
DROP TABLE IF EXISTS user_tags;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40)
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
  host_id INT REFERENCES users(id),
  title VARCHAR(50),
  description TEXT
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30)
);

CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  badge_id INT REFERENCES badges(id),
  obtained_on VARCHAR(20)
);

CREATE TABLE event_tags (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  tag_id INT REFERENCES tags(id)
);

CREATE TABLE user_tags (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  tag_id INT REFERENCES tags(id)
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  latitude REAL,
  longitude REAL,
  postcode VARCHAR(10),
  address TEXT,
  city9 VARCHAR(50),
  description TEXT
);

CREATE TABLE event_users (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  user_id INT REFERENCES users(id)
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

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  score INT,
  comments TEXT,
  from_user INT REFERENCES users(id),
  to_user INT REFERENCES users(id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender INT REFERENCES users(id),
  text TEXT,
  date_time VARCHAR(30)
);

CREATE TABLE user_messages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  message_id INT REFERENCES messages(id)
);

CREATE TABLE user_given_ratings (
  id SERIAL PRIMARY KEY,
  rating_id INT REFERENCES ratings(id),
  user_id INT REFERENCES users(id)
);

CREATE TABLE user_received_ratings (
  id SERIAL PRIMARY KEY,
  rating_id INT REFERENCES ratings(id),
  user_id INT REFERENCES users(id)
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
