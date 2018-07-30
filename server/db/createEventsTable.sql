-- command to use this file in psql:
-- psql -U raul -d events -a -f /Users/raul/Documents/Development/TooManyCooks/server/db/createEventsTable.sql

set datestyle to DMY, SQL;

DROP TABLE IF EXISTS event_assistants;
DROP TABLE IF EXISTS event_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;


-- Create the different tables
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
  description TEXT,
  type int,
  start_date DATE,
  slots INT,
  -- events type:
  --  1 = free event
  --  2 = paid event
  constraint valid_event_type
      check (type <= 2)
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
  user_id INT,
  status INT,
  -- event_assistans status:
  --  1 = pending approval
  --  2 = approved
  --  2 = not accepted
  constraint valid_event_assistant_status
      check (status <= 3),
  unique (event_id, user_id)
);

-- Dummy data insetion:

-- locations:
INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (55.943743, -3.223609, 'EH11 1HD', '12 Duff Road', 'Edinburgh', 'My house');

INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (55.923743, -3.221609, 'EH11 3RW', '24 Radical Road', 'Edinburgh', 'Social Centre');

INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (55.911743, -3.217609, 'EH9 2WU', '1 Elm Row', 'Edinburgh', 'Old country house');

INSERT INTO locations (latitude, longitude, postcode, address, city, description)
VALUES (55.945743, -3.233609, 'EH19 3RQ', '455 South Gyle Crescent', 'Edinburgh', 'Barbaque spot');


-- events
INSERT INTO events (host_id, location_id, title, description, type, start_date, slots)
VALUES (1, 1, 'Learn how to cook tapas with Pancho', 'A workshop in which our Spanish chef will introduce you into the tapas world', 1, '30/06/2018', 10);

INSERT INTO events (host_id, location_id, title, description, type, start_date, slots)
VALUES (2, 2, 'Night out with beer tasting', 'We will learn how to appreciate different beer ingredients and flavours', 1, '11/12/2011', 10);

INSERT INTO events (host_id, location_id, title, description, type, start_date, slots)
VALUES (3, 3, 'Steak feast masterclass', 'Rare, medium-rare or medium-well. However you like your steaks, this is your event', 1, '24/03/2016', 6);

INSERT INTO events (host_id, location_id, title, description, type, start_date)
VALUES (4, 4, 'Cupcake competition', 'Come with your cupcakes ready to take part in this fun competition', 1, '13/06/2020');


-- tags:
INSERT INTO tags (title)
VALUES ('Tapas');

INSERT INTO tags (title)
VALUES ('Steak');

INSERT INTO tags (title)
VALUES ('Beer');

INSERT INTO tags (title)
VALUES ('Thai');

INSERT INTO tags (title)
VALUES ('Cupcakes');

-- event_assistants
INSERT INTO event_assistants (event_id, user_id, status)
VALUES (1, 2, 1);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (1, 3, 1);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (2, 1, 2);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (2, 3, 3);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (3, 1, 1);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (3, 2, 1);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (4, 3, 2);

INSERT INTO event_assistants (event_id, user_id, status)
VALUES (4, 2, 3);


-- event_tags
INSERT INTO event_tags (event_id, tag_id)
VALUES (1, 1);

INSERT INTO event_tags (event_id, tag_id)
VALUES (1, 2);

INSERT INTO event_tags (event_id, tag_id)
VALUES (2, 3);

INSERT INTO event_tags (event_id, tag_id)
VALUES (3, 2);

INSERT INTO event_tags (event_id, tag_id)
VALUES (3, 3);

INSERT INTO event_tags (event_id, tag_id)
VALUES (4, 5);
