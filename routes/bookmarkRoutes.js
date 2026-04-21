const express = require('express');
const router = express.Router();
const { protect, userOnly } = require('../middleware/auth');
const {
  getBookmarks,
  bookmarkJob,
  removeBookmark,
  updateBookmarkNotes,
  checkBookmarkStatus
} = require('../controllers/bookmarkController');

// All bookmark routes require authentication and user role
router.use(protect);
router.use(userOnly);

// Get user's bookmarked jobs
router.get('/', getBookmarks);

// Bookmark a job
router.post('/', bookmarkJob);

// Remove bookmark
router.delete('/:jobId', removeBookmark);

// Update bookmark notes
router.put('/:jobId/notes', updateBookmarkNotes);

// Check if job is bookmarked
router.get('/:jobId/check', checkBookmarkStatus);

module.exports = router;
