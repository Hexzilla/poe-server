const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  { timestamps: true }
);

mongoose.model('Game', GameSchema);
