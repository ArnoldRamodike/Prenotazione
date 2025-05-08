const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

//ROUTES IMPORTS
const bookingRoutes = require("./routes/bookings.routes");
const placesRoutes = require("./routes/places.routes");
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require( "./routes/auth.routes");

// SERVICE
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGODB_URL);

// ROUTES 
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api', (req, res) => {
    res.status(200).json('App up and running ok');
});


// SERVER API
const PORT = process.env.PORT || 4000;
app.listen(PORT);