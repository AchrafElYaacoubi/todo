CREATE DATABASE todo;

-- users table
CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR ( 50 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  email VARCHAR ( 255 ) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL

);

-- projects table
CREATE TABLE projects (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

-- todos table
CREATE TABLE todos (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  project_id int NOT NULL,
  description VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects (id)
);


