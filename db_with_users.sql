CREATE DATABASE IF NOT EXISTS powerbiweb;
USE powerbiweb;

DROP TABLE IF EXISTS user_roles, roles, chat_requests, users;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE chat_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Dữ liệu người dùng mẫu
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', '$2a$10$e3mAGGyxpM/uFOF52D1I5uZ5TfMML4jPCZBzjsPxXwFCU3Xo3T0Vi', 'ADMIN'),
('user1', 'user1@example.com', '$2a$10$6n4CUWT9yG92GnJozC1ZqOieXcyWTuoxhTzHZXgXDHb9/vAQUvUOe', 'USER'),
('user2', 'user2@example.com', '$2a$10$6n4CUWT9yG92GnJozC1ZqOieXcyWTuoxhTzHZXgXDHb9/vAQUvUOe', 'USER'),
('user3', 'user3@example.com', '$2a$10$6n4CUWT9yG92GnJozC1ZqOieXcyWTuoxhTzHZXgXDHb9/vAQUvUOe', 'USER'),
('advuser1', 'advuser1@example.com', '$2a$10$d6JY8eXz0Y1KZt9k/NnEt.M2MB/JMKuCIc0K9aG7ZqQaE6T9QDZxi', 'ADVANCED_USER'),
('advuser2', 'advuser2@example.com', '$2a$10$d6JY8eXz0Y1KZt9k/NnEt.M2MB/JMKuCIc0K9aG7ZqQaE6T9QDZxi', 'ADVANCED_USER'),
('advuser3', 'advuser3@example.com', '$2a$10$d6JY8eXz0Y1KZt9k/NnEt.M2MB/JMKuCIc0K9aG7ZqQaE6T9QDZxi', 'ADVANCED_USER'),
('user4', 'user4@example.com', '$2a$10$6n4CUWT9yG92GnJozC1ZqOieXcyWTuoxhTzHZXgXDHb9/vAQUvUOe', 'USER'),
('user5', 'user5@example.com', '$2a$10$6n4CUWT9yG92GnJozC1ZqOieXcyWTuoxhTzHZXgXDHb9/vAQUvUOe', 'USER');
