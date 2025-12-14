# 📚 Library Management System (MERN Stack)

**Group 15 - COMP229 Web Application Development**

![Build Status](https://img.shields.io/github/actions/workflow/status/TheProblemSolverOvO/LibraryManagementSystem/main.yml?label=CI%2FCD&style=flat-square)
![Node](https://img.shields.io/badge/Node.js-v18-green?style=flat-square)
![React](https://img.shields.io/badge/React-v18-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square)

## 🚀 Live Demo

* **Frontend Application:** [https://group15-library-frontend.onrender.com](https://group15-library-frontend.onrender.com)
* **Backend API:** [https://group15-library-backend.onrender.com](https://group15-library-backend.onrender.com)

---

## 📖 Project Overview

This is a full-stack **Library Management System** designed to track book inventories. It features a responsive React frontend, a secure Node/Express backend, and MongoDB for data persistence. The application supports full **CRUD** (Create, Read, Update, Delete) operations and implements **JWT Authentication** to secure administrative routes.

### ✨ Key Features
* **User Authentication:** Secure Registration and Login using JSON Web Tokens (JWT).
* **Protected Routes:** Only authenticated users can Add, Edit, or Delete books.
* **Book Catalog:** Publicly accessible list of all books in the library.
* **Real-time Updates:** Changes to the inventory are reflected instantly.
* **Responsive Design:** Styled with custom CSS for a modern, clean user interface.

---

## 🛠️ Tech Stack

### Frontend
* **React.js:** Component-based UI architecture.
* **React Router:** For Single Page Application (SPA) navigation.
* **Axios:** For making HTTP requests to the backend.
* **Jest & React Testing Library:** For Unit Testing components.
* **Cypress:** For End-to-End (E2E) automated testing.

### Backend
* **Node.js & Express:** RESTful API server.
* **MongoDB & Mongoose:** NoSQL database schema modeling.
* **Bcryptjs:** For password hashing security.
* **JWT:** For stateless authentication.

### DevOps & Deployment
* **GitHub Actions:** CI/CD pipeline for automated testing and deployment triggers.
* **Render:** Cloud hosting for both the static frontend and the Node.js web service.