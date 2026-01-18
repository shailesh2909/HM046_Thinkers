const { CompanyWebsite, Company } = require('../models');

// Create Company Website
exports.createCompanyWebsite = async (req, res) => {
  try {
    const authUserId = req.user.id;
    
    // Find the company for this user
    const company = await Company.findOne({ where: { authUserId } });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found for this user'
      });
    }

    const websiteData = { companyId: company.id, ...req.body };

    const website = await CompanyWebsite.create(websiteData);

    res.status(201).json({
      success: true,
      message: 'Company website created successfully',
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Company Websites
exports.getCompanyWebsites = async (req, res) => {
  try {
    const authUserId = req.user.id;
    
    // Find the company for this user
    const company = await Company.findOne({ where: { authUserId } });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found for this user'
      });
    }

    const websites = await CompanyWebsite.findAll({
      where: { companyId: company.id }
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

// Get Single Company Website
exports.getCompanyWebsiteById = async (req, res) => {
  try {
    const { id } = req.params;

    const website = await CompanyWebsite.findByPk(id);

    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Company website not found'
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

// Update Company Website
exports.updateCompanyWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await CompanyWebsite.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Company website not found'
      });
    }

    const website = await CompanyWebsite.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Company website updated successfully',
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Company Website
exports.deleteCompanyWebsite = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CompanyWebsite.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Company website not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company website deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
