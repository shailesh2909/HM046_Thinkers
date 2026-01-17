const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

// Website Routes
router.post('/:userId', websiteController.createWebsite);
router.get('/:userId', websiteController.getWebsites);
router.get('/single/:id', websiteController.getWebsiteById);
router.put('/:id', websiteController.updateWebsite);
router.delete('/:id', websiteController.deleteWebsite);

module.exports = router;
