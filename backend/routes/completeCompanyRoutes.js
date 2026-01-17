const express = require('express');
const router = express.Router();
const completeCompanyController = require('../controllers/completeCompanyController');

// Complete Company Routes
router.get('/:companyId/complete', completeCompanyController.getCompleteCompanyProfile);
router.get('/:companyId/stats', completeCompanyController.getCompanyStats);
router.get('/project/:projectId/milestones', completeCompanyController.getProjectWithMilestones);
router.delete('/:companyId/complete', completeCompanyController.deleteCompleteCompanyProfile);

module.exports = router;
