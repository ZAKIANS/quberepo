const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    unique: [true, "Choose another category this is already exits"],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subCategory: [String],
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
