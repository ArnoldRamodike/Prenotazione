const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bycypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();

//ROUTES IMPORTS
const bookingRoutes = require("./routes/bookings.routes");
const placesRoutes = require("./routes/places.routes");
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require( "./routes/auth.routes");

// SERVICE
const app = express();
const bycyptSalt = bycypt.genSaltSync(10);
const jwtSecrete = process.env.TOKEN_KEY;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGODB_URL);


// ROUTES 
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api', (req, res) => {
    res.json('App up and running ok');
});

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecrete, {}, async(err, user) => {
            if (err) throw err;
            resolve(user);
        });
    }); 
}

app.get('/profile', async (req, res) => {
    const { token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecrete, {}, async(err, user) => {
            if (err) throw err;

            const {name, email, _id} =  await User.findById(user.id);
            res.json({name, email, _id});
        })
    }else{
        res.json(null);
    }
});

app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now()+'.jpg';
   await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), 
    async (req, res) => {
        const uploadedFiles= [];
        for (let i = 0; i < req.files.length; i++) {
            const {path, originalname} = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newpath = path + '.' + ext;
            fs.renameSync(path, newpath);
            uploadedFiles.push(newpath.replace('uploads\\', ''));
        }
    res.json(uploadedFiles);
})

app.post('/places', async (req, res) => {
    const {title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest, price } = req.body;
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
                   checkOut, maxGuest, price
                })
                res.json(placeDoc);
            })
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get('/user-places', async (req, res) => {
    const { token} = req.cookies;
        jwt.verify(token, jwtSecrete, {}, async(err, user) => {
            if (err) throw err;
            const {id} = user;
            const places =  await Place.find({owner: id});
            res.json(places);
        })
});


app.put('/places/:id', async (req, res) => {
    const {id, title, address, addedPhotos,description,perks,extraInfo, checkIn, checkOut, maxGuest, price } = req.body;
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
                   checkIn, checkOut, 
                   maxGuest, price
                });
                await placeDoc.save();
                res.json('ok');
             }   
            })
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/bookings', async (req, res) => {
    const user = await getUserDataFromReq(req);
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
    if (!place, !checkIn, !checkOut, !numberOfGuests, !name, !phone, !price) {
        res.status(422).json({message:'please enter valid fields'})
    }
    try {
        const bookingDoc = await Booking.create({
            place, user: user.id,
            checkIn, checkOut, 
            numberOfGuests, name, 
            phone, price
            })

            res.json(bookingDoc);
    } catch (error) {
        res.status(422).json(error);
    }
});


// SERVER API
const PORT = process.env.PORT || 4000;
app.listen(PORT);