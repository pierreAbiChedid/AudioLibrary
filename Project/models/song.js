const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  albumId: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
});

module.exports = mongoose.model("Song", songSchema);
