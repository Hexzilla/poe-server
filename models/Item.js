const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    options: {
    }
  },
  { timestamps: true }
);

mongoose.model('Item', ItemSchema);
