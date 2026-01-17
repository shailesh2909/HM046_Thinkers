const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

// Education Routes
router.post('/:userId', educationController.createEducation);
router.get('/:userId', educationController.getEducations);
router.get('/single/:id', educationController.getEducationById);
router.put('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;
