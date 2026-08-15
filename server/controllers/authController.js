const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// REGISTER
// =====================

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    // Vérifier les champs
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // Nettoyer l'email
    const cleanEmail = email
      .trim()
      .toLowerCase();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email existe déjà",
      });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Créer l'utilisateur
    const user = await User.create({
      username: username.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

    // Réponse
    res.status(201).json({
      message: "Compte créé avec succès",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Erreur inscription :",
      error
    );

    res.status(500).json({
      message: "Une erreur interne est survenue.",
    });
  }
};

// =====================
// LOGIN
// =====================

exports.login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Vérifier les champs
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    // Nettoyer l'email
    const cleanEmail = email
      .trim()
      .toLowerCase();

    // Chercher l'utilisateur
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Créer le JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Réponse
    res.json({
      message: "Connexion réussie",

      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Erreur connexion :",
      error
    );

    res.status(500).json({
      message: "Une erreur interne est survenue.",
    });
  }
};