const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
  },
  singer: {
    type: String,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  albumId: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  __v: { type: Number, select: false },
});

songSchema.index({name: 1 });

module.exports = mongoose.model("Song", songSchema);
