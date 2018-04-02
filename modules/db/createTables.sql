-- command to use this file in psql:
-- psql -U raul -d raul -a -f /Users/raul/Documents/Development/React_learning/Microservices/myNodeTest/modules/db/createTables.sql

DROP TABLE IF EXISTS user_given_ratings;
DROP TABLE IF EXISTS user_received_ratings;
DROP TABLE IF EXISTS user_messages
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS event_users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS event_categories;
DROP TABLE IF EXISTS user_categories;
DROP TABLE IF EXISTS user_badges;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  email VARCHAR(50)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  host_id INT REFERENCES users(id),
  title VARCHAR(50),
  description TEXT
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  title, VARCHAR(30)
);

CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  badge_id INT REFERENCES badges(id),
  obtained_on VARCHAR(20)
);

CREATE TABLE event_categories (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  event_id INT REFERENCES events(id)
)

CREATE TABLE user_categories (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  event_id INT REFERENCES events(id)
)

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  latitude REAL,
  longitude REAL,
  postcode VARCHAR(10),
  address TEXT,
  citu VARCHAR(50),
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
  user_id INT REFERNECES users(id),
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
