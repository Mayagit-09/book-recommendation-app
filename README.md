# 📚 Book Recommendation App

A full-stack web application that allows users to discover, search, add, manage, and rate book recommendations.

## 🚀 Project Overview

The **Book Recommendation App** is developed using the MERN stack:

* **MongoDB** – Database
* **Express.js** – Backend API
* **React.js** – Frontend
* **Node.js** – Server environment

The application allows users to create an account, log in securely, search for books, add recommendations, view book details, rate books, and manage their favorite books.

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* Mongoose
* Axios
* CORS
* dotenv
* bcrypt
* JSON Web Token (JWT)

### Database

* MongoDB Atlas
* MongoDB with Mongoose

## 📁 Project Structure

```text
book-recommendation-app/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── assets/
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## 🗄️ Database Configuration

The application uses **MongoDB Atlas** as the database.

Mongoose is used to connect the Node.js backend to MongoDB.

The main database models include:

* `Book` – stores book recommendations
* `User` – stores user information
* `Review` – stores book reviews and ratings

### Book Schema

The `Book` model contains:

* Title
* Author
* Description
* Image
* Genre
* Rating
* User who recommended the book
* Creation and update dates

## 🔐 Environment Variables

For security reasons, sensitive information is stored in a `.env` file and is not included in the GitHub repository.

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mayagit-09/book-recommendation-app.git
```

### 2. Install backend dependencies

```bash
cd book-recommendation-app/server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder and add your MongoDB connection string and JWT secret.

### 4. Start the backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd book-recommendation-app/client
npm install
```

### 6. Start the frontend

```bash
npm start
```

The React application runs on:

```text
http://localhost:3000
```

## ✨ Main Features

* 👤 User registration and login
* 🔐 JWT authentication
* 📚 Book recommendations
* 🔎 Book search using an external book API
* ➕ Add books
* ✏️ Edit books
* 🗑️ Delete books
* ⭐ Book rating
* ❤️ Favorite books
* 📖 Book details
* 📝 Reviews
* 🌙 Dark mode
* 📱 Responsive user interface

## 🎯 Phase 1 – Project Setup and Database Configuration

During Phase 1, the project structure was created and configured.

The following tasks were completed:

* Created the project structure with separate frontend and backend folders.
* Initialized the Node.js backend project with npm.
* Installed the required dependencies.
* Configured the MongoDB Atlas database connection using Mongoose.
* Created the `Book` database schema for storing book recommendations.
* Configured environment variables using a `.env` file.
* Added `.gitignore` to prevent sensitive files and dependencies from being uploaded to GitHub.

## 👩‍💻 Author

**Asma Rabahi**

Book Recommendation App – MERN Stack Project
