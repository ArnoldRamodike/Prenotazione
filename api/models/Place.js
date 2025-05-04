const mongoose =  require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    address: {
        type: String, 
        required: true,
    },
    photos: [String],
    description: {
        type: String, 
        required: true,
    },
    perks: [String],
    extraInfo:  String,
    checkIn: Number,
    checkOut: Number,
    maxGuest: Number,
    price: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;