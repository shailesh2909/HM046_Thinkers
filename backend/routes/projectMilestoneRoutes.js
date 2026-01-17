const express = require('express');
const router = express.Router();
const projectMilestoneController = require('../controllers/projectMilestoneController');

// Project Milestone Routes
router.post('/:projectId', projectMilestoneController.createProjectMilestone);
router.get('/:projectId', projectMilestoneController.getProjectMilestones);
router.get('/single/:id', projectMilestoneController.getProjectMilestoneById);
router.put('/:id', projectMilestoneController.updateProjectMilestone);
router.delete('/:id', projectMilestoneController.deleteProjectMilestone);
router.patch('/:id/status', projectMilestoneController.updateMilestoneStatus);
router.get('/:projectId/status/:status', projectMilestoneController.getMilestonesByStatus);

module.exports = router;
