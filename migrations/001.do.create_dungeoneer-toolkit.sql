CREATE TABLE login (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  hash VARCHAR(100),
  email TEXT NOT NULL
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR(50),
  email TEXT NOT NULL,
  joined TIMESTAMP NOT NULL
);