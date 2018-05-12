-- command to use this file in psql:
-- psql -U raul -d messages -a -f /Users/raul/Documents/Development/TooManyCooks/modules/db/createMessagesTable.sql


set datestyle to DMY, SQL;

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender INT,
  receiver INT,
  text TEXT,
  date_time VARCHAR(30)
);

INSERT INTO messages (sender, receiver, text, date_time)
VALUES (2, 1, 'Hey, I really loved your tapas <3', '28/04/1988T03:03:03')
