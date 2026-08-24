import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* ========================= */}
        {/* ACCUEIL */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* ========================= */}
        {/* CONNEXION */}
        {/* ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ========================= */}
        {/* INSCRIPTION */}
        {/* ========================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================= */}
        {/* FAVORIS */}
        {/* ========================= */}

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        {/* ========================= */}
        {/* DÉTAILS DU LIVRE */}
        {/* ========================= */}

        <Route
          path="/books/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={<Profile />}
          />

          <Route
          path="/recommendations"
          element={<Recommendations />}
          />

        {/* ========================= */}
        {/* ABOUT */}
        {/* ========================= */}

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>
    </>
  );
}

export default App;