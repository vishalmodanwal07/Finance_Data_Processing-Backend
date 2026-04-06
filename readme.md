# Finance Data Processing and Access Control Backend

A production-ready backend API for managing users, financial records, and analytics. Built with modern best practices, secure authentication, and scalable architecture.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication (Access Token + Refresh Token)
* bcrypt

---

## Features

* JWT-based authentication with access and refresh tokens
* Password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Rate limiting for API protection
* Input validation and data sanitization
* Protection against invalid or unauthorized operations
* Soft delete implementation using `deletedAt`
* Custom API response and error handling
* Centralized async error handling using asyncHandler
* Proper HTTP status codes following REST standards
* Modular architecture with ES Modules
* Clean folder structure and naming conventions
* Data modeling using Mongoose

---

## Project Structure

```id="proj-structure"
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validators/
├── utils/
├── db/
├── app.js
└── server.js
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

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env id="env2"
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=http://localhost:4200
```

### 4. Run the server

For development:

```bash id="dev"
npm run dev
```

For production:

```bash id="start"
npm start
```

---

## API Base URL

```
http://localhost:3000/api/v1
```

---

## Key Modules

* Authentication and authorization middleware
* User and record management controllers
* Dashboard analytics aggregation
* Validation middleware for request data
* Utility classes for API response and error handling

---

## Best Practices Followed

* Separation of concerns (controllers, routes, services)
* Reusable middleware design
* Consistent API response format
* Secure authentication and authorization
* Scalable and maintainable code structure
* Proper error handling and status codes

---

## Author

Vishal Modanwal

---

## License

This project is licensed under the MIT License.
