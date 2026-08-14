import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
 const user = JSON.parse(localStorage.getItem("user"));
 
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const { darkMode, toggleTheme } = useContext(ThemeContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          <FaBookOpen /> Book App
        </Link>


        <div className="navbar-nav ms-auto">
<Link
  className="nav-link"
  to="/favorites"
  style={{
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
    gap: "4px",
    padding: 0
  }}
>
  <FaHeart /> Favoris
</Link>

<div>
   {user && (
  <span style={{ color: "white", fontWeight: "600", marginRight: "15px" }}>
    Bonjour {user.username}
  </span>
)}

          <button
            className="btn btn-outline-light ms-3"
            onClick={toggleTheme}
          >
            {darkMode ? "☀️ Clair" : "🌙 Sombre"}
          </button>


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
      </div>
    </nav>
  );
}

export default Navbar;