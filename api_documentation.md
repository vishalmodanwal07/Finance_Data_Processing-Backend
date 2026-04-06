
# Finance Data Processing and Access Control Backend API Documentation

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXIPRY = your_expiry_time
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY = your_expiry_time
CORS_ORIGIN= frontend_link

```

### 4. Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## API Base URL

```
http://localhost:5000/api/v1
```

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description                 | Access  |
| ------ | -------------- | --------------------------- | ------- |
| POST   | /auth/register | Register a new user         | Public  |
| POST   | /auth/login    | Login user and get tokens   | Public  |
| POST   | /auth/logout   | Logout user (clear cookies) | Private |

---

### Users (Admin Only)

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /users            | Get all users      |
| GET    | /users/:id        | Get user by ID     |
| POST   | /users            | Create user        |
| PUT    | /users/:id        | Update user        |
| DELETE | /users/:id        | Delete user        |
| PATCH  | /users/:id/status | Toggle user status |

---

### Records

| Method | Endpoint     | Description     | Access  |
| ------ | ------------ | --------------- | ------- |
| GET    | /records     | Get all records | Private |
| POST   | /records     | Create record   | Private |
| PUT    | /records/:id | Update record   | Private |
| DELETE | /records/:id | Delete record   | Private |

---

### Dashboard

| Method | Endpoint           | Description           | Access  |
| ------ | ------------------ | --------------------- | ------- |
| GET    | /dashboard/summary | Get analytics summary | Private |

---

### Health Check

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | /healthcheck | Check API status |

---

## Request and Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

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
