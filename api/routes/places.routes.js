const express = require("express");
const router = express.Router();

const {createPlaces, getPlaces, getPlace, updatelaces} = require("../controllers/places.controller");

router.route("/").post(createPlaces);
router.route("/").get(getPlaces);
router.route("/:id").get(getPlace);
router.route("/").put(updatelaces);
