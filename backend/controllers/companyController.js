const Result = require('../models/Result');
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  const { assessmentId } = req.params;

  const leaderboard = await Result.findAll({
    where: { assessmentId },
    include: [{ model: User, attributes: ['email', 'id'] }],
    order: [['totalScore', 'DESC']] // Highest score first
  });

  res.json(leaderboard);
};

exports.shortlistUser = async (req, res) => {
  const { resultId } = req.body;
  await Result.update({ isShortlisted: true }, { where: { id: resultId } });
  res.json({ message: "User shortlisted for interview!" });
};
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
// Update OR Create Company Profile (Upsert)
exports.updateCompanyProfile = async (req, res) => {
  try {
    // 1. Get User ID from JWT (ensure your auth middleware sets req.user)
    const authUserId = req.user.id; 
    const updateData = req.body;

    console.log("Upserting Company Profile for User:", authUserId);
    console.log("Data:", updateData);

    // 2. Check if the company profile already exists
    const existingCompany = await Company.findOne({ where: { authUserId } });

    let company;
    let message;
    let statusCode;

    if (existingCompany) {
      // --- UPDATE SCENARIO ---
      // Update existing record
      await existingCompany.update(updateData);
      company = existingCompany; // Use the updated instance
      message = 'Company profile updated successfully';
      statusCode = 200;
    } else {
      // --- CREATE SCENARIO ---
      // Create new record, enforcing the link to the auth user
      const newCompanyData = {
        ...updateData,
        authUserId: authUserId // Crucial: Link it to the user!
      };
      company = await Company.create(newCompanyData);
      message = 'Company profile created successfully';
      statusCode = 201; // 201 Created
    }

    // 3. Return the result
    res.status(statusCode).json({
      success: true,
      message: message,
      data: company
    });

  } catch (error) {
    console.error("Upsert Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update company profile"
    });
  }
};