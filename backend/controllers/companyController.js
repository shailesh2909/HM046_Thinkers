const Result = require('../models/Result');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  const { assessmentId } = req.params;

  const leaderboard = await Result.findAll({
    where: { assessmentId },
    include: [{ model: User, attributes: ['email', 'id'] }],
    order: [['totalScore', 'DESC']] // Highest score first
  });

  res.json(leaderboard);
};

exports.shortlistUser = async (req, res) => {
  const { resultId } = req.body;
  await Result.update({ isShortlisted: true }, { where: { id: resultId } });
  res.json({ message: "User shortlisted for interview!" });
};