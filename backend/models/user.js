const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  hashed_password: Buffer,
  salt: Buffer,
  name: String,
  email: { type: String, unique: true },
  email_verified: Boolean,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

module.exports = mongoose.model("User", userSchema);
