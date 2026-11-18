CREATE DATABASE IF NOT EXISTS aulia_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aulia_portfolio;

CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  full_name VARCHAR(150) NOT NULL DEFAULT 'Aulia Zahratul Jannah',
  headline VARCHAR(190) NOT NULL DEFAULT 'Electrical Engineering Student',
  biography TEXT,
  profile_image VARCHAR(500),
  email VARCHAR(190),
  linkedin_url VARCHAR(500),
  instagram_url VARCHAR(500),
  cv_file VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO profiles (id, full_name, headline, biography)
VALUES (1, 'Aulia Zahratul Jannah', 'Electrical Engineering Student', 'Welcome to my personal portfolio.');

CREATE TABLE IF NOT EXISTS education (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(190) NOT NULL,
  major VARCHAR(190),
  degree VARCHAR(120),
  start_year SMALLINT,
  end_year SMALLINT,
  description TEXT,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journeys (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  period VARCHAR(100),
  category VARCHAR(100),
  description TEXT,
  image VARCHAR(500),
  year SMALLINT,
  status ENUM('draft','published') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  competition_name VARCHAR(190),
  organizer VARCHAR(190),
  award VARCHAR(150),
  level VARCHAR(100),
  category VARCHAR(100),
  year SMALLINT,
  description TEXT,
  certificate_image VARCHAR(500),
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  organization_name VARCHAR(190) NOT NULL,
  position VARCHAR(150),
  start_date VARCHAR(50),
  end_date VARCHAR(50),
  category VARCHAR(100),
  description TEXT,
  contribution TEXT,
  image VARCHAR(500),
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  category VARCHAR(100),
  year SMALLINT,
  description TEXT,
  problem TEXT,
  solution TEXT,
  technologies TEXT,
  role VARCHAR(190),
  result TEXT,
  image VARCHAR(500),
  repository_url VARCHAR(500),
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(120),
  size_bytes BIGINT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
