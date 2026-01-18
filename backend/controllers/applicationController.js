const Application = require('../models/Application');
const User = require('../models/User');
const Resume = require('../models/Resume');
const CompanyProject = require('../models/CompanyProject');
const path = require('path');

// Freelancer side: Apply for a job
exports.applyToJob = async (req, res) => {
  try {
    const { projectId, resumeId, coverLetter } = req.body;
    const application = await Application.create({
      userId: req.user.id,
      projectId,
      resumeId,
      coverLetter
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Company side: See all applications
exports.getCompanyApplications = async (req, res) => {
  try {
    const apps = await Application.findAll({
      include: [
        { model: User, attributes: ['email'] },
        { model: Resume, attributes: ['resume_name', 'resume_url'] },
        { model: CompanyProject, attributes: ['projectName', 'description', 'totalBudget'] }
      ]
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Freelancer side: Get my applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.findAll({
      where: { userId: req.user.id },
      include: [
        { model: CompanyProject, attributes: ['projectName', 'description', 'totalBudget', 'companyId'] },
        { model: Resume, attributes: ['resume_name', 'resume_url'] }
      ]
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Company side: Download a resume
exports.downloadResume = async (req, res) => {
    const { resumeId } = req.params;
    const resume = await Resume.findByPk(resumeId);
    if (!resume) return res.status(404).send('File not found');
    
    const filePath = path.join(__dirname, '..', resume.resume_url);
    res.download(filePath); // Forces browser to download the file
};