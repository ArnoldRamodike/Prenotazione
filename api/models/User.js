const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String, 
        unique: true,
        required: true,
    },
    password:{ 
        type : String,
        required: true,
        validate: pass=> {
            if(!pass?.length || pass.length < 5 ){
                new Error('Password must be at lest 5 characters');
            }
        },
    },
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;