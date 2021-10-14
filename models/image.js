const mongoose = require("mongoose");
const { Schema } = mongoose;

const singleImageSchema = new Schema({
  image: String,
  images: [String],
});
const multipleImageSchema = new Schema({
  images: [String],
});

const singleImg = mongoose.model("SingleImg", singleImageSchema);
const multipleImg = mongoose.model("MultipleImg", multipleImageSchema);

module.exports = {
    singleImg,
    multipleImg
};
