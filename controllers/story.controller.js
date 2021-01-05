const Story = require("../models/story_schema");
const cloudinary = require("../utils/cloudinary");

const showError = require("../utils/showError");
const { validationResult } = require("express-validator");

const uploadStory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { content } = req.body;
  try {
    const imageResult = await cloudinary.uploader.upload(req.file.path);
    const story = new Story({
      user: req.user.id,
      imageUrl: imageResult.url,
    });
    if (content) story.content = content;
    await story.save();

    return res.status(200).json({
      story,
    });
  } catch (error) {
    showError(error, res);
  }
};

const getStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({
        error: "Story not found",
      });
    }
    return res.status(200).json({
      story,
    });
  } catch (error) {
    showError(error, res);
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findByIdAndDelete(id);

    if (!story) {
      return res.status(404).json({
        error: "Story not found",
      });
    }

    return res.status(200).json({
      message: "Story deleted",
    });
  } catch (error) {
    showError(error, res);
  }
};

const getAllStory = async (req, res) => {
  const { id } = req.user;
  try {
    const stories = await Story.find({ user: id });

    return res.status(200).json({
      stories,
    });
  } catch (error) {
    showError(error);
  }
};

const getOtherUserStory = async (req, res) => {
  const { userId, storyId } = req.params;
  try {
    const story = await Story.findOne({ user: userId, _id: storyId });
    if (!story) {
      return res.status(404).json({
        error: "Story not found",
      });
    }

    return res.status(200).json({
      story,
    });
  } catch (error) {
    showError(error, res);
  }
};

const getAllStoryOfUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const stories = await Story.find({ user: userId });

    return res.status(200).json({
      stories,
    });
  } catch (error) {
    showError(error, res);
  }
};

module.exports = {
  uploadStory,
  getStory,
  deleteStory,
  getAllStory,
  getOtherUserStory,
  getAllStoryOfUser,
};
