const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

// 1. Create Company
// Ensure 'createCompany' exists in the log from Step 1
router.post('/', companyController.createCompany);

// 2. Get All Companies
router.get('/', companyController.getAllCompanies);

// 3. Get By User
router.get('/user/:authUserId', companyController.getCompaniesByAuthUser);

// 4. Update Profile - Protected route
router.put('/profile/update', auth, companyController.updateCompanyProfile);

// 5. Get Single (Must be last)
router.get('/:id', companyController.getCompanyById);

// 6. Update
router.put('/:id', companyController.updateCompany);

// 7. Delete
router.delete('/:id', companyController.deleteCompany);

module.exports = router;