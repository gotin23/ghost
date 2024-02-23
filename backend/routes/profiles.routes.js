const express = require("express");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const crypto = require("crypto");
// const User = require("../models/user");
const profilesController = require("../controllers/profiles.controller");
const router = express.Router();

router.get("/profiles", profilesController.authenticateToken, profilesController.getProfile);
router.put("/profiles", profilesController.authenticateToken, profilesController.modifyProfile);

module.exports = router;
