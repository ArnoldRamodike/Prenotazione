const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");
const Booking = require('../models/Booking');
const dotevn = require("dotenv").config();

const {statuscode} = require('../utils/StatusCodes');
const { getUserDataFromReq } = require("../middleware/tokenValidation");

mongoose.connect(process.env.MONGODB_URL);

const createBooking = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
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
});

const getBookings = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;
    const bookingDoc =  await Booking.find({user: id}).populate('place');
    res.json(bookingDoc);
});

const getBooking = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;
    const booking =  await Booking.find({user: id}).populate('place');
    res.json(booking);
})
const updateBooking = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;
    const bookingDoc =  await Booking.updateOne({user: id});
    res.json(bookingDoc).status(201).statusMessage("Bookin Updated Successfully");
})
const DeleteBooking = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;
    const bookingDoc =  await Booking.deleteOne({id})
    res.json(bookingDoc).statusMessage("Booking Deleted successfully");
})


module.exports = { createBooking, getBookings, getBooking, updateBooking, DeleteBooking}

