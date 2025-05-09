const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bycypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const dotevn = require("dotenv").config();
const {statuscode} = require('../utils/StatusCodes');
//const errorHandler = require("../middleware/errorHandler")

mongoose.connect(process.env.MONGODB_URL);
const bycyptSalt = bycypt.genSaltSync(10);

const Register = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name, !email, !password) {
            res.status(statuscode.VALIDATION_ERROR).json({message: 'All fields are required!'});
        }
           const userDoc = await User.create({
            name: name, 
            email: email, 
            password: bycypt.hashSync(password, bycyptSalt)
        });
        res.json(userDoc);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
})

const Login  = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            res.status(statuscode.VALIDATION_ERROR).json({message: 'Email and Password are required.'});
        }
        
        const userDoc = await User.findOne({email});

        if (userDoc) {
            const passwordOk= bycypt.compareSync(password, userDoc.password);
            if (passwordOk) {
                jwt.sign({
                    email: userDoc.email, 
                    id: userDoc._id, 
                    name: userDoc.name},
                    process.env.TOKEN_KEY, {}, (err, token) =>{
                    if (err) throw err;
                    
                    res.cookie('token', token).json(userDoc).status(statuscode.SUCCESS);
                });
            
             return;
            }else{
                res.status(statuscode.VALIDATION_ERROR).json('Incorrect Password or Email')
            }
        }else{
        res.status(statuscode.NOT_FOUND).json({message:'email does not exist'});
        }
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error);
    }
})

 const Profile = asyncHandler( async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, {}, async(err, user) => {
            if (err) throw err;
            const {name, email, _id} =  await User.findById(user.id);
            res.status(statuscode.SUCCESS).json({name, email, _id});
        })
    }else{
        res.status(statuscode.NOT_FOUND).json("User not found");
    }
});

 const Logout = asyncHandler( async (req, res) => {
    res.cookie('token', '').status(statuscode.SUCCESS).json(true);
})

module.exports = {Register, Login, Profile, Logout};