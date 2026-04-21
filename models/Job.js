const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  location: {
    type: String,
    required: false 
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  salary: {
    type: String,
    required: false
  },
  requirements: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'closed'],
    default: 'active'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);