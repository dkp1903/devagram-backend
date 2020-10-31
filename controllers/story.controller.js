const Story = require("../models/story_schema");
const showError = require("../config/showError");

const uploadStory = async (req, res) => {
  const { imageUrl, content } = req.body;
  try {
    const story = new Story({
      imageUrl,
    });
    if (content) story.content = content;
    await story.save();

    return res.status(200).json({
      story,
    });
  } catch (error) {
    showError(error, message);
  }
};

const getStory = (req, res) => {};

module.exports = {
  uploadStory,
  getStory,
};
