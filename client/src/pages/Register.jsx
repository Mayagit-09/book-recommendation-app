import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================
  // CHANGEMENT DES CHAMPS
  // =====================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================
  // INSCRIPTION
  // =====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      // ✅ CORRECTION
      const res = await api.post(
        "/auth/register",
        form
      );

      console.log(
        "✅ Inscription réussie :",
        res.data
      );

      // Redirection vers Login
      navigate("/login");

    } catch (err) {

      console.error(
        "❌ Erreur inscription :",
        err.response?.data || err.message
      );

      setErrorMessage(
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'inscription."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* ICÔNE */}

        <div className="register-icon">
          📚
        </div>

        {/* TITRE */}

        <h2>
          Créer un compte
        </h2>

        <p className="auth-subtitle">
          Rejoignez notre communauté de lecteurs
        </p>

        {/* MESSAGE D'ERREUR */}

        {errorMessage && (
          <div className="register-error">

            <span>⚠️</span>

            <span>
              {errorMessage}
            </span>

          </div>
        )}

        {/* FORMULAIRE */}

        <form onSubmit={handleSubmit}>

          {/* NOM */}

          <div className="form-group">

            <label htmlFor="username">
              Nom d'utilisateur
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

          </div>

          {/* MOT DE PASSE */}

          <div className="form-group">

            <label htmlFor="password">
              Mot de passe
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

          </div>

          {/* BOUTON */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading
              ? "Création du compte..."
              : "S'inscrire"}

          </button>

        </form>

        {/* CONNEXION */}

        <p className="auth-link">

          Vous avez déjà un compte ?{" "}

          <span
            onClick={() => navigate("/login")}
          >
            Se connecter
          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;