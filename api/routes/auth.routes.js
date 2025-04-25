const express = require("express");
const router = express.Router();

const {Register, Login, Profile, Logout} = require("../controllers/auth.controller");

router.route("/login/").post(Login);
router.route("/register/").post(Register);
router.route("/logout/").post(Logout);
router.get("/profile/").get(Profile);

module.exports = router;
