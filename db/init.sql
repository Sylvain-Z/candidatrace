-- Création des tables pour CandidaTrace

USE candidatrace_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(42) NOT NULL,
  lastname VARCHAR(42) NOT NULL,
  city VARCHAR(42) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255),
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des applications
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(42) NOT NULL,
  website MEDIUMTEXT,
  application_link MEDIUMTEXT NOT NULL,
  application_date TIMESTAMP NOT NULL,
  note MEDIUMTEXT,
  first_relaunch TIMESTAMP,
  second_relaunch TIMESTAMP,
  interview_date TIMESTAMP,
  final_response TINYINT,
  final_response_date TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_applications FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Créer les index pour les performances
CREATE INDEX idx_user_id ON applications(user_id);
CREATE INDEX idx_application_date ON applications(application_date);
CREATE INDEX idx_email ON users(email);
