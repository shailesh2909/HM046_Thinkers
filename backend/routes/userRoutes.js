const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route: GET /users
// Desc:  Get all users from the DB
router.get('/', userController.getAllUsers);

// Route: POST /users
// Desc:  Create a new user
router.post('/', userController.createUser);

module.exports = router;