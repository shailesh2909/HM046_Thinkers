const { Company } = require('../models');

// Create Company
exports.createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    const company = await Company.create(companyData);

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);

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

// Update Company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await Company.update(updateData, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    const company = await Company.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Company.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Companies by Auth User ID
exports.getCompaniesByAuthUser = async (req, res) => {
  try {
    const { authUserId } = req.params;

    const companies = await Company.findAll({
      where: { authUserId },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
