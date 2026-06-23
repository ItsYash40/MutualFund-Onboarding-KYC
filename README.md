# 🔐 KYC Platform Authentication Module

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge\&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge\&logo=jsonwebtokens)
![License](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

### Authentication Service for Mutual Fund Investor Onboarding & KYC Platform

Secure Registration • Login • JWT Authentication • Route Protection

</div>

---

## 📌 Project Overview

This project implements the Authentication Module for a Mutual Fund Investor Onboarding & KYC Platform.

The module provides secure user registration, login, password hashing, JWT-based authentication, and middleware protection for backend services.

It serves as the foundation layer upon which the remaining KYC workflow modules are built.

---

## 🚀 Features

✅ User Registration

✅ User Login

✅ Password Hashing with bcrypt

✅ JWT Token Generation

✅ JWT Verification Middleware

✅ Protected Routes

✅ Duplicate Email Prevention

✅ MongoDB Atlas Integration

✅ Environment Variable Security

✅ Error Handling & Validation

---

## 🏗️ System Architecture

```text
Client
   │
   ▼
Register/Login API
   │
   ▼
Express Server
   │
   ▼
MongoDB Atlas
   │
   ▼
JWT Token Issued
   │
   ▼
Protected Routes
   │
   ▼
Auth Middleware
```

---

## 🛠️ Tech Stack

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Backend Runtime       |
| Express.js    | API Framework         |
| MongoDB Atlas | Database              |
| Mongoose      | ODM                   |
| bcrypt        | Password Hashing      |
| JWT           | Authentication        |
| dotenv        | Environment Variables |
| Nodemon       | Development Server    |

---

## 📂 Project Structure

```text
kyc-backend/
│
├── index.js
├── package.json
├── package-lock.json
│
├── models/
│   └── User.js
│
├── routes/
│   └── auth.js
│
├── middleware/
│   └── auth.js
│
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd kyc-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### Run Project

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name":"Smruti",
  "email":"smruti@test.com",
  "password":"test123"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email":"smruti@test.com",
  "password":"test123"
}
```

Response:

```json
{
  "token":"JWT_TOKEN",
  "userId":"USER_ID",
  "role":"user"
}
```

---

### Protected Route

```http
GET /api/protected
```

Header:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔄 Authentication Flow

```text
User Registration
        │
        ▼
Password Hashing (bcrypt)
        │
        ▼
Store User in MongoDB
        │
        ▼
User Login
        │
        ▼
Generate JWT Token
        │
        ▼
Client Stores Token
        │
        ▼
Authorization Header
        │
        ▼
Auth Middleware
        │
        ▼
Protected Route Access
```

---

## 🧪 Testing Results

| Test Case        | Status |
| ---------------- | ------ |
| Registration     | ✅ Pass |
| Duplicate Email  | ✅ Pass |
| Login            | ✅ Pass |
| Wrong Password   | ✅ Pass |
| JWT Generation   | ✅ Pass |
| JWT Verification | ✅ Pass |
| Protected Route  | ✅ Pass |
| MongoDB Storage  | ✅ Pass |

---

## 🔒 Security Features

* bcrypt Password Hashing
* JWT Authentication
* Route Protection Middleware
* Environment Variable Management
* Duplicate Account Prevention
* Token Expiry Support

---

## 📈 Future Enhancements

* PAN Validation Module
* Aadhaar Verification
* KYC Status Tracking
* Admin Dashboard APIs
* Refresh Token System
* Audit Trail Logging
* Role-Based Access Control

---

## 👨‍💻 Developer

**Smrutiranjan Behera**

Backend Developer – Authentication Module

Mutual Fund Investor Onboarding & KYC Platform

---

## ⭐ Project Status

✅ Authentication Module Completed

🚀 Ready for Team Integration
