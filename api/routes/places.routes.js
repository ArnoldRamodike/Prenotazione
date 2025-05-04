const express = require("express");
const router = express.Router();

const {createPlaces, getPlaces, getPlace, updatePlaces, deletePlace, getUserPlaces} = require("../controllers/places.controller");

router.route("/").post(createPlaces);
router.route("/").get(getPlaces);
router.route("/user-places").get(getUserPlaces);
router.route("/:id").get(getPlace);
router.route("/:id").put(updatePlaces);
router.route("/:id").put(deletePlace);

module.exports = router;
