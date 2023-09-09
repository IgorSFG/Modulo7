CREATE TABLE IF NOT EXISTS Users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      userpassword VARCHAR(50) NOT NULL
);

INSERT INTO Users (username, userpassword) VALUES ('teste', 'teste123');