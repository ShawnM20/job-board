const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, getCompanyApplications } = require('../controllers/applicationController');
const { protect, companyOnly } = require('../middleware/auth');

// Public: Anyone can apply
router.post('/', submitApplication);

// Backward compatibility - default route for logged-in users (role-based)
router.get('/', protect, (req, res, next) => {
  if (req.user.role === 'company') {
    return getCompanyApplications(req, res, next);
  } else {
    return getApplications(req, res, next);
  }
});

// Private: Only logged-in users can see their own applications
router.get('/user', protect, getApplications);

// Company-only: Companies can see applications to their jobs
router.get('/company', protect, companyOnly, getCompanyApplications);

module.exports = router;