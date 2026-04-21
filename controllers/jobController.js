const Job = require('../models/Job');

const createJob = async (req, res) => {
  const { title, company, description, location, type, salary, requirements } = req.body;

  try {
    const job = await Job.create({
      title,
      company,
      description,
      location,
      type,
      salary,
      requirements,
      postedBy: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: 'Error creating job' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching company jobs:', error);
    res.status(500).json({ message: 'Error fetching company jobs' });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user owns this job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: 'Error updating job' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user owns this job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(400).json({ message: 'Error deleting job' });
  }
};

module.exports = { createJob, getJobs, getCompanyJobs, updateJob, deleteJob };