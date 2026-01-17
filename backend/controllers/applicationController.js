const Application = require('../models/Application');

exports.applyToJob = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.user.id; // From your Auth Middleware

    const newApplication = await Application.create({
      userId,
      resumeId,
      appliedAt: new Date()
    });

    res.status(201).json({ message: "Application submitted!", newApplication });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};