-- Create Database
CREATE DATABASE IF NOT EXISTS thinkoutsource;
USE thinkoutsource;

-- Table for Contact/Inquiry forms
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service_interest VARCHAR(100),
    message TEXT,
    selected_date DATE,
    selected_slot VARCHAR(50),
    lead_status VARCHAR(50) DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Careers Expression of Interest
CREATE TABLE IF NOT EXISTS career_interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cv_link TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for ThinkDebt Leads
CREATE TABLE IF NOT EXISTS debt_leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    debt_status VARCHAR(100),
    employment_status VARCHAR(50),
    employment_type VARCHAR(50),
    lead_status VARCHAR(50) DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MIGRATIONS: Run these if your tables already exist
-- ALTER TABLE inquiries ADD COLUMN lead_status VARCHAR(50) DEFAULT 'New' AFTER selected_slot;
-- ALTER TABLE inquiries ADD COLUMN notes TEXT AFTER lead_status;
-- ALTER TABLE debt_leads ADD COLUMN lead_status VARCHAR(50) DEFAULT 'New' AFTER employment_type;
-- ALTER TABLE debt_leads ADD COLUMN notes TEXT AFTER lead_status;
