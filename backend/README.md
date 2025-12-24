# Quiz Builder Backend

Server-side REST API application for the Quiz Builder platform. Built with **NestJS** and **Prisma**.

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Validation:** class-validator & class-transformer

## Getting Started

### 1. Prerequisites
`npm install`

### 2. Setup Environment
Create a `.env` file in the `backend` root directory. This is crucial for the database connection.

### 3. Start server
`npm run start:dev`

```env
DATABASE_URL="file:./dev.db"
PORT=4200