const express = require("express");
const router = express.Router();

const {Register, Login, Profile, Logout} = require("../controllers/auth.controller");

router.route("/").post(Login);
router.route("/").post(Register);
router.route("/").post(Logout);
router.get("/").get(Profile);
