const mongoose = require("mongoose");

const HackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hackathon_poster: {
    type: String,
    required: true,
  },
  hackathon_description: {
    type: String,
    required: true,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      contact_details: {
        type: String,
      },
      profile_link_github: {
        type: String,
      },
    },
  ],
  organizers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  important_links: {
    type: String,
  },
});

module.exports = mongoose.model("Hackathons", HackathonSchema);
