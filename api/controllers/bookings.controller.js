const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");
const Booking = require('../models/Booking');
const dotevn = require("dotenv").config();

const {statuscode} = require('../utils/StatusCodes');

mongoose.connect(process.env.MONGODB_URL);

const createBooking = asyncHandler( async (req, res) => {
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
    const { token} = req.cookies;
    try {
            jwt.verify(token, jwtSecrete, {}, async(err, user) => {
                if (err) throw err;
    
                const booking = await Booking.create({
                   name: name,
                   phone: phone,
                })
                res.status(statuscode.CREATED).json(placeDoc);
            })
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
})