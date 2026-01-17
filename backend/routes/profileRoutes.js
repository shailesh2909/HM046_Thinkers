const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile Routes
router.post('/:userId', profileController.createOrUpdateProfile);
router.get('/:userId', profileController.getProfile);
router.put('/:userId', profileController.createOrUpdateProfile);
router.delete('/:userId', profileController.deleteProfile);

module.exports = router;
