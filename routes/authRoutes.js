const express = require('express');
const router = express.Router();
const { registerUser, loginUser, registerCompany, loginCompany } = require('../controllers/authController');

// Job seeker routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Company routes
router.post('/register-company', registerCompany);
router.post('/login-company', loginCompany);

module.exports = router;