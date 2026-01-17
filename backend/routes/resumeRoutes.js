const router = require('express').Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Your JWT protection middleware

router.post('/upload', auth, upload.single('resume'), resumeController.uploadResume);
router.get('/', auth, resumeController.getMyResumes);
router.delete('/:id', auth, resumeController.deleteResume);

module.exports = router;