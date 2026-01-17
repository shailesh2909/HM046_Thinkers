const {
  Company,
  CompanyWebsite,
  CompanyProject,
  ProjectMilestone
} = require('../models');

// Get Complete Company Profile with all related data
exports.getCompleteCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findByPk(companyId, {
      include: [
        {
          model: CompanyWebsite,
          as: 'CompanyWebsites'
        },
        {
          model: CompanyProject,
          as: 'CompanyProjects',
          include: [
            {
              model: ProjectMilestone,
              as: 'ProjectMilestones',
              order: [['order_no', 'ASC']]
            }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Company Statistics
exports.getCompanyStats = async (req, res) => {
  try {
    const { companyId } = req.params;

    const [websiteCount, projectCount, activeProjects, completedProjects] = await Promise.all([
      CompanyWebsite.count({ where: { companyId } }),
      CompanyProject.count({ where: { companyId } }),
      CompanyProject.count({ where: { companyId, projectStatus: 'in_progress' } }),
      CompanyProject.count({ where: { companyId, projectStatus: 'completed' } })
    ]);

    // Get total budget across all projects
    const projects = await CompanyProject.findAll({
      where: { companyId },
      attributes: ['totalBudget']
    });

    const totalBudget = projects.reduce((sum, project) => {
      return sum + parseFloat(project.totalBudget || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        websites: websiteCount,
        totalProjects: projectCount,
        activeProjects: activeProjects,
        completedProjects: completedProjects,
        totalBudget: totalBudget.toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Project with Milestones
exports.getProjectWithMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await CompanyProject.findByPk(projectId, {
      include: [
        {
          model: ProjectMilestone,
          as: 'ProjectMilestones',
          order: [['order_no', 'ASC']]
        },
        {
          model: Company,
          as: 'Company'
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
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

// Delete Complete Company Profile
exports.deleteCompleteCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Due to CASCADE delete, deleting company will delete all related data
    const deleted = await Company.destroy({
      where: { id: companyId }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company and all related data deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
