const User = require("../models/User");
const Book = require("../models/Book");
const Comment = require("../models/Comment");

// ========================================
// 👤 MON PROFIL
// GET /api/users/profile
// ========================================

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "username email")
      .populate("following", "username email");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // ❤️ Livres likés
    const likedBooks = await Book.find({
      likes: userId,
    })
      .populate("recommendedBy", "username")
      .sort({ createdAt: -1 });

    // 💬 Commentaires de l'utilisateur
    const comments = await Comment.find({
      user: userId,
    })
      .populate("book", "title author image")
      .sort({ createdAt: -1 });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,

        followers: user.followers || [],
        following: user.following || [],

        followersCount: user.followers
          ? user.followers.length
          : 0,

        followingCount: user.following
          ? user.following.length
          : 0,
      },

      likedBooks,

      comments,
    });
  } catch (error) {
    console.error(
      "❌ Erreur récupération profil :",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// 👥 SUIVRE UN UTILISATEUR
// POST /api/users/:id/follow
// ========================================

exports.followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    // Empêcher de se suivre soi-même
    if (
      currentUserId.toString() ===
      targetUserId.toString()
    ) {
      return res.status(400).json({
        message: "Vous ne pouvez pas vous suivre vous-même.",
      });
    }

    const currentUser = await User.findById(
      currentUserId
    );

    const targetUser = await User.findById(
      targetUserId
    );

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // Vérifier si déjà suivi
    const alreadyFollowing =
      currentUser.following.some(
        (id) =>
          id.toString() === targetUserId.toString()
      );

    if (alreadyFollowing) {
      return res.status(400).json({
        message: "Vous suivez déjà cet utilisateur.",
      });
    }

    // Ajouter dans following
    currentUser.following.push(targetUserId);

    // Ajouter dans followers
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.json({
      message: "Utilisateur suivi avec succès ❤️",
      following: currentUser.following,
      followersCount: targetUser.followers.length,
    });
  } catch (error) {
    console.error(
      "❌ Erreur follow :",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// 👥 NE PLUS SUIVRE
// DELETE /api/users/:id/follow
// ========================================

exports.unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    const currentUser = await User.findById(
      currentUserId
    );

    const targetUser = await User.findById(
      targetUserId
    );

    if (!currentUser || !targetUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // Retirer de following
    currentUser.following =
      currentUser.following.filter(
        (id) =>
          id.toString() !== targetUserId.toString()
      );

    // Retirer de followers
    targetUser.followers =
      targetUser.followers.filter(
        (id) =>
          id.toString() !== currentUserId.toString()
      );

    await currentUser.save();
    await targetUser.save();

    res.json({
      message: "Utilisateur retiré des abonnements.",
      following: currentUser.following,
      followersCount: targetUser.followers.length,
    });
  } catch (error) {
    console.error(
      "❌ Erreur unfollow :",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};