import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // RÉCUPÉRER LE PROFIL
  // ========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get(
          "/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data);
      } catch (error) {
        console.error(
          "Erreur profil :",
          error
        );

        setError(
          error.response?.data?.message ||
            "Impossible de récupérer le profil."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ========================================
  // CHARGEMENT
  // ========================================

  if (loading) {
    return (
      <div className="profile-loading">
        <h3>Chargement du profil...</h3>
      </div>
    );
  }

  // ========================================
  // ERREUR
  // ========================================

  if (error) {
    return (
      <div className="profile-error">
        <h3>⚠️ {error}</h3>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
        >
          Se connecter
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const user = profile.user;

  const likedBooks =
    profile.likedBooks || [];

  const comments =
    profile.comments || [];

  const followers =
    user.followers || [];

  const following =
    user.following || [];

  return (
    <div className="profile-page">

      {/* ========================================
          HEADER PROFIL
      ======================================== */}

      <div className="profile-header">

        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-info">

          <h1>
            {user.username}
          </h1>

          <p>
            📧 {user.email}
          </p>

        </div>

      </div>

      {/* ========================================
          STATISTIQUES
      ======================================== */}

      <div className="profile-stats">

        <div className="stat-card">
          <strong>
            {likedBooks.length}
          </strong>

          <span>
            ❤️ Livres likés
          </span>
        </div>

        <div className="stat-card">
          <strong>
            {comments.length}
          </strong>

          <span>
            💬 Commentaires
          </span>
        </div>

        <div className="stat-card">
          <strong>
            {user.followersCount || 0}
          </strong>

          <span>
            👥 Followers
          </span>
        </div>

        <div className="stat-card">
          <strong>
            {user.followingCount || 0}
          </strong>

          <span>
            👥 Following
          </span>
        </div>

      </div>

      {/* ========================================
          CONTENU
      ======================================== */}

      <div className="profile-content">

        {/* ======================================
            LIVRES LIKÉS
        ====================================== */}

        <section className="profile-section">

          <h2>
            ❤️ Mes livres likés
          </h2>

          {likedBooks.length === 0 ? (

            <p className="empty-message">
              Vous n'avez encore aimé aucun livre.
            </p>

          ) : (

            <div className="books-grid">

              {likedBooks.map((book) => (

                <div
                  className="profile-book-card"
                  key={book._id}
                  onClick={() =>
                    navigate(
                      `/books/${book._id}`
                    )
                  }
                >

                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={book.title}
                  />

                  <div className="book-card-info">

                    <h3>
                      {book.title}
                    </h3>

                    <p>
                      {book.author}
                    </p>

                    <span>
                      ⭐ {book.rating || 0}/5
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            COMMENTAIRES
        ====================================== */}

        <section className="profile-section">

          <h2>
            💬 Mes commentaires
          </h2>

          {comments.length === 0 ? (

            <p className="empty-message">
              Vous n'avez encore écrit aucun
              commentaire.
            </p>

          ) : (

            <div className="comments-list">

              {comments.map((comment) => (

                <div
                  className="profile-comment"
                  key={comment._id}
                >

                  <div>

                    <h4>
                      📖{" "}
                      {comment.book?.title ||
                        "Livre"}
                    </h4>

                    <p>
                      {comment.text}
                    </p>

                    <small>
                      {comment.createdAt
                        ? new Date(
                            comment.createdAt
                          ).toLocaleDateString(
                            "fr-FR"
                          )
                        : ""}
                    </small>

                  </div>

                  {comment.book?.image && (
                    <img
                      src={comment.book.image}
                      alt={
                        comment.book.title
                      }
                    />
                  )}

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            FOLLOWERS
        ====================================== */}

        <section className="profile-section">

          <h2>
            👥 Mes followers
          </h2>

          {followers.length === 0 ? (

            <p className="empty-message">
              Vous n'avez pas encore de followers.
            </p>

          ) : (

            <div className="users-list">

              {followers.map((follower) => (

                <div
                  className="user-card"
                  key={follower._id}
                >

                  <div className="user-avatar">
                    👤
                  </div>

                  <div>
                    <strong>
                      {follower.username}
                    </strong>

                    <small>
                      {follower.email}
                    </small>
                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            FOLLOWING
        ====================================== */}

        <section className="profile-section">

          <h2>
            👥 Utilisateurs suivis
          </h2>

          {following.length === 0 ? (

            <p className="empty-message">
              Vous ne suivez encore personne.
            </p>

          ) : (

            <div className="users-list">

              {following.map((person) => (

                <div
                  className="user-card"
                  key={person._id}
                >

                  <div className="user-avatar">
                    👤
                  </div>

                  <div>
                    <strong>
                      {person.username}
                    </strong>

                    <small>
                      {person.email}
                    </small>
                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default Profile;