const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantName: {
    type: String,
    required: [true, 'Please add your name']
  },
  applicantEmail: {
    type: String,
    required: [true, 'Please add your email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);