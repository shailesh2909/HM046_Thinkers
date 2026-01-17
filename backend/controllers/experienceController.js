const { Experience } = require('../models');

// Create Experience
exports.createExperience = async (req, res) => {
  try {
    const { userId } = req.params;
    const experienceData = { userId, ...req.body };

    const experience = await Experience.create(experienceData);

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Experiences for a user
exports.getExperiences = async (req, res) => {
  try {
    const { userId } = req.params;

    const experiences = await Experience.findAll({
      where: { userId },
      order: [['startDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single Experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByPk(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Experience
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await Experience.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const experience = await Experience.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Experience
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Experience.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
