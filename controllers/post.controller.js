const Post = require("../models/post_schema");

const { validationResult } = require("express-validator");
const showError = require("../config/showError");
const e = require("express");

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

const getAllPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const posts = await Post.find({ user: id })
      .populate("user", "_id")
      .sort("createdAt");

    return res.status(200).json({ posts });
  } catch (error) {
    showError(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "_id");
    if (!post) return res.status(404).json("Post not found");
    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
  }
};

const postDelete = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost.user.id === req.user.id) {
      if (!deletedPost) return res.status(404).json("Post not found");
      return res.status(200).json("Post Deleted!");
    } else return res.status(401).json("Post access denied!");
  } catch (err) {
    console.log(err);
  }
};

const postEdit = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (deletedPost.user.id === req.user.id) {
      if (!post) return res.status(404).json("Post not found");
      if (content) post.content = req.body.content;
    } else return res.status(401).json("Post access denied!");

    return res.status(200).json("Post Updated");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getPost,
  postDelete,
  postEdit,
};
