const express = require('express');
const router = express.Router();
const applicantMatchingController = require('../controllers/applicantMatchingController');

// Applicant Matching Routes
router.post('/find-top-applicants', applicantMatchingController.findTopApplicants);
router.post('/project/:projectId/find-applicants', applicantMatchingController.findApplicantsForProject);
router.post('/rank-applicants', applicantMatchingController.rankApplicants);

module.exports = router;
