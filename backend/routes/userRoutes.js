const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Route: GET /users
// Desc:  Get all users from the DB
router.get('/', userController.getAllUsers);

// Route: POST /users
// Desc:  Create a new user
router.post('/', userController.createUser);

// Route: GET /users/profile
// Desc:  Get current user's profile (protected)
router.get('/profile', auth, userController.getProfile);

// Route: PUT /users/profile
// Desc:  Update current user's profile (protected)
router.put('/profile', auth, userController.updateProfile);

module.exports = router;