const express = require('express');
const router = express.Router();
const companyProjectController = require('../controllers/companyProjectController');

// Company Project Routes
router.post('/:companyId', companyProjectController.createCompanyProject);
router.get('/:companyId', companyProjectController.getCompanyProjects);
router.get('/single/:id', companyProjectController.getCompanyProjectById);
router.put('/:id', companyProjectController.updateCompanyProject);
router.delete('/:id', companyProjectController.deleteCompanyProject);
router.get('/:companyId/status/:status', companyProjectController.getProjectsByStatus);

module.exports = router;
