import { Link, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaHeart,
  FaSignOutAlt
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* =========================
            LOGO
        ========================= */}

        <Link
          className="navbar-brand"
          to="/"
        >
          <FaBookOpen /> Book App
        </Link>


        {/* =========================
            MENU
        ========================= */}

        <div className="navbar-nav ms-auto d-flex align-items-center">

          {/* PROFIL */}

          {token && (
            <Link
              to="/profile"
              className="nav-link"
            >
              👤 Profil
            </Link>
          )}


          {/* RECOMMANDATIONS */}

          {token && (
            <button
              className="btn btn-outline-primary ms-3"
              onClick={() =>
                navigate("/recommendations")
              }
            >
              ✨ Recommandations
            </button>
          )}


          {/* FAVORIS */}

          {token && (
            <Link
              className="nav-link"
              to="/favorites"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                marginRight: "20px",
                gap: "4px",
                padding: 0
              }}
            >
              <FaHeart /> Favoris
            </Link>
          )}


          {/* UTILISATEUR */}

          {user && (
            <span
              style={{
                color: "white",
                fontWeight: "600",
                marginRight: "15px"
              }}
            >
              Bonjour {user.username}
            </span>
          )}


          {/* THÈME */}

          <button
            className="btn btn-outline-light ms-3"
            onClick={toggleTheme}
          >
            {darkMode
              ? "☀️ Clair"
              : "🌙 Sombre"}
          </button>


          {/* DÉCONNEXION */}

          {token && (
            <button
              className="btn btn-danger ms-3"
              onClick={logout}
            >
              <FaSignOutAlt /> Se déconnecter
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;