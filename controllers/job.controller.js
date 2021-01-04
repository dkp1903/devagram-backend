const Job = require("../models/job_schema");
const showError = require("../utils/showError");

const getJobs = async (_, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.log(error.message);
    showError(error, res);
  }
};

const createJob = async (req, res) => {
  const {
    job_title,
    job_type,
    job_description,
    job_start,
    location,
    salary,
  } = req.body;
  if (
    !job_title ||
    !job_type ||
    !job_description ||
    !job_start ||
    !location ||
    !salary
  ) {
    return res.status(422).json({ error: "Please enter all details." });
  }
  try {
    const savedJob = await Job.findOne({
      companyOrOrganization: req.user.id,
      job_title,
      job_type,
      location,
    });
    if (savedJob) {
      return res
        .status(422)
        .json({ error: "Job with same credentials already exists." });
    }
    const newJob = new Job({
      job_title,
      job_type,
      job_description,
      job_start,
      location,
      salary,
      companyOrOrganization: req.user.id,
    });
    try {
      await newJob.save();
      res.json({ job: newJob, message: "Job created successfully." });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const findJob = await Job.findById(id);
    if (!findJob) return res.status(422).json({ error: "Job doesn't exist." });
    const originalUser = findJob.companyOrOrganization;
    if (toString(req.user._id) === toString(originalUser)) {
      try {
        const delJob = await Job.findByIdAndDelete(req.params.id);
        if (!delJob)
          return res.status(422).json({ error: "Job doesn't exist." });
        return res.json({ message: "Job deleted successfully." });
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(401).json({ error: "Job access denied." });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const foundJob = await Job.findById(id);
    if (!foundJob) return res.status(422).json({ error: "Job doesn't exist." });
    if (toString(foundJob.companyOrOrganization) != toString(req.user._id)) {
      return res.status(401).json({ error: "Job access denied" });
    }
    const {
      job_title,
      job_type,
      job_description,
      job_start,
      location,
      salary,
    } = req.body;
    if (
      !job_title ||
      !job_type ||
      !job_description ||
      !job_start ||
      !location ||
      !salary
    ) {
      return res.status(422).json({ error: "Please enter all details." });
    }
    try {
      const job = await Job.findByIdAndUpdate(id, {
        job_title,
        job_start,
        job_type,
        job_description,
        location,
        salary,
        companyOrOrganization: req.user._id,
      });
      return res.json({
        job: {
          ...job._doc,
          job_title,
          job_start,
          job_type,
          job_description,
          location,
          salary,
          companyOrOrganization: req.user._id,
        },
        message: "Job updated successfully.",
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getJobs,
  createJob,
  deleteJob,
  updateJob,
};
