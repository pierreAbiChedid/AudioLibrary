const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  registrationDate: {
    type: Date,
  },

  status: {
    type: String,
  },

  numOfAttempts: {
    type: Number,
  },

  __v: { type: Number, select: false },
});

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
