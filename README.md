Job Scheduler & Automation System

A mini full-stack job scheduling and automation system built as part of the Dotix Technologies – Full Stack Developer Skill Test.

This application allows users to create background jobs, execute them manually, track their status, and trigger a webhook automatically when a job completes.

🚀 Features

Create background jobs with priority and payload

Store jobs in MySQL database

View all jobs in a dashboard

Run jobs manually

Job lifecycle tracking:

pending → running → completed

Automatic webhook trigger on job completion

Delete jobs

Job detail view with payload display

🧱 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

TypeScript

Backend

Node.js

Express.js

MySQL

REST APIs

Integrations

Webhook (https://webhook.site
)

📁 Project Structure
job-scheduler-dotix/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── jobs/[id]/page.tsx
│   ├── components/
│   │   ├── JobForm.tsx
│   │   └── JobTable.tsx
│   ├── services/
│   │   └── api.ts
│
├── backend/
│   ├── app.js
│   ├── db.js
│   ├── webhook.js
│   ├── package.json
│   └── .env
│
└── README.md

Database Schema
Database: job_scheduler
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  payload JSON,
  priority ENUM('Low','Medium','High') NOT NULL,
  status ENUM('pending','running','completed') DEFAULT 'pending',
  completedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);