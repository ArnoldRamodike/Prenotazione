const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bycypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const  mongoose  = require('mongoose');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();


// SERVICE
const app = express();

const bycyptSalt = bycypt.genSaltSync(10);
const jwtSecrete = 'thisisjwt'

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.MONGODB_URL);

app.get('/api', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
           const userDoc = await User.create({
            name, 
            email, 
            password : bycypt.hashSync(password, bycyptSalt),
        })
        req.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const userDoc = await User.findOne({email});
        if (userDoc) {
            const passwordOk= bycypt.compareSync(password, userDoc.password);

            if (passwordOk) {
                jwt.sign({
                    email: userDoc.email, 
                    id: userDoc._id, 
                    name: userDoc.name},
                    jwtSecrete, {}, (err, token) =>{
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
               
            }else{
                req.status(422).json('Incorrect Password')
            }
        }else{
        req.json('email does not exist');
        }
    } catch (error) {
        res.status(422).json(error);
    }
})

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

app.listen(4000);