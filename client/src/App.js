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