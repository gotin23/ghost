// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   // Ajoutez d'autres champs pour le profil
//   bio: String,
//   avatar: String,
//   // etc.
// });

// module.exports = mongoose.model("Profile", profileSchema);
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Ajoutez d'autres champs pour le profil
  Profiles: {
    type: [
      {
        username: String,
        avatar: String,
        role: String,
      },
    ],
  },
});
// const profileSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   // Ajoutez d'autres champs pour le profil
//   Admin: {
//     type: [
//       {
//         username: String,
//         avatar: String,
//       },
//     ],
//     default: [],
//   },
//   secondaryUsers: {
//     type: [
//       {
//         username: { type: String },
//         avatar: { type: String },
//       },
//     ],
//     default: [
//       { username: "", avatar: "" },
//       { username: "", avatar: "" },
//       { username: "", avatar: "" },
//       { username: "", avatar: "" },
//     ],
//   },
// });

module.exports = mongoose.model("Profile", profileSchema);
