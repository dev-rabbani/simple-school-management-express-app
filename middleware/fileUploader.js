const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniquePrefix =
      Date.now() + "-" + Math.round(Math.random() * 8999 + 1000);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
