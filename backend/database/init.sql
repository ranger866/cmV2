-- init.sql
CREATE DATABASE IF NOT EXISTS contacts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE contacts_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) DEFAULT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- demo user: username 'demo', password 'demo123'
INSERT INTO users (username, email, password_hash) VALUES ('demo','demo@example.com','$2y$10$Qe8H5FhH4iI0QpNqGf2xKe1x7o7qZk2vX1r5kV0Qe6b9tH8L9sY0u');