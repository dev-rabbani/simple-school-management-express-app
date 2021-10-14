// internal imports
const fs = require("fs");

const baseUrl = "http://localhost:3000";

const { singleImg, multipleImg } = require("../models/image");

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

const base64SingleImgUpload = async (req, res) => {
  try {
    // data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP
    const image = req.body.image;
    const data = image.split(";base64,");
    const fileExtention = data[0].split("/")[1];
    const base64Data = data[1];

    const fileName = `img-${Date.now()}-${Math.floor(
      Math.random() * 8999 + 1000
    )}.${fileExtention}`;
    const pathName = `${baseUrl}/${fileName}`;

    fs.writeFile(
      `${__dirname}/../images/${fileName}`,
      base64Data,
      { encoding: "base64" },
      function (err, data) {
        if (err) {
          console.log("There was an error");
        } else {
          console.log("File write successfully");
        }
      }
    );

    req.body.image = pathName;
    const img = new singleImg(req.body);
    const imgData = await img.save();

    if (imgData) {
      res.json({
        msg: "img uploaded successfully",
        imgData,
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

const base64MultipleImgUpload = async (req, res) => {
  try {
    const images = req.body.images;
    const fileNames = [];
    const pathNames = [];
    const base64Datas = [];

    images.map((imgItem) => {
      const data = imgItem.split(";base64,");
      const fileExtention = data[0].split("/")[1];
      const base64Data = data[1];

      const fileName = `img-${Date.now()}-${Math.floor(
        Math.random() * 8999 + 1000
      )}.${fileExtention}`;

      const pathName = `${baseUrl}/${fileName}`;

      fileNames.push(fileName);
      pathNames.push(pathName);
      base64Datas.push(base64Data);

      fs.writeFile(
        `${__dirname}/../images/${fileName}`,
        base64Data,
        { encoding: "base64" },
        function (err, data) {
          if (err) {
            console.log("There was an error");
          } else {
            console.log("File write successfully");
          }
        }
      );
    });

    req.body.images = pathNames;
      const imgs = new multipleImg(req.body);
      const imgDatas = await imgs.save();

      if (imgDatas) {
        res.json({
          msg: "imgs uploaded successfully",
          imgDatas,
        });
      }

  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = {
  singleFileUplaoder,
  multipleUploader,
  base64ToImageUpload,
  base64SingleImgUpload,
  base64MultipleImgUpload,
};
