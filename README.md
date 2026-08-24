# 📚 Book Recommendation App — Phase 6

## 🎯 Objectif de la Phase 6

Cette phase a pour objectif d'améliorer l'expérience utilisateur en permettant aux utilisateurs d'interagir avec les livres et de recevoir des recommandations personnalisées selon leurs préférences et leurs interactions.

---

## 🚀 Fonctionnalités développées

### 👤 1. Profil utilisateur

Une page de profil a été créée afin de permettre à l'utilisateur de consulter :

- 👤 Son nom d'utilisateur
- 📧 Son adresse email
- ❤️ Ses livres likés
- 💬 Ses commentaires
- 👥 Ses followers
- 👥 Les utilisateurs qu'il suit
- 📊 Les statistiques de son activité

---

### ❤️ 2. Interaction avec les livres

L'application permet à l'utilisateur d'interagir avec les livres :

- ❤️ Ajouter un livre aux favoris
- 📖 Consulter les détails d'un livre
- ⭐ Noter un livre
- ✏️ Modifier un livre
- 🗑️ Supprimer un livre
- 📚 Ajouter de nouveaux livres

Les actions sont protégées par une authentification JWT.

---

### ✨ 3. Recommandations personnalisées

Une page **Recommandations** a été ajoutée.

Elle permet d'afficher :

- 📚 Une liste de livres recommandés
- 🏷️ Les genres préférés de l'utilisateur
- ⭐ Les notes des livres
- 👤 L'utilisateur ayant recommandé le livre
- 📝 Une description du livre

Les recommandations sont basées sur les interactions et les préférences de l'utilisateur.

---

### 🔍 4. Recherche de livres

L'utilisateur peut rechercher des livres grâce à l'intégration de l'API **Open Library**.

La recherche permet d'obtenir :

- 📖 Le titre
- ✍️ L'auteur
- 🖼️ L'image
- 🏷️ Le genre
- 📝 La description

L'utilisateur peut ensuite ajouter directement un livre trouvé à sa bibliothèque.

---

### 📚 5. Bibliothèque personnelle

La page d'accueil affiche les livres enregistrés dans la bibliothèque.

L'utilisateur peut :

- 🔎 Rechercher un livre dans sa bibliothèque
- 📖 Consulter ses détails
- ❤️ L'ajouter aux favoris
- ✏️ Le modifier
- 🗑️ Le supprimer
- ⭐ Le noter

---

### 🔐 6. Authentification

L'application possède un système d'authentification sécurisé avec JWT.

Fonctionnalités :

- 📝 Inscription
- 🔑 Connexion
- 🚪 Déconnexion
- 🔒 Routes protégées
- 💾 Stockage du token JWT
- 👤 Gestion de l'utilisateur connecté

---

### 🌙 7. Mode sombre

Un système de changement de thème a été intégré :

- ☀️ Mode clair
- 🌙 Mode sombre

L'utilisateur peut changer de thème directement depuis la barre de navigation.

---

### 🧭 8. Navigation

La navigation de l'application comprend :

- 🏠 Accueil
- 👤 Profil
- ✨ Recommandations
- ❤️ Favoris
- 🔐 Connexion
- 📝 Inscription
- ℹ️ À propos

La navigation est réalisée avec **React Router**.

---

## 🛠️ Technologies utilisées

### Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- API Open Library

### Outils

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas
- MongoDB Compass
- npm

---

## 📂 Structure du projet

```text
book-recommendation-app/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AddBook.jsx
│   │   │   ├── BookSearch.jsx
│   │   │   ├── EditBook.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── Rating.jsx
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   └── About.jsx
│   │   │
│   │   └── services/
│   │       └── api.js
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md