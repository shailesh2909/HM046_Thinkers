const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// Experience Routes
router.post('/:userId', experienceController.createExperience);
router.get('/:userId', experienceController.getExperiences);
router.get('/single/:id', experienceController.getExperienceById);
router.put('/:id', experienceController.updateExperience);
router.delete('/:id', experienceController.deleteExperience);

module.exports = router;
