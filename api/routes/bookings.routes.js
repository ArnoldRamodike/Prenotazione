const express = require("express");
const router = express.Router();

const {} = require("../controllers/bookings.controller");

router.route("/").post();
router.route("/").get();
router.route("/:id").get();
router.route("/").put();
