const Submission = require('../models/Submission');
const Result = require('../models/Result');

exports.calculateFinalScore = async (req, res) => {
  const { assessmentId } = req.params;
  const userId = req.user.id;

  try {
    // 1. Get all submissions for this user in this assessment
    const submissions = await Submission.findAll({
      where: { userId, assessmentId }
    });

    // 2. Sum up the best score for each unique question
    const totalPoints = submissions.reduce((sum, sub) => sum + sub.score, 0);
    
    // 3. Create or Update the final Result record
    const result = await Result.upsert({
      userId,
      assessmentId,
      totalScore: totalPoints,
      percentage: (totalPoints / (submissions.length * 100)) * 100 // Example logic
    });

    // 4. Update Company Dashboard via WebSockets
    req.io.emit('new_submission_scored', { userId, totalPoints });

    res.json({ message: "Assessment graded successfully", totalPoints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};