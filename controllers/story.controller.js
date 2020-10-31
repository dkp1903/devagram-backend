const Story = require("../models/story_schema");

const showError = require("../config/showError");
const { validationResult } = require("express-validator");

const uploadStory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { imageUrl, content } = req.body;
  try {
    const story = new Story({
      user: req.user.id,
      imageUrl,
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

module.exports = {
  uploadStory,
  getStory,
  deleteStory,
};
