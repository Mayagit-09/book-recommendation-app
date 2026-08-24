const User = require("../models/User");
const Book = require("../models/Book");
const Comment = require("../models/Comment");
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

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      username: username.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

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

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

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


// =====================
// 👤 MON PROFIL
// =====================

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Informations utilisateur
    const user = await User.findById(userId)
      .select("-password")
      .populate(
        "followers",
        "username email"
      )
      .populate(
        "following",
        "username email"
      );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // ❤️ Livres likés par l'utilisateur
    const likedBooks = await Book.find({
      likes: userId,
    }).populate(
      "recommendedBy",
      "username"
    );

    // 💬 Commentaires écrits par l'utilisateur
    const comments = await Comment.find({
      user: userId,
    })
      .populate(
        "book",
        "title author image"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },

      likedBooks,

      comments,
    });

  } catch (error) {
    console.error(
      "Erreur récupération profil :",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};