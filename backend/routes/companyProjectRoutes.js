const express = require('express');
const router = express.Router();
// Ensure this path is correct relative to where this file is saved
const companyProjectController = require('../controllers/companyProjectController');

// Company Project Routes

// IMPORTANT: Specific routes must come BEFORE parameter routes

// 1. Get All Projects from All Companies (for freelancers)
// Matches GET /api/company-project/all
router.get('/all', companyProjectController.getAllProjects);

// 2. Get All Projects by Auth User ID
// Matches GET /api/company-project/user/:authUserId
router.get('/user/:authUserId', companyProjectController.getCompanyProjectsByAuthUser);

// 3. Get Single Project by ID
// Matches GET /api/company-project/single/:id
router.get('/single/:id', companyProjectController.getCompanyProjectById);

// 4. Get Projects by Status
// Matches GET /api/company-project/:companyId/status/:status
router.get('/:companyId/status/:status', companyProjectController.getProjectsByStatus);

// 5. Create a Project
// Matches POST /api/company-project/:companyId
router.post('/:companyId', companyProjectController.createCompanyProject);

// 6. Get All Projects for a Company
// Matches GET /api/company-project/:companyId
router.get('/:companyId', companyProjectController.getCompanyProjects);

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