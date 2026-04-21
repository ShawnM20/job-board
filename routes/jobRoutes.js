const express = require('express');
const router = express.Router();
const { createJob, getJobs, getCompanyJobs, deleteJob, updateJob } = require('../controllers/jobController');
const { protect, companyOnly } = require('../middleware/auth');

// Public route: Anyone can see jobs
router.get('/', getJobs);
router.get('/:id', getJobs); // For single job details

// Company-only routes
router.post('/', protect, companyOnly, createJob);
router.get('/company/my-jobs', protect, companyOnly, getCompanyJobs);
router.put('/:id', protect, companyOnly, updateJob);
router.delete('/:id', protect, companyOnly, deleteJob);

module.exports = router;