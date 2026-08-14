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
      password
    } = req.body;



    const cleanEmail = email
      .trim()
      .toLowerCase();



    const existingUser = await User.findOne({
      email: cleanEmail
    });



    if (existingUser) {

      return res.status(400).json({

        message: "Email already exists"

      });

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await User.create({

      username,

      email: cleanEmail,

      password: hashedPassword

    });



    res.status(201).json({

      message: "User created successfully",

      user: {

        id: user._id,

        username: user.username,

        email: user.email

      }

    });



  } catch (error) {


    res.status(500).json({

      message: error.message

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
      password
    } = req.body;



    const cleanEmail = email
      .trim()
      .toLowerCase();



    console.log(
      "EMAIL RECHERCHE :",
      cleanEmail
    );



    const user = await User.findOne({

      email: cleanEmail

    });



    console.log(
      "USER TROUVE :",
      user
    );



    if (!user) {


      return res.status(404).json({

        message: "User not found"

      });


    }




    const isMatch = await bcrypt.compare(

      password,

      user.password

    );




    if (!isMatch) {


      return res.status(400).json({

        message: "Invalid password"

      });


    }




    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn:"7d"
      }

    );





    res.json({

      message:"Login successful",

      token,

      user:{

        id:user._id,

        username:user.username,

        email:user.email

      }

    });





  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }


};