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
    const { username, avatar, position } = req.body; // Supposons que vous envoyez ces nouvelles valeurs depuis le frontend

    // Récupérer l'utilisateur actuel
    const user = await User.findById(userId).populate("profile");
    console.error(username, avatar, user.profile.secondaryUsers[0]);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.profile.secondaryUsers.length > 0) {
      user.profile.secondaryUsers[position].username = username;
      user.profile.secondaryUsers[position].avatar = avatar;
    } else {
      // Si secondaryUsers est vide, ajoutez le premier objet
      user.profile.secondaryUsers.push({ username: username, avatar: avatar });
    }

    // Enregistrer les modifications
    await user.profile.save();

    res.json(user.profile.secondaryUsers); // Renvoyer le premier objet mis à jour
  } catch (err) {
    console.error("Erreur lors de la modification du profil de l'utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  getProfile,
  modifyProfile,
  authenticateToken,
};
