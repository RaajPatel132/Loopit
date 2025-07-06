-- Database setup script for PostgreSQL
-- Run this in your PostgreSQL client (psql, pgAdmin, etc.)

-- Create the database (if it doesn't exist)
CREATE DATABASE loopit_db;

-- Connect to the database
\c loopit_db;

-- The application will automatically create tables using Sequelize
-- when you first run the server

-- Optional: Create a dedicated user for the application
-- CREATE USER loopit_user WITH PASSWORD 'your_secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE loopit_db TO loopit_user;
