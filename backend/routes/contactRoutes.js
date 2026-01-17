const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Contact Info Routes
router.post('/:userId', contactController.createContactInfo);
router.get('/:userId', contactController.getContactInfos);
router.get('/single/:id', contactController.getContactInfoById);
router.put('/:id', contactController.updateContactInfo);
router.delete('/:id', contactController.deleteContactInfo);

module.exports = router;
