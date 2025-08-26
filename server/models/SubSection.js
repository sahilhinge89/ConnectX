const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");

const subsectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeDuration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("subsection", subsectionSchema);
