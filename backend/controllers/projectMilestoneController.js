const { ProjectMilestone } = require('../models');

// Create Project Milestone
exports.createProjectMilestone = async (req, res) => {
  try {
    const { projectId } = req.params;
    const milestoneData = { projectId, ...req.body };

    const milestone = await ProjectMilestone.create(milestoneData);

    res.status(201).json({
      success: true,
      message: 'Project milestone created successfully',
      data: milestone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Project Milestones
exports.getProjectMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    const milestones = await ProjectMilestone.findAll({
      where: { projectId },
      order: [['order_no', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: milestones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Project Milestone
exports.getProjectMilestoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await ProjectMilestone.findByPk(id);

    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Project milestone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: milestone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Project Milestone
exports.updateProjectMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await ProjectMilestone.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Project milestone not found'
      });
    }

    const milestone = await ProjectMilestone.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Project milestone updated successfully',
      data: milestone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Project Milestone
exports.deleteProjectMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ProjectMilestone.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project milestone not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project milestone deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Milestone Status
exports.updateMilestoneStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { milestoneStatus } = req.body;

    const [updated] = await ProjectMilestone.update(
      { milestoneStatus },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Project milestone not found'
      });
    }

    const milestone = await ProjectMilestone.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Milestone status updated successfully',
      data: milestone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Milestones by Status
exports.getMilestonesByStatus = async (req, res) => {
  try {
    const { projectId, status } = req.params;

    const milestones = await ProjectMilestone.findAll({
      where: { 
        projectId,
        milestoneStatus: status
      },
      order: [['order_no', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: milestones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
