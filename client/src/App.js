import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route 
           path="/books/:id" 
           element={<BookDetails />} 
        />

      </Routes>
    </>
  );
}

export default App;