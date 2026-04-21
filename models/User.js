const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'company'], 
    default: 'user',
    required: true 
  },
  // Company-specific fields
  companyName: { type: String },
  contactName: { type: String },
  industry: { type: String },
  phone: { type: String },
  website: { type: String },
  isVerified: { type: Boolean, default: false },
  // Profile fields for job seekers
  profilePicture: { type: String },
  bio: { type: String },
  location: { type: String },
  experience: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String }
  }],
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false }
  }],
  skills: [{ type: String }],
  resume: { type: String },
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String }
}, { timestamps: true });

// This encrypts the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);