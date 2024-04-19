const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");
const Place = require('../models/Place');
const dotevn = require("dotenv").config();

const {statuscode} = require('../utils/StatusCodes');

mongoose.connect(process.env.MONGODB_URL);


const createPlaces = asyncHandler( async (req, res) => {
    const {title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest  } = req.body;
    const { token} = req.cookies;
    try {
            jwt.verify(token, jwtSecrete, {}, async(err, user) => {
                if (err) throw err;
    
                const placeDoc = await Place.create({
                   owner: user.id,
                   title, address, 
                   photos:addedPhotos, 
                   description,perks,
                   extraInfo, checkIn, 
                   checkOut, maxGuest
                })
                res.status(statuscode.CREATED).json(placeDoc);
            })
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
})

const getPlaces = asyncHandler( async (req, res) => {
    const { token} = req.cookies;
        jwt.verify(token, jwtSecrete, {}, async(err, user) => {
            if (err) throw err;
            const {id} = user;
            const places =  await Place.find({owner: id});
            res.status(statuscode.SUCCESS).json(places);
        })
});

const getPlace = asyncHandler(  async (req, res) => {
    const {id} = req.params;
         const [place] =  await Place.find({_id: id});
         res.status(statuscode.FOUND).json(place);
});

const updatelaces = asyncHandler(  async (req, res) => {
    const {id, title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest  } = req.body;
    const { token} = req.cookies;

    try {
            jwt.verify(token, jwtSecrete, {}, async(err, user) => {
                if (err) throw err;
                const placeDoc = await Place.findById(id);
                if (user.id === placeDoc.owner.toString()) {
                 placeDoc.set({
                   title, address, 
                   photos:addedPhotos, description,
                   perks,extraInfo, 
                   checkIn, checkOut, maxGuest
                });
                await placeDoc.save();
                res.status(statuscode.SUCCESS).json('ok');
             }   
            })
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
});

module.exports = {createPlaces, getPlace, getPlaces, updatelaces}