-- command to use this file in psql:
-- psql -U raul -d events -a -f /Users/raul/Documents/Development/TooManyCooks/server/db/createEventsTable.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS event_assistants;
DROP TABLE IF EXISTS event_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;


CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  latitude REAL,
  longitude REAL,
  postcode VARCHAR(10),
  address TEXT,
  city VARCHAR(50),
  description TEXT
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  host_id INT,
  location_id INT REFERENCES locations(id),
  title VARCHAR(50),
  description TEXT
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40)
);

CREATE TABLE event_tags (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  tag_id INT REFERENCES tags(id)
);

CREATE TABLE event_assistants (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  user_id INT
);

-- events seeding:

INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (1515, 4242, 'H11 1HD', '12 Duff Road', 'Edinburgh', 'My house');

INSERT INTO events (host_id, location_id, title, description)
VALUES (1, 1, 'Learn how to cook tapas with Pancho', 'A workshop in which our Spanish chef will introduce you into the tapas world');

INSERT INTO tags (title)
VALUES ('tapas!');

INSERT INTO event_assistants (event_id, user_id)
VALUES (1, 2);

INSERT INTO event_tags (event_id, tag_id)
VALUES (1, 1);
