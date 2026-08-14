const User = require("../models/User");


// Ajouter un livre aux favoris ❤️

exports.addFavorite = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);


    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }


    const bookId = req.params.bookId;


    if (!user.favorites.includes(bookId)) {

      user.favorites.push(bookId);

      await user.save();

    }


    res.json({

      message: "Livre ajouté aux favoris ❤️",

      favorites: user.favorites

    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// Supprimer un livre des favoris

exports.removeFavorite = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);


    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.bookId
    );


    await user.save();


    res.json({

      message: "Livre supprimé des favoris"

    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// Afficher les favoris

exports.getFavorites = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .populate("favorites");


    res.json(user.favorites);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};