const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, userOnly } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  addExperience,
  addEducation
} = require('../controllers/profileController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// All profile routes require authentication and user role
router.use(protect);
router.use(userOnly);

// Get user profile
router.get('/', getProfile);

// Update user profile
router.put('/', updateProfile);

// Upload profile picture
router.post('/picture', upload.single('profilePicture'), uploadProfilePicture);

// Add experience
router.post('/experience', addExperience);

// Add education
router.post('/education', addEducation);

module.exports = router;
