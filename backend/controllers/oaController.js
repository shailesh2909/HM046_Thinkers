const Question = require('../models/Question');
const Assessment = require('../models/Assessment');
const Submission = require('../models/Submission');
const { executeCode } = require('../services/judge0');

// 1. Create a Test (Company Only)
exports.createAssessment = async (req, res) => {
  try {
    const { title, type, questions } = req.body; // questions is an array of question objects

    const assessment = await Assessment.create({
      title,
      type,
      companyId: req.user.id
    });

    // Create and link questions
    if (questions && questions.length > 0) {
      const createdQuestions = await Question.bulkCreate(
        questions.map(q => ({ ...q, assessmentId: assessment.id }))
      );
    }

    res.status(201).json({ message: "Assessment Created", assessment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.submitCode = async (req, res) => {
  const { questionId, sourceCode, languageId } = req.body;

  try {
    const question = await Question.findByPk(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const testCases = question.hiddenTestCases;
    let passed = 0;
    let results = [];
    
    // Variables to track peak performance across all test cases
    let maxExecutionTime = 0;
    let maxMemoryUsed = 0;
    let detectedLanguage = "unknown";

    // 1. Loop through hidden test cases
    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      const execution = await executeCode(sourceCode, languageId, test.input);

      // Track the language and peak metrics
      detectedLanguage = execution.language || detectedLanguage;
      if (execution.executionTime > maxExecutionTime) maxExecutionTime = execution.executionTime;
      if (execution.memoryUsed > maxMemoryUsed) maxMemoryUsed = execution.memoryUsed;

      const isCorrect = execution.stdout && execution.stdout.trim() === test.output.trim();
      if (isCorrect) passed++;

      results.push({
        testCase: i + 1,
        passed: isCorrect,
        stdout: execution.stdout,
        error: execution.stderr || null
      });
    }

    const finalScore = (passed / testCases.length) * 100;

    // 2. Create record in database using tracked metrics
    const submission = await Submission.create({
      userId: req.user.id,
      questionId,
      score: finalScore,
      code: sourceCode,
      status: finalScore === 100 ? 'Accepted' : 'Wrong Answer',
      executionTime: parseFloat(maxExecutionTime) || 0.0, // Ensure double precision
      memoryUsed: parseInt(maxMemoryUsed) || 0,        // Ensure integer
      language: detectedLanguage
    });

    // 3. Notify User via Socket.io
    const io = req.app.get('socketio');
    if (io) {
      io.to(req.user.id).emit('oa_evaluated', {
        score: finalScore,
        status: submission.status,
        results
      });
    }

    res.json({ 
      score: finalScore, 
      status: submission.status, 
      results,
      metrics: {
        time: maxExecutionTime,
        memory: maxMemoryUsed,
        language: detectedLanguage
      }
    });
    
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ error: "Execution Error", details: err.message });
  }
};
// Add these to the bottom of controllers/oaController.js

// 3. Get Questions for a specific assessment
exports.getQuestions = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const questions = await Question.findAll({
      where: { assessmentId },
      attributes: { exclude: ['hiddenTestCases'] } // Safety: Don't send answers to frontend!
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Get Leaderboard (Company Only)
exports.getLeaderboard = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const Result = require('../models/Result'); // Ensure import
    const User = require('../models/User');

    const leaderboard = await Result.findAll({
      where: { assessmentId },
      include: [{ model: User, attributes: ['id', 'email'] }],
      order: [['totalScore', 'DESC']]
    });

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};