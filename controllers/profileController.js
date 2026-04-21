const User = require('../models/User');
const JobBookmark = require('../models/JobBookmark');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('experience')
      .populate('education');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { 
      bio, 
      location, 
      experience, 
      education, 
      skills, 
      linkedin, 
      github, 
      portfolio 
    } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (experience !== undefined) user.experience = experience;
    if (education !== undefined) user.education = education;
    if (skills !== undefined) user.skills = skills;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      location: user.location,
      experience: user.experience,
      education: user.education,
      skills: user.skills,
      linkedin: user.linkedin,
      github: user.github,
      portfolio: user.portfolio,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Upload profile picture
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ profilePicture: user.profilePicture });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
};

// Add experience
const addExperience = async (req, res) => {
  try {
    const { title, company, startDate, endDate, current, description } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.experience.push({
      title,
      company,
      startDate,
      endDate,
      current,
      description
    });

    await user.save();

    res.json(user.experience);
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Error adding experience' });
  }
};

// Add education
const addEducation = async (req, res) => {
  try {
    const { degree, institution, startDate, endDate, current } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.education.push({
      degree,
      institution,
      startDate,
      endDate,
      current
    });

    await user.save();

    res.json(user.education);
  } catch (error) {
    console.error('Error adding education:', error);
    res.status(500).json({ message: 'Error adding education' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  addExperience,
  addEducation
};
