const express = require("express");
const router = express.Router();

const {createPlaces, getPlaces, getPlace, updatelaces, deletePlace} = require("../controllers/places.controller");

router.route("/").post(createPlaces);
router.route("/").get(getPlaces);
router.route("/:id").get(getPlace);
router.route("/:id").put(updatelaces);
router.route("/:id").put(deletePlace);

module.exports = router;
