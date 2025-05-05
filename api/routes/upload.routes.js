const express = require("express");
const router = express.Router();

const {UploadByLink, UploadPicture} = require("../controllers/upload.controller");

router.route("/").post(UploadPicture);
router.route("/upload-by-link").post(UploadByLink);

module.exports = router;