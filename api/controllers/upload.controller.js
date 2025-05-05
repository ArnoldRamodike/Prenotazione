const asyncHandler = require("express-async-handler");
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {statuscode} = require('../utils/StatusCodes');

const photosMiddleware = multer({dest:'uploads/'});
const uploadDir = path.join('D:', 'dev', 'Skhu Dev', 'Prenotazione', 'api', 'uploads');

const UploadByLink = asyncHandler(async (req, res) => {
    const {link} = req.body;
    console.log("Link :", link);
   
    const newName = 'photo' + Date.now()+'.jpg';
    try {
        await imageDownloader.image({
        url: link,
        dest: path.join(uploadDir, newName),
        });
        res.status(statuscode.CREATED).json(newName);
    } catch (error) {
        res.status(statuscode.INTERNAL_SERVER_ERROR).json(error)
    }
   
})


const UploadPicture = asyncHandler( photosMiddleware.array('photos', 100), 
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

module.exports = {UploadByLink, UploadPicture }