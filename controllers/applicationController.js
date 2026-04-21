const Application = require('../models/Application');
const Job = require('../models/Job');

const submitApplication = async (req, res) => {
  try {
    const { jobId, applicantName, applicantEmail, coverLetter } = req.body;
    const resumePath = req.file ? req.file.path : null;

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job || job.status !== 'active') {
      return res.status(400).json({ message: 'Job is not available for application' });
    }

    const application = await Application.create({ 
      jobId: jobId, 
      applicantName, 
      applicantEmail,
      coverLetter,
      resume: resumePath,
      status: 'new'
    });
    
    res.status(201).json(application);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
};

const getApplications = async (req, res) => {
  try {
    // For job seekers - get their own applications
    const applications = await Application.find({ applicantEmail: req.user.email })
      .populate('jobId', 'title company location type salary')
      .sort({ createdAt: -1 });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

const getCompanyApplications = async (req, res) => {
  try {
    // Get all jobs posted by this company
    const companyJobs = await Job.find({ postedBy: req.user._id }).select('_id');
    const jobIds = companyJobs.map(job => job._id);

    // Get applications for company's jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title company location type salary')
      .sort({ createdAt: -1 });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching company applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

module.exports = { submitApplication, getApplications, getCompanyApplications };