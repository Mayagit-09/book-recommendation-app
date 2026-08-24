# 📚 Book Recommendation App

Application web de recommandation de livres développée avec la stack MERN.

L'application permet aux utilisateurs de découvrir des livres, de rechercher des ouvrages, de les ajouter aux favoris, de publier des commentaires et des évaluations, de suivre d'autres utilisateurs et de recevoir des recommandations personnalisées.

---

# 🚀 Phase 7 — Déploiement et tests en production

## 🎯 Objectif de la phase

Déployer l'application complète dans un environnement de production et vérifier que toutes les fonctionnalités fonctionnent correctement.

---

## 🛠️ Technologies utilisées

### Frontend
- React.js
- React Router
- Axios
- Bootstrap
- Bootstrap Icons
- React Icons
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Axios
- CORS

### Déploiement
- Render
- MongoDB Atlas
- Git
- GitHub

---

# 🌐 Déploiement

## Frontend

Le frontend React a été déployé sur Render.

### URL du frontend

https://book-recommendation-client.onrender.com

---

## Backend

Le backend Node.js / Express a été déployé sur Render.

### URL du backend

https://book-recommendation-app-b9z0.onrender.com

### API

https://book-recommendation-app-b9z0.onrender.com/api

---

# 🗄️ Base de données

L'application utilise MongoDB Atlas pour stocker les données.

Les données suivantes sont notamment stockées :

- Utilisateurs
- Livres
- Favoris
- Commentaires
- Évaluations
- Followers
- Following

Les informations sensibles de connexion à MongoDB ne sont pas enregistrées dans GitHub.

Elles sont configurées comme variables d'environnement sur Render.

---

# 🔐 Authentification

L'application utilise une authentification basée sur JWT.

Les fonctionnalités d'authentification comprennent :

- Inscription
- Connexion
- Génération d'un token JWT
- Protection des routes privées
- Gestion de la session utilisateur
- Déconnexion

---

# 📚 Fonctionnalités

## 👤 Gestion des utilisateurs

- Création d'un compte
- Connexion
- Profil utilisateur
- Affichage de l'adresse email
- Followers
- Following

## 📖 Gestion des livres

- Affichage des livres
- Recherche de livres
- Ajout d'un livre
- Modification d'un livre
- Suppression d'un livre
- Consultation des détails d'un livre

## ❤️ Interaction avec les livres

- Like d'un livre
- Ajout aux favoris
- Suppression des favoris
- Commentaires
- Évaluation avec étoiles ⭐

## 🤖 Recommandations personnalisées

L'application propose des recommandations de livres en fonction des interactions de l'utilisateur.

Le système utilise notamment :

- Les livres likés
- Les genres préférés
- Les interactions de l'utilisateur

Une page dédiée permet d'afficher les recommandations personnalisées.

---

# 🔗 Communication Frontend / Backend

Le frontend communique avec le backend grâce à Axios.

L'API de production est configurée avec :

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://book-recommendation-app-b9z0.onrender.com/api",
});

export default api;

📌 URLs du projet
🌐 Application

https://book-recommendation-client.onrender.com

⚙️ Backend API

https://book-recommendation-app-b9z0.onrender.com

💻 GitHub

https://github.com/Mayagit-09/book-recommendation-app

👩‍💻 Auteur

Asma Rabahi

Projet réalisé dans le cadre du Bootcamp de Développement Logiciel.