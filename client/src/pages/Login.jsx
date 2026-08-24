import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================
  // CHANGEMENT DES CHAMPS
  // =====================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================
  // CONNEXION
  // =====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      // ✅ CORRECTION : /auth/login
      const res = await api.post(
        "/auth/login",
        form
      );

      console.log("✅ Connexion réussie :", res.data);

      // =====================
      // ENREGISTRER LE TOKEN
      // =====================

      localStorage.setItem(
        "token",
        res.data.token
      );

      // =====================
      // ENREGISTRER L'UTILISATEUR
      // =====================

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // =====================
      // REDIRECTION
      // =====================

      navigate("/");

    } catch (error) {

      console.error(
        "❌ Erreur login :",
        error.response?.data || error.message
      );

      setErrorMessage(
        error.response?.data?.message ||
        "Email ou mot de passe incorrect."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ICÔNE */}

        <div className="login-icon">
          📚
        </div>

        {/* TITRE */}

        <h2>
          Connexion
        </h2>

        <p className="login-subtitle">
          Bienvenue sur l'application de
          recommandation de livres
        </p>

        {/* MESSAGE D'ERREUR */}

        {errorMessage && (
          <div className="login-error">

            <span>⚠️</span>

            <span>
              {errorMessage}
            </span>

          </div>
        )}

        {/* FORMULAIRE */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="input-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* MOT DE PASSE */}

          <div className="input-group">

            <label htmlFor="password">
              Mot de passe
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* BOUTON */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Connexion..."
              : "Se connecter"}

          </button>

        </form>

        {/* INSCRIPTION */}

        <p className="register-text">
          Vous n'avez pas encore de compte ?
        </p>

        <button
          type="button"
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Créer un compte
        </button>

      </div>

    </div>
  );
}

export default Login;