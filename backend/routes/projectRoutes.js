const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Project Routes
router.post('/:userId', projectController.createProject);
router.get('/:userId', projectController.getProjects);
router.get('/single/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
