-- command to use this file in psql:
-- psql -U raul -d payments -a -f /Users/raul/Documents/Development/TooManyCooks/modules/db/createPaymentsTable.sql

DROP TABLE IF EXISTS payments;

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payee_id INT,
  payer_id INT,
  status VARCHAR(30),
  sort_number VARCHAR(8),
  account_number VARCHAR(8),
  bank_name VARCHAR(50)
);

-- payments seeding


INSERT INTO payments (payee_id, payer_id, status, sort_number, account_number, bank_name)
VALUES (1, 2, 'Completed', '12-34-56', '12345678', 'Bank of Scotland');
