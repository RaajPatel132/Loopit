-- Setup script for Loopit database
-- This script creates a new user and database with the desired credentials

-- Create a new user with password
CREATE USER postgres WITH PASSWORD 'Admin@123' SUPERUSER;

-- Create the loopit database
CREATE DATABASE loopit OWNER postgres;

-- Grant all privileges to the postgres user
GRANT ALL PRIVILEGES ON DATABASE loopit TO postgres;

-- Display confirmation
SELECT 'Database setup completed successfully!' AS status;
