const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const User = require("../models/user");
const authController = require("../controllers/auth.controller");
const router = express.Router();

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      console.log("Inside LocalStrategy verify");

      // Recherche de l'utilisateur dans la base de données
      const user = await User.findOne({ username });

      if (!user) {
        console.log("User not found");
        return cb(null, false, { message: "Incorrect username or password." });
      }

      // Vérification du mot de passe
      const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, user.salt, 310000, 32, "sha256", (err, key) => {
          if (err) reject(err);
          else resolve(key);
        });
      });

      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        console.log("Incorrect password");
        return cb(null, false, { message: "Incorrect username or password." });
      }

      console.log("Authentication successful");
      return cb(null, user);
    } catch (err) {
      console.log("Error in LocalStrategy verify", err);
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post("/signup", authController.signup);
router.post("/login/password", authController.login);
// router.get("/profile", authController.authenticateToken, authController.getProfile);

module.exports = router;
