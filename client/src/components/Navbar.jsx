import { Link, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaHeart,
  FaSignOutAlt,
  FaUser,
  FaStar
} from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  // =========================
  // DÉCONNEXION
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">

        {/* =========================
            LOGO
        ========================= */}

        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
        >
          <FaBookOpen />
          <span>Book App</span>
        </Link>

        {/* =========================
            BOUTON MENU MOBILE
        ========================= */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Ouvrir le menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* =========================
            MENU
        ========================= */}

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <div className="navbar-nav ms-auto d-flex align-items-lg-center">

            {/* =========================
                PROFIL
            ========================= */}

            {token && (
              <Link
                to="/profile"
                className="nav-link d-flex align-items-center gap-2 px-3"
              >
                <FaUser />
                <span>Profil</span>
              </Link>
            )}

            {/* =========================
                RECOMMANDATIONS
            ========================= */}

            {token && (
              <button
                className="btn btn-outline-primary ms-lg-2 my-2 my-lg-0"
                onClick={() =>
                  navigate("/recommendations")
                }
              >
                <FaStar className="me-1" />
                Recommandations
              </button>
            )}

            {/* =========================
                FAVORIS
            ========================= */}

            {token && (
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3"
                to="/favorites"
              >
                <FaHeart />
                <span>Favoris</span>
              </Link>
            )}

            {/* =========================
                UTILISATEUR
            ========================= */}

            {user && (
              <span
                className="navbar-text px-3"
                style={{
                  color: "white",
                  fontWeight: "600"
                }}
              >
                Bonjour {user.username} 👋
              </span>
            )}

            {/* =========================
                THÈME
            ========================= */}

            <button
              className="btn btn-outline-light ms-lg-2 my-2 my-lg-0"
              onClick={toggleTheme}
              type="button"
            >
              {darkMode ? "☀️ Clair" : "🌙 Sombre"}
            </button>

            {/* =========================
                DÉCONNEXION
            ========================= */}

            {token && (
              <button
                className="btn btn-danger ms-lg-2 my-2 my-lg-0"
                onClick={logout}
                type="button"
              >
                <FaSignOutAlt className="me-1" />
                Se déconnecter
              </button>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;