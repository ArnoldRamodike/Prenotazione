const express = require("express");
const router = express.Router();
const multer = require('multer');
const {UploadByLink, UploadPicture} = require("../controllers/upload.controller");

// Configure multer middleware
const photosMiddleware = multer({ dest: 'uploads/' });
// router.route("/").post(UploadPicture);
router.route("/").post(photosMiddleware.array('photos', 100), UploadPicture);
router.route("/upload-by-link").post(UploadByLink);

module.exports = router;