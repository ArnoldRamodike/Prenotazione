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

    try {
            if (!place || !name || !price || !name) {
                res.status(statuscode.BAD_GATEWAY).json("Name, Price and Place are reqired fields.");
            }else{
                const booking = await Booking.create({
                   name: name,
                   phone: phone,
                   user: user.id,
                   place: place,
                   checkIn: checkIn,
                   checkOut: checkOut,
                   numberOfGuests: numberOfGuests,
                   price: price
                });      

                res.status(statuscode.CREATED).json(booking);
            }
            
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
});

const getBookings = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;
    try {
        const bookingDoc =  await Booking.find({user: id}).populate('place');
        res.status(statuscode.SUCCESS).json(bookingDoc);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
    
});

const getBooking = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;

    try {
        const booking =  await Booking.find({user: id}).populate('place');
        res.status(statuscode.SUCCESS).json(booking);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
  
})
const updateBooking = asyncHandler( async (req, res) => {

    const user = await getUserDataFromReq(req);
    const {id} = req.params;;

    const booking =  await Booking.find({user: id}).populate('place');
    if (!booking) {
        res.status(statuscode.NOT_FOUND).json(error)
    }
    try {
        const bookingDoc =  await Booking.updateOne({user: id});
        res.json(bookingDoc).status(201).statusMessage("Bookin Updated Successfully");
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
   
})
const DeleteBooking = asyncHandler( async (req, res) => {
     await getUserDataFromReq(req);
    const {id} = req.params;

    try {
        const bookingDoc =  await Booking.deleteOne({id})
        res.json(bookingDoc).statusMessage("Booking Deleted successfully");
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
   
})


module.exports = { createBooking, getBookings, getBooking, updateBooking, DeleteBooking}

