const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, "Choose another title this is already exits"],
  },
  image:String,
  active:Boolean,
});

const Slider = mongoose.model("Slider", sliderSchema);
module.exports = Slider;
