const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Model's pre-save hook handles hashing
    user = await User.create({ name, email, password, role: 'user' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const registerCompany = async (req, res) => {
  const { 
    companyName, 
    contactName, 
    email, 
    password, 
    industry, 
    phone, 
    website 
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Company with this email already exists' });
    }

    // Model's pre-save hook handles hashing
    user = await User.create({ 
      name: contactName,
      email, 
      password, 
      role: 'company',
      companyName,
      contactName,
      industry,
      phone,
      website
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      contactName: user.contactName,
      industry: user.industry,
      phone: user.phone,
      website: user.website,
      token: token,
    });
  } catch (error) {
    console.error('Company Registration Error:', error);
    res.status(500).json({ message: 'Server error during company registration' });
  }
};

const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'company' });
    if (!user) {
      return res.status(401).json({ message: 'Invalid company credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid company credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      contactName: user.contactName,
      industry: user.industry,
      phone: user.phone,
      website: user.website,
      token: token,
    });
  } catch (error) {
    console.error('Company Login Error:', error);
    res.status(500).json({ message: 'Server error during company login' });
  }
};

module.exports = { registerUser, loginUser, registerCompany, loginCompany };