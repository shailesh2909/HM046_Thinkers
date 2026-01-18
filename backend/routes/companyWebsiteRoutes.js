const express = require('express');
const router = express.Router();
const companyWebsiteController = require('../controllers/companyWebsiteController');
const auth = require('../middleware/auth');

// Company Website Routes
router.post('/', auth, companyWebsiteController.createCompanyWebsite);
router.get('/', auth, companyWebsiteController.getCompanyWebsites);
router.get('/single/:id', auth, companyWebsiteController.getCompanyWebsiteById);
router.put('/:id', auth, companyWebsiteController.updateCompanyWebsite);
router.delete('/:id', auth, companyWebsiteController.deleteCompanyWebsite);

module.exports = router;
