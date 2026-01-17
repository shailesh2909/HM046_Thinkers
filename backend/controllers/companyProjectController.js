const { CompanyProject } = require('../models');

// Create Company Project
exports.createCompanyProject = async (req, res) => {
  try {
    const { companyId } = req.params;
    const projectData = { companyId, ...req.body };

    const project = await CompanyProject.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Company project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Company Projects
exports.getCompanyProjects = async (req, res) => {
  try {
    const { companyId } = req.params;

    const projects = await CompanyProject.findAll({
      where: { companyId },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Company Project
exports.getCompanyProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await CompanyProject.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Company project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Company Project
exports.updateCompanyProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await CompanyProject.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Company project not found'
      });
    }

    const project = await CompanyProject.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Company project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Company Project
exports.deleteCompanyProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CompanyProject.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Company project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Projects by Status
exports.getProjectsByStatus = async (req, res) => {
  try {
    const { companyId, status } = req.params;

    const projects = await CompanyProject.findAll({
      where: { 
        companyId,
        projectStatus: status
      },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
