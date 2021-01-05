const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_start: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
    default: 0,
  },
  companyOrOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_applicants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      contact_details: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Job", JobSchema);
