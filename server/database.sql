-- Создание базы данных
CREATE DATABASE IF NOT EXISTS Pratique;
USE Pratique;

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Создание таблицы сотрудников
CREATE TABLE IF NOT EXISTS employees (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    projects VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL
);

-- Создание таблицы отпусков
CREATE TABLE IF NOT EXISTS vacations (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    employee_id INT(11) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INT(11) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Вставка данных в таблицу пользователей
INSERT INTO users (username, password) VALUES
('admin', '12345');

-- Вставка данных в таблицу сотрудников
INSERT INTO employees (name, hire_date, projects, color) VALUES
('John Doe', '2023-01-10', 'Project A', '#FF5733'),
('Jane Smith', '2022-05-15', 'Project B', '#4287f5');

-- Вставка данных в таблицу отпусков
INSERT INTO vacations (employee_id, start_date, end_date, days) VALUES
(1, '2023-07-01', '2023-07-10', 10),
(2, '2023-08-01', '2023-08-15', 15);
