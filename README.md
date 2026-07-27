# BetaBytez Task 3 – Blog Platform REST API

## Project Overview

This project is a REST API for a Blog Platform built using **Node.js** and **Express.js**. It provides user authentication using **JWT** and **bcrypt**, along with CRUD operations for blog posts.

The project uses an in-memory array to store users and posts. MongoDB integration will be added in Task 4.

---

## Technologies Used

- Node.js
- Express.js
- bcrypt
- JSON Web Token (JWT)
- dotenv
- Postman

---

## Features

- User Registration
- User Login
- Password Hashing with bcrypt
- JWT Authentication
- Protected Routes
- Create Blog Post
- Get All Posts
- Get Logged-in User Posts
- Get Single Post
- Update Own Post
- Delete Own Post

---

## Project Structure

```
betabytez-task3/
│
├── data/
│   ├── users.js
│   └── posts.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── auth.js
│   └── postRoutes.js
│
├── .env
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/betabytez-task3-yourname.git
```

Go to project folder

```bash
cd betabytez-task3-yourname
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
JWT_SECRET=mysecretkey123
```

Start the server

```bash
npm run dev
```

or

```bash
node server.js
```

Server runs on

```
http://localhost:5000
```

---

# API Endpoints

## 1. Register User

**Method**

```
POST
```

**Endpoint**

```
/api/auth/register
```

**Authentication**

```
No
```

**Request Body**

```json
{
  "username": "Atif",
  "email": "atif@gmail.com",
  "password": "123456"
}
```

---

## 2. Login User

**Method**

```
POST
```

**Endpoint**

```
/api/auth/login
```

**Authentication**

```
No
```

**Request Body**

```json
{
  "email": "atif@gmail.com",
  "password": "123456"
}
```

---

## 3. Profile

**Method**

```
GET
```

**Endpoint**

```
/api/auth/profile
```

**Authentication**

```
Bearer Token Required
```

---

## 4. Create Post

**Method**

```
POST
```

**Endpoint**

```
/api/posts
```

**Authentication**

```
Bearer Token Required
```

**Request Body**

```json
{
  "title": "Node.js",
  "content": "Learning Express",
  "category": "Programming"
}
```

---

## 5. Get All Posts

**Method**

```
GET
```

**Endpoint**

```
/api/posts
```

**Authentication**

```
No
```

---

## 6. Get Logged-in User Posts

**Method**

```
GET
```

**Endpoint**

```
/api/posts/my-posts
```

**Authentication**

```
Bearer Token Required
```

---

## 7. Get Single Post

**Method**

```
GET
```

**Endpoint**

```
/api/posts/:id
```

**Authentication**

```
No
```

---

## 8. Update Post

**Method**

```
PUT
```

**Endpoint**

```
/api/posts/:id
```

**Authentication**

```
Bearer Token Required
```

**Request Body**

```json
{
  "title": "Updated Node.js",
  "content": "Updated Express Content",
  "category": "Backend"
}
```

---

## 9. Delete Post

**Method**

```
DELETE
```

**Endpoint**

```
/api/posts/:id
```

**Authentication**

```
Bearer Token Required
```

---

## HTTP Status Codes Used

| Status Code | Description |
|------------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Authentication

Protected routes require a JWT token in the Authorization header.

Example:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Testing

All endpoints were tested successfully using Postman.

---

## Author

Atif Malik
