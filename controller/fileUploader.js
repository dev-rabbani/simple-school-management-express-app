// internal imports
const fs = require("fs");

// single file uploader
const singleFileUplaoder = async (req, res) => {
  try {
    if (req.file) {
      res.json({
        msg: "File uploaded successfully",
        fileDeatils: req.file,
      });
    } else {
      res.json({
        msg: "No file added",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// multiple file uploader
const multipleUploader = (req, res) => {
  try {
    if (req.files) {
      res.json({
        msg: "File uploaded successfully",
        fileDeatils: req.files,
      });
    } else {
      res.json({
        msg: "No file added",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

// base64toimage

const base64ToImageUpload = async (req, res) => {
  try {
    const path =
      "./images/" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 8999 + 1000) +
      ".png";

    const imgData = req.body.base64Image;
    const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(path, base64Data, { encoding: "base64" });

    return res.json({
      msg: "Base64 to image upload successfully",
      path,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

module.exports = {
  singleFileUplaoder,
  multipleUploader,
  base64ToImageUpload,
};
