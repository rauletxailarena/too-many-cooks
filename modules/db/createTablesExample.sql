-- command to use this file in psql:
-- psql -U raul -d raul -a -f /Users/raul/Documents/Development/React_learning/Microservices/myNodeTest/modules/db/createTablesExample.sql

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  ingredients TEXT,
  directions TEXT
);

INSERT INTO recipes
(name, ingredients, directions)
VALUES (
  'mushroom pork chops',
  'here go the ingredients',
  'cook, you bastard'
);

INSERT INTO recipes
(name, ingredients, directions)
VALUES (
  'mushroom without meat',
  'here go the ingredients',
  'cook, you bastard'
);
