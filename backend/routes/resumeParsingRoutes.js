const express = require('express');
const router = express.Router();
const resumeParsingController = require('../controllers/resumeParsingController');

// Test API connection
router.get('/test-connection', resumeParsingController.testApiConnection);

// Parse resume from URL
router.post('/parse-url', resumeParsingController.parseResumeFromUrl);

// Parse resume from file upload (requires multer middleware)
// router.post('/parse-file', upload.single('resume'), resumeParsingController.parseResumeFromFile);

module.exports = router;
