const express = require('express');
const router = express.Router();
const oaController = require('../controllers/oaController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
// const oaController = require('../controllers/oaController');
// If 'getQuestions' is missing from this list, that is your culprit!
/**
 * @route   POST /api/oa/create-assessment
 * @desc    Company creates a new OA (Apti, Coding, etc.)
 * @access  Private (Company only)
 */
router.post(
    '/create-assessment', 
    auth, 
    authorize('company'), 
    oaController.createAssessment
);

/**
 * @route   GET /api/oa/questions/:assessmentId
 * @desc    Get all questions for a specific test
 * @access  Private (Freelancer/Company)
 */
router.get(
    '/questions/:assessmentId', 
    auth, 
    oaController.getQuestions
);

/**
 * @route   POST /api/oa/submit
 * @desc    Submit code to Judge0, evaluate against test cases, and save score
 * @access  Private (Freelancer)
 */
router.post(
    '/submit', 
    auth, 
    authorize('freelancer'), 
    oaController.submitCode
);

/**
 * @route   GET /api/oa/leaderboard/:assessmentId
 * @desc    Get ranked results for a specific assessment
 * @access  Private (Company)
 */
router.get(
    '/leaderboard/:assessmentId', 
    auth, 
    authorize('company'), 
    oaController.getLeaderboard
);

module.exports = router;