const { Website } = require('../models');

// Create Website
exports.createWebsite = async (req, res) => {
  try {
    const { userId } = req.params;
    const websiteData = { userId, ...req.body };

    const website = await Website.create(websiteData);

    res.status(201).json({
      success: true,
      message: 'Website created successfully',
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Websites for a user
exports.getWebsites = async (req, res) => {
  try {
    const { userId } = req.params;

    const websites = await Website.findAll({
      where: { userId }
    });

    res.status(200).json({
      success: true,
      data: websites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single Website by ID
exports.getWebsiteById = async (req, res) => {
  try {
    const { id } = req.params;

    const website = await Website.findByPk(id);

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    res.status(200).json({
      success: true,
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Website
exports.updateWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await Website.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    const website = await Website.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Website updated successfully',
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Website
exports.deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Website.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Website deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
