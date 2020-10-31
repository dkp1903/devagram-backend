const Post = require("../models/post_schema");

const { validationResult } = require("express-validator");
const showError = require("../config/showError");

const addPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { content, img } = req.body;
  const { user } = req;

  try {
    const post = new Post({
      content,
      img, //this would be the url for image stored in the cloud
      user: user.id,
    });

    user.no_of_posts = +user.no_of_posts + 1;
    user.markModified("no_of_posts");
    await user.save();

    const result = await post.save();
    res
      .status(200)
      .json({ post: result, user, message: "Post uploaded successfully !" });
  } catch (error) {
    showError(error, res);
  }
};

module.exports = {
  addPost,
};
