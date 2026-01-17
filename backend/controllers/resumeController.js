const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Please upload a PDF file" });

    const resume = await Resume.create({
      resume_url: req.file.path, // Path where it's saved on the server
      resume_name: req.body.resume_name || req.file.originalname,
      userId: req.user.id // Taken from your Auth Middleware
    });

    res.status(201).json({ message: "Resume uploaded", resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyResumes = async (req, res) => {
  const resumes = await Resume.findAll({ where: { userId: req.user.id } });
  res.json(resumes);
};

exports.deleteResume = async (req, res) => {
    const resume = await Resume.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!resume) return res.status(404).json({ error: "Resume not found" });
    
    // Delete physical file
    require('fs').unlinkSync(resume.resume_url);
    await resume.destroy();
    res.json({ message: "Resume deleted" });
};