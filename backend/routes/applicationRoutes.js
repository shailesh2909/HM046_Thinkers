const router = require('express').Router();
const appController = require('../controllers/applicationController');
const auth = require('../middleware/auth');

router.post('/apply', auth, appController.applyToJob);
router.get('/view-all', auth, appController.getCompanyApplications);
router.get('/download/:resumeId', auth, appController.downloadResume);

module.exports = router;