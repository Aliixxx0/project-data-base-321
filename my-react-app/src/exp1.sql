CREATE DATABASE railways_db;

USE railways_db;

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_time TIME NOT NULL
);

INSERT INTO trains (name, origin, destination, departure_time) VALUES
('Train A', 'Riyadh', 'Dammam', '10:00:00'),
('Train B', 'Jeddah', 'Makkah', '14:00:00'),
('Train C', 'Khobar', 'Ahsaa', '16:30:00');
