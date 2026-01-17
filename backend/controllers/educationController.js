const { Education } = require('../models');

// Create Education
exports.createEducation = async (req, res) => {
  try {
    const { userId } = req.params;
    const educationData = { userId, ...req.body };

    const education = await Education.create(educationData);

    res.status(201).json({
      success: true,
      message: 'Education created successfully',
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Education for a user
exports.getEducations = async (req, res) => {
  try {
    const { userId } = req.params;

    const educations = await Education.findAll({
      where: { userId },
      order: [['startDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: educations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single Education by ID
exports.getEducationById = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByPk(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Education
exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await Education.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    const education = await Education.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Education updated successfully',
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Education.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Education not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Education deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
