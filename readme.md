# Finance Data Processing and Access Control Backend

A production-ready backend API for managing users, financial records, and analytics. Built using modern best practices with secure authentication, Role-Based Access Control (RBAC), and scalable architecture.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication (Access Token + Refresh Token)
* bcrypt (Password Hashing)
* dotenv (Environment Configuration)

---

## Features

* JWT-based authentication system (Access Token + Refresh Token)
* Secure password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Rate limiting for API protection
* Input validation for request data
* Protection against unauthorized operations
* Soft delete functionality using `deletedAt`
* Custom API response and error handling
* Centralized async error handling using asyncHandler
* Proper HTTP status codes (REST standards)
* Modular and scalable architecture
* Clean folder structure
* Centralized enums for roles and transaction types

---

## Project Structure

```id="structure"
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validators/
├── utils/
│   └── constants.js
├── db/
├── seed/
│   └── seed.js
├── app.js
└── server.js
```

---

## Environment Configuration (dotenv)

Create a `.env` file in the root directory:

```env id="env"
PORT=3000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXIPRY=your_expiry_time

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_expiry_time

CORS_ORIGIN=frontend_url
```

Initialize dotenv in your entry file:

```js id="dotenv"
import dotenv from "dotenv";
dotenv.config();
```

---

## Setup Instructions

### 1. Clone the repository

```bash id="clone"
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash id="install"
npm install
```

### 3. Run the server

Development:

```bash id="dev"
npm run dev
```

Production:

```bash id="start"
npm start
```

---

## Database Seeding

This project includes a **database seeding script** to initialize users and financial records for testing and development.

### Seeder Features

* Clears existing data before inserting new data
* Creates users with predefined roles:

  * Admin
  * Analyst
  * Viewer
* Inserts sample financial records
* Maintains relationships using ObjectId (`createdBy`)
* Uses bcrypt for password hashing
* Uses centralized enums for consistency

---

### Seeded User Credentials

| Role    | Email                                       | Password   |
| ------- | ------------------------------------------- | ---------- |
| Admin   | [admin@demo.com](mailto:admin@demo.com)     | admin123   |
| Analyst | [analyst@demo.com](mailto:analyst@demo.com) | analyst123 |
| Viewer  | [viewer@demo.com](mailto:viewer@demo.com)   | viewer123  |

---

### Run Seeder

```bash id="seed"
npm run seed
```

---

### Seeder Workflow

1. Connects to MongoDB
2. Deletes existing Users and Records
3. Creates users using role enums
4. Inserts financial records using type enums
5. Disconnects from database

---

## Enums (Centralized Constants)

```js id="enum"
export const userRoleEnum = {
  ADMIN: "admin",
  ANALYST: "analyst",
  VIEWER: "viewer"
};

export const amountTypeEnum = {
  INCOME: "income",
  EXPENSE: "expense"
};
```

---

## Authentication & Authorization

### Authentication

* JWT-based login system
* Access Token and Refresh Token implementation
* Secure token handling

---

### Authorization (RBAC)

Roles implemented:

* **Admin**

  * Full access
  * Can create users
  * Can manage all records

* **Analyst**

  * Can create and manage records
  * Cannot create users

* **Viewer**

  * Read-only access

---

## API Base URL

```
http://localhost:3000/api/v1
```

---

## Key Modules

* Authentication middleware (JWT verification)
* RBAC middleware (role-based authorization)
* User management system
* Financial record management
* Validation middleware
* API response & error utilities

---

## Scripts

```json id="scripts"
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "seed": "node src/seed/seed.js"
}
```

---

## Best Practices Followed

* Separation of concerns (MVC architecture)
* Centralized constants (enums)
* Reusable middleware design
* Secure authentication & authorization
* Environment-based configuration
* Clean and maintainable code structure
* Proper error handling and status codes

---

## Project Highlights

* Implemented JWT authentication with refresh token system
* Designed RBAC with multiple roles
* Created reusable middleware architecture
* Built database seeding for testing
* Used enums to prevent hardcoding
* Followed production-level backend practices

---

## Author

Vishal Modanwal

---
