const express = require('express');
const router = express.Router();
const companyWebsiteController = require('../controllers/companyWebsiteController');

// Company Website Routes
router.post('/:companyId', companyWebsiteController.createCompanyWebsite);
router.get('/:companyId', companyWebsiteController.getCompanyWebsites);
router.get('/single/:id', companyWebsiteController.getCompanyWebsiteById);
router.put('/:id', companyWebsiteController.updateCompanyWebsite);
router.delete('/:id', companyWebsiteController.deleteCompanyWebsite);

module.exports = router;
