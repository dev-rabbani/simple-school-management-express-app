
const singleFileUplaoder = async(req, res) => {
  try {
    if (req.file) {
      res.json({
        msg: "File uploaded successfully",
        fileDeatils:req.file,
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


module.exports = {
    singleFileUplaoder,
    multipleUploader
}