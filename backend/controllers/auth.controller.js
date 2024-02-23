const crypto = require("crypto");
const util = require("util");
const pbkdf2Async = util.promisify(crypto.pbkdf2);
const User = require("../models/user");
const Profile = require("../models/profiles");
const jwt = require("jsonwebtoken");
// const secretKey = crypto.randomBytes(32).toString("hex");
const passport = require("passport");
const validator = require("validator");

async function signup(req, res, next) {
  try {
    // Vérification des données d'entrée
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    // Validation des données

    //email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }
    //username
    if (username.length < 5) {
      return res.status(400).json({ message: "Please provide a valid username" });
    }
    //password
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
      return res.status(400).json({ message: "Please provide a valid password" });
    }

    // Génération de sel et hachage du mot de passe
    const salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2Async(password, salt, 310000, 32, "sha256");

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      hashed_password: hashedPassword,
      email,
      salt,
    });
    const newProfile = new Profile({
      user: newUser._id,

      Profiles: [{ username: username, avatar: "avatar1", role: "admin" }],
    });
    // const newProfile = new Profile({
    //   user: newUser._id,

    //   Admin: [{ username: username, avatar: "avatar1" }],
    // });

    newUser.profile = newProfile._id;

    // Tentative de sauvegarde de l'utilisateur dans la base de données
    try {
      await newUser.save();
      await newProfile.save();
    } catch (error) {
      // Gestion des erreurs liées à la sauvegarde dans la base de données
      if (error.code === 11000) {
        // Le code 11000 correspond à une violation d'index unique (doublon)
        if (error.keyValue.email) {
          return res.status(409).json({ message: "Email already use" });
        } else {
          return res.status(409).json({ message: "Username  already use" });
        }
      }
      // Autres erreurs
      console.error("Error saving user:", error);
      return res.status(500).json({ message: "Error when user created" });
    }

    // Ajout de l'utilisateur à la session
    const user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    req.logIn(user, function (err) {
      if (err) {
        console.error("Error signing up");
        return next(err);
      }
      console.log("User saved");
      res.status(201).json({ message: "User saved successfully" });
    });
  } catch (err) {
    return next(err);
  }
}

function login(req, res, next) {
  console.log("Login attempt");

  passport.authenticate("local", function (err, user, info) {
    console.log("After passport.authenticate");
    if (err) {
      console.error(err); // Logez l'erreur pour voir les détails
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed");
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.logIn(user, function (err) {
      if (err) {
        console.error(err); // Logez l'erreur pour voir les détails
        return next(err);
      }
      // Si l'authentification est réussie, générez un token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

      // Inclure le token dans la réponse JSON
      console.log("Authentication successful");
      return res.json({ message: "Authentication successful", token: token });
    });
  })(req, res, next);
}
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
// async function getProfile(req, res) {
//   try {
//     const userId = req.user.userId;
//     console.log(req.user.userId);

//     const user = await User.findById(userId).populate("profile");
//     if (!user) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }
//     res.json(user.profile);
//   } catch (err) {
//     console.error("Erreur lors de la récupération du profil de l'utilisateur :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// }

module.exports = {
  signup,
  login,
  // getProfile,
  // authenticateToken,
};
