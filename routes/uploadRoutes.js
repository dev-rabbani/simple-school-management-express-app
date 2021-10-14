// external imports
const express = require("express");
const router = express.Router();

// internal imports
const upload = require("../middleware/fileUploader");
const {
  singleFileUplaoder,
  multipleUploader,
  base64ToImageUpload,
  base64SingleImgUpload,
  base64MultipleImgUpload
} = require("../controller/fileUploader");

// create file upload routes
router.post("/single-upload", upload.single("image"), singleFileUplaoder);
router.post("/multiple-upload", upload.array("images", 5), multipleUploader);
router.post("/base-64-to-image", base64ToImageUpload);
router.post("/base-64-img-single", base64SingleImgUpload);
router.post("/base-64-img-multiple", base64MultipleImgUpload);

// exports
module.exports = router;
