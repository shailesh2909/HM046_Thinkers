const express = require('express');
const router = express.Router();
const completeProfileController = require('../controllers/completeProfileController');

// Complete Profile Routes
router.get('/:userId/complete', completeProfileController.getCompleteProfile);
router.get('/:userId/stats', completeProfileController.getProfileStats);
router.delete('/:userId/complete', completeProfileController.deleteCompleteProfile);

module.exports = router;
