# 📝 Blog API (Node.js, Express, MongoDB)

A RESTful Blog API built using **Express.js**, **MongoDB (Mongoose)**, and **JWT authentication**.  
This API supports user authentication, role-based authorization, secure password storage, and full CRUD operations for blog posts.

---

## 📁 Project Structure


---

## 🚀 Features

### ✅ Blog (Day 3)
- Create, Read, Update, Delete (CRUD) for blog posts
- MongoDB schema with:
  - Title, Content, Author, Tags
  - Embedded Comments
  - Created/Updated Timestamps
- Additional Features:
  - Pagination
  - Search (by title or content)
  - Get all posts by specific user
  - Sorting (by date, title)
  - Like a post

---

### 🔐 Authentication & Authorization (Day 4)
- **User Registration** with password hashing (`bcrypt`)
- **Login** with JWT token response
- Middleware to protect routes using JWT
- Role-based authorization (`user` or `admin`)
- Only authors or admins can update/delete posts
- Admin-only routes supported

---

### 🧪 Validation
- Request validation using **Joi**
- Schemas for:
  - User registration/login
  - Post creation/editing
- Password strength enforcement via Joi

---

### 🧠 Mongoose Model Enhancements
- Virtual fields (e.g., `fullName`)
- Pre/post schema hooks
- Custom instance methods
- Use of `.populate()` for author and comment resolution

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Joi
- Morgan (logging)

---

## 🔧 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/mohamedragab2000/User-Post-Node-JS.git
   cd User-Post-Node-JS
