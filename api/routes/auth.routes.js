const express = require("express");
const router = express.Router();

const {Register, Login, Profile, Logout} = require("../controllers/auth.controller");
const { AdminToken,checkToken, getUserDataFromReq } = require("../middleware/tokenValidation");

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").post(Logout);
router.route("/profile").get(checkToken, Profile);

module.exports = router;
