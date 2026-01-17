const { UserProfile } = require('../models');

// Create or Update UserProfile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    const [profile, created] = await UserProfile.upsert({
      userId,
      ...profileData
    });

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'Profile created successfully' : 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get UserProfile by userId
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await UserProfile.findOne({
      where: { userId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete UserProfile
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await UserProfile.destroy({
      where: { userId }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
