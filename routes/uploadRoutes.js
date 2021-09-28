// external imports
const express = require("express");
const router = express.Router();

// internal imports
const upload = require("../middleware/fileUploader");
const {
  singleFileUplaoder,
  multipleUploader,
} = require("../controller/fileUploader");

// create file upload routes
router.post("/single-upload", upload.single("image"), singleFileUplaoder);
router.post("/multiple-upload", upload.array("images", 5), multipleUploader);

// exports
module.exports = router;
