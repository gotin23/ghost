const User = require("../models/user");

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403), console.log("error with token");
    req.user = user;
    next();
  });
}
async function getProfile(req, res) {
  try {
    const userId = req.user.userId;
    console.log(req.user.userId);

    const user = await User.findById(userId).populate("profile");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user.profile);
  } catch (err) {
    console.error("Erreur lors de la récupération du profil de l'utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
async function modifyProfile(req, res) {
  try {
    const userId = req.user.userId;
    const { id, username, avatar, role } = req.body; // Supposons que vous envoyez ces nouvelles valeurs depuis le frontend

    // Récupérer l'utilisateur actuel
    const user = await User.findById(userId).populate("profile");
    const index = user.profile.Profiles.findIndex((el) => el.id === id);
    console.log(id, username, avatar, role, index, user.profile.Profiles);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if (username.length < 3 || username.length > 15) {
      return res.status(400).json({ message: "your username must be between 3 characters and 16 characters" });
    }

    if (index !== -1) {
      user.profile.Profiles[index].username = username;
      user.profile.Profiles[index].avatar = avatar;
      user.profile.Profiles[index].role = role;
    } else {
    }

    // Enregistrer les modifications
    await user.profile.save();

    res.json(user.profile.Profiles[index]); // Renvoyer le premier objet mis à jour
  } catch (err) {
    console.error("Erreur lors de la modification du profil de l'utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
async function addNewProfile(req, res) {
  try {
    const userId = req.user.userId;
    const { username, avatar, role } = req.body;

    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username.length < 3 || username.length > 15) {
      return res.status(400).json({ message: "your username must be between 3 characters and 16 characters" });
    }

    if (user.profile.Profiles.length < 5) {
      user.profile.Profiles.push({ username: username, avatar: avatar, role: role });
    } else {
      console.error("cannot add new user, account already have maximun users");
    }

    // Enregistrer les modifications
    await user.profile.save();

    res.json(user.profile.Profiles); // Renvoyer le premier objet mis à jour
  } catch (err) {
    console.error("Error when profile added:", err);
    res.status(500).json({ message: "Server error" });
  }
}
async function deleteProfile(req, res) {
  try {
    const userId = req.user.userId;
    const { id } = req.body;

    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.profile.Profiles.findIndex((el) => el.id === id);
    if (index !== -1) {
      user.profile.Profiles.splice(index, 1);
      console.log("Profile deleted");
    } else {
      console.error("cannot delete user");
    }
    // if (user.profile.Profiles.find((el) => el.id === id)) {
    //   user.profile.Profiles.filter((el) => el.id !== id);
    // } else {
    //   console.error("cannot delete user");
    // }

    await user.profile.save();

    res.json(user.profile.Profiles); // Renvoyer le premier objet mis à jour
  } catch (err) {
    console.error("Error when profile added:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getProfile,
  modifyProfile,
  addNewProfile,
  deleteProfile,
  authenticateToken,
};
