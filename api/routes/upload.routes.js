const express = require("express");
const router = express.Router();

const {UploadByLink, UploadPicture} = require("../controllers/upload.controller");

router.route("/").post(UploadByLink);
router.route("/").post(UploadPicture);