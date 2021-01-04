const hack = require("../models/hackathon_schema");
const showError = require("../utils/showError");

const getHackathons = async (req, res) => {
  try {
    const hackathons = await hack.find();
    res.status(200).json({
      hackathons,
    });
  } catch (error) {
    console.log(error.message);
    showError(error, res);
  }
};

const createHackathon = async (req, res) => {
  const {
    title,
    hackathon_poster,
    hackathon_description,
    start_date,
    end_date,
  } = req.body;
  if (
    !title ||
    !hackathon_poster ||
    !hackathon_description ||
    !start_date ||
    !end_date
  ) {
    return res.status(422).json({ error: "Please enter all details." });
  }
  const currDatetime = new Date();
  if (currDatetime >= start_date) {
    return res.status(422).json({
      error: "Start date and time can't be before current date and time.",
    });
  }
  if (start_date >= end_date) {
    return res.status(422).json({
      error: "Start date and time can't be before end date and time.",
    });
  }
  try {
    const savedHackathon = await hack.findOne({
      organizers: req.user.id,
      start_date,
      end_date,
      title,
    });
    if (savedHackathon) {
      return res
        .status(422)
        .json({ error: "Hackathon with same credentials already exists." });
    }
    const newHackathon = new hack({
      title,
      hackathon_poster,
      hackathon_description,
      start_date,
      end_date,
      organizers: req.user.id,
    });
    await newHackathon.save();
    res.json({
      hackathon: newHackathon,
      message: "Hackathon created successfully.",
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteHackathons = async (req, res) => {
  const { id } = req.params;
  try {
    const findHackathon = await hack.findById(id);
    if (!findHackathon)
      return res.status(422).json({ error: "Hackathon doesn't exist." });
    const originalUser = findHackathon.organizers;
    if (toString(req.user._id) === toString(originalUser)) {
      try {
        const delHackathon = await hack.findByIdAndDelete(req.params.id);
        if (!delHackathon)
          return res.status(422).json({ error: "Hackathon doesn't exist." });
        return res.json({ message: "Hackathon deleted successfully." });
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(401).json({ error: "Hackathon access denied." });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateHackathons = async (req, res) => {
  const { id } = req.params;
  try {
    const foundHackathon = await hack.findById(id);
    if (!foundHackathon)
      return res.status(422).json({ error: "Hackathon doesn't exist." });
    if (toString(foundHackathon.organizers) != toString(req.user._id)) {
      return res.status(401).json({ error: "Hackathon access denied" });
    }
    const {
      title,
      hackathon_poster,
      hackathon_description,
      start_date,
      end_date,
    } = req.body;
    if (
      !title ||
      !hackathon_poster ||
      !hackathon_description ||
      !start_date ||
      !end_date
    ) {
      return res.status(422).json({ error: "Please enter all details." });
    }
    const currDatetime = new Date();
    if (currDatetime >= start_date) {
      return res.status(422).json({
        error: "Start date and time can't be before current date and time.",
      });
    }
    if (start_date >= end_date) {
      return res.status(422).json({
        error: "Start date and time can't be before end date and time.",
      });
    }
    try {
      const newHackathon = await hack.findByIdAndUpdate(id, {
        title,
        hackathon_poster,
        hackathon_description,
        start_date,
        end_date,
        organizers: req.user._id,
      });
      return res.json({
        hackathon: {
          ...newHackathon._doc,
          title,
          hackathon_poster,
          hackathon_description,
          start_date,
          end_date,
          organizers: req.user._id,
        },
        message: "Hackathon details updated successfully.",
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHackathons,
  createHackathon,
  deleteHackathons,
  updateHackathons,
};
