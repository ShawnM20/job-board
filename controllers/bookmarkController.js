const JobBookmark = require('../models/JobBookmark');
const Job = require('../models/Job');

// Get user's bookmarked jobs
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await JobBookmark.find({ user: req.user._id })
      .populate('job')
      .sort({ savedAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ message: 'Error fetching bookmarks' });
  }
};

// Bookmark a job
const bookmarkJob = async (req, res) => {
  try {
    const { jobId, notes } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already bookmarked
    const existingBookmark = await JobBookmark.findOne({
      user: req.user._id,
      job: jobId
    });

    if (existingBookmark) {
      return res.status(400).json({ message: 'Job already bookmarked' });
    }

    const bookmark = await JobBookmark.create({
      user: req.user._id,
      job: jobId,
      notes: notes || ''
    });

    const populatedBookmark = await JobBookmark.findById(bookmark._id)
      .populate('job');

    res.status(201).json(populatedBookmark);
  } catch (error) {
    console.error('Error bookmarking job:', error);
    res.status(500).json({ message: 'Error bookmarking job' });
  }
};

// Remove bookmark
const removeBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;

    const bookmark = await JobBookmark.findOneAndDelete({
      user: req.user._id,
      job: jobId
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    res.status(500).json({ message: 'Error removing bookmark' });
  }
};

// Update bookmark notes
const updateBookmarkNotes = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { notes } = req.body;

    const bookmark = await JobBookmark.findOneAndUpdate(
      { user: req.user._id, job: jobId },
      { notes },
      { new: true }
    ).populate('job');

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (error) {
    console.error('Error updating bookmark notes:', error);
    res.status(500).json({ message: 'Error updating bookmark notes' });
  }
};

// Check if job is bookmarked
const checkBookmarkStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const bookmark = await JobBookmark.findOne({
      user: req.user._id,
      job: jobId
    });

    res.json({ isBookmarked: !!bookmark, bookmark });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    res.status(500).json({ message: 'Error checking bookmark status' });
  }
};

module.exports = {
  getBookmarks,
  bookmarkJob,
  removeBookmark,
  updateBookmarkNotes,
  checkBookmarkStatus
};
