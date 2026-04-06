# API Documentation

Base URL:

```
http://localhost:3000/api/v1
```

---

## Authentication APIs

### 1. Login User

**POST** `/auth/login`

#### Request Body

```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

#### Response

```json
{
  "statusCode": 200,
  "data": {
    "user": {},
    "accessToken": "token",
    "refreshToken": "token"
  },
  "message": "user logged in successfully"
}
```

---

### 2. Refresh Token

**POST** `/auth/refresh-token`

#### Description

Generates a new access token using refresh token.

---

### 3. Logout User

**POST** `/auth/logout`

#### Description

Clears access and refresh tokens.

---

## User APIs

### 1. Create User (Admin Only)

**POST** `/users/create`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Request Body

```json
{
  "name": "Test User",
  "email": "test@demo.com",
  "password": "test123",
  "role": "viewer"
}
```

#### Response

```json
{
  "statusCode": 201,
  "data": {},
  "message": "User created successfully"
}
```

---

### 2. Get All Users

**GET** `/users`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
  "statusCode": 200,
  "data": [],
  "message": "Users fetched successfully"
}
```

---

## Record APIs

### 1. Create Record

**POST** `/records`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Request Body

```json
{
  "amount": 1500,
  "type": "income",
  "category": "Salary",
  "date": "2024-04-01",
  "notes": "Monthly income"
}
```

#### Response

```json
{
  "statusCode": 201,
  "data": {},
  "message": "Record created successfully"
}
```

---

### 2. Get All Records

**GET** `/records`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Response

```json
{
  "statusCode": 200,
  "data": [],
  "message": "Records fetched successfully"
}
```

---

### 3. Get Single Record

**GET** `/records/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

---

### 4. Update Record

**PUT** `/records/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Request Body

```json
{
  "amount": 2000
}
```

---

### 5. Delete Record (Soft Delete)

**DELETE** `/records/:id`

#### Headers

```
Authorization: Bearer <accessToken>
```

#### Description

Marks record as deleted using `deletedAt` field.

---

## Role-Based Access Control (RBAC)

| Role    | Create User | Create Record | View Records | Delete |
| ------- | ----------- | ------------- | ------------ | ------ |
| Admin   | Yes         | Yes           | Yes          | Yes    |
| Analyst | No          | Yes           | Yes          | No     |
| Viewer  | No          | No            | Yes          | No     |

---

## Error Responses

### 400 Bad Request

```json
{
  "message": "Invalid input"
}
```

### 401 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "message": "Access denied"
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "message": "Something went wrong"
}
```

---

## Notes

* All protected routes require JWT in Authorization header
* Passwords are securely hashed using bcrypt
* Tokens are stored in HTTP-only cookies
* Soft delete is implemented using `deletedAt`
* Enums are used for roles and transaction types

---
