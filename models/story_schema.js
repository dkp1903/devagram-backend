const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  expirationDate: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

module.exports = Story = mongoose.model("Story", schema);
