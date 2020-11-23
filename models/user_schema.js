const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  profile_picture: {
    type: String,
    default: "NULL",
  },
  no_of_followers: {
    type: Number,
    default: 0,
  },
  no_of_following: {
    type: Number,
    default: 0,
  },
  devrole: {
    type: String,
  },
  no_of_posts: {
    type: Number,
    default: 0,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  user_posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
});

module.exports = mongoose.model("User", UserSchema);
