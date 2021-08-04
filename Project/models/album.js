const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  showNbTracks: {
    type: Boolean,
  },

  createdDate: {
    type: Date,
  },
  updatedDate: {
    type: Date,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Album", albumSchema);
