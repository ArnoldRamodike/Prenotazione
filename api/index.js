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
    res.status(200).json('App up and running ok');
});

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

// SERVER API
const PORT = process.env.PORT || 4000;
app.listen(PORT);