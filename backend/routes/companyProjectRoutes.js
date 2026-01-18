const express = require('express');
const router = express.Router();
// Ensure this path is correct relative to where this file is saved
const companyProjectController = require('../controllers/companyProjectController');

// Company Project Routes

// 1. Create a Project
// Matches POST /api/company-projects/:companyId
router.post('/:companyId', companyProjectController.createCompanyProject);

// 2. Get All Projects for a Company
// Matches GET /api/company-projects/:companyId
router.get('/:companyId', companyProjectController.getCompanyProjects);

// 3. Get Projects by Status
// Matches GET /api/company-projects/:companyId/status/:status
// Note: Placed before /:id generic routes to avoid conflict if IDs look like strings
router.get('/:companyId/status/:status', companyProjectController.getProjectsByStatus);

// 4. Get Single Project by ID
// Matches GET /api/company-projects/single/:id
router.get('/single/:id', companyProjectController.getCompanyProjectById);

// 5. Update Project
// Matches PUT /api/company-projects/:id
router.put('/:id', companyProjectController.updateCompanyProject);

// 6. Delete Project
// Matches DELETE /api/company-projects/:id
router.delete('/:id', companyProjectController.deleteCompanyProject);

// 7. Get All Projects from All Companies
// Matches GET /api/company-projects/all
router.get('/all', companyProjectController.getAllProjects);

module.exports = router;