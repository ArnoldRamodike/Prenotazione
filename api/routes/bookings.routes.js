const express = require("express");
const router = express.Router();

const {getBookings, getBooking, createBooking, updateBooking, DeleteBooking} = require("../controllers/bookings.controller");

router.route("/").post(createBooking);
router.route("/").get(getBookings);
router.route("/:id").get(getBooking);
router.route("/:id").put(updateBooking);
router.route("/:id").put(DeleteBooking);
