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
