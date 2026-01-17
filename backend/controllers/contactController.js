const { ContactInfo } = require('../models');

// Create Contact Info
exports.createContactInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const contactData = { userId, ...req.body };

    const contact = await ContactInfo.create(contactData);

    res.status(201).json({
      success: true,
      message: 'Contact info created successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all Contact Info for a user
exports.getContactInfos = async (req, res) => {
  try {
    const { userId } = req.params;

    const contacts = await ContactInfo.findAll({
      where: { userId }
    });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single Contact Info by ID
exports.getContactInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await ContactInfo.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact info not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Contact Info
exports.updateContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await ContactInfo.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Contact info not found'
      });
    }

    const contact = await ContactInfo.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Contact info updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Contact Info
exports.deleteContactInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ContactInfo.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Contact info not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact info deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
