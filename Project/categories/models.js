const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
  __v: { type: Number, select: false },
  
});

module.exports = mongoose.model("Category", categorySchema);
