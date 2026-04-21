const mongoose = require('mongoose');

const jobBookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Ensure a user can only bookmark a job once
jobBookmarkSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('JobBookmark', jobBookmarkSchema);
