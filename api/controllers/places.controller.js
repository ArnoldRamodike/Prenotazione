const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");
const Place = require('../models/Place');
const dotevn = require("dotenv").config();
const { getUserDataFromReq } = require("../middleware/tokenValidation");
const {statuscode} = require('../utils/StatusCodes');

mongoose.connect(process.env.MONGODB_URL);


const createPlaces = asyncHandler( async (req, res) => {
    const {title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest  } = req.body;
     const user = await getUserDataFromReq(req);
    try {
            if ( !address || !description || !checkIn || !checkOut) {
                res.status(statuscode.BAD_GATEWAY).json("Address , Description, check in and Check out are reqired fields.");
            }else{
                const placeDoc = await Place.create({
                   owner: user.id,
                   title, 
                   address, 
                   photos:addedPhotos, 
                   description,
                   perks,
                   extraInfo, 
                   checkIn, 
                   checkOut, 
                   maxGuest
                });
            
                res.status(statuscode.SUCCESS).json(placeDoc);
            }
           
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
})

const getPlaces = asyncHandler( async (req, res) => {
        try {
            const places =  await Place.find();
            if(!places)
                res.status(statuscode.BAD_GATEWAY).json("There are no available places Currenty, Please try again later.");
            res.status(statuscode.SUCCESS).json(places);
        } catch (error) {
            res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
        }
});

const getPlace = asyncHandler(  async (req, res) => {
    const {id} = req.params;
    try {
         const [place] =  await Place.find({_id: id});
         res.status(statuscode.SUCCESS).json(place);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
        
});

const getUserPlaces = asyncHandler(  async (req, res) => {
    const user = await getUserDataFromReq(req);
  
    try {
         const places =  await Place.find({owner: user.id});
        res.status(statuscode.SUCCESS).json(places);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
            
});

const updatePlaces = asyncHandler(  async (req, res) => {
    const { title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest  } = req.body;
    const {id} = req.params;
    const user = await getUserDataFromReq(req);
    try {
        const placeDoc = await Place.findById(id);
            if (user.id === placeDoc.owner.toString()) {
                 placeDoc.set({
                   title, 
                   address, 
                   photos:addedPhotos, 
                   description,
                   perks,
                   extraInfo, 
                   checkIn, 
                   checkOut, 
                   maxGuest
                });
                await placeDoc.save();
                res.status(statuscode.SUCCESS).json('Place updated successfully');
             }   
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
});

const deletePlace = asyncHandler( async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {id} = user;

    try {
        const placeDoc =  await Place.deleteOne({id})
        res.status(statuscode.SUCCESS).json(placeDoc).statusMessage("Place Deleted successfully");
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
   
})

module.exports = {createPlaces, getPlace, getPlaces, getUserPlaces, updatePlaces, deletePlace}