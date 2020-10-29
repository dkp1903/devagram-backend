const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  img: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  no_of_likes: {
    type: BigInt,
    required: true,
    default: 0,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  post_date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("Post", PostSchema);
