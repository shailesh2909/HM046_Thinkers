const {
  User,
  UserProfile,
  Education,
  ContactInfo,
  Website,
  Experience,
  Project
} = require('../models');

// Get complete user profile with all related data
exports.getCompleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserProfile,
          as: 'UserProfile'
        },
        {
          model: Education,
          as: 'Educations',
          order: [['startDate', 'DESC']]
        },
        {
          model: ContactInfo,
          as: 'ContactInfos'
        },
        {
          model: Website,
          as: 'Websites'
        },
        {
          model: Experience,
          as: 'Experiences',
          order: [['startDate', 'DESC']]
        },
        {
          model: Project,
          as: 'Projects',
          order: [['startDate', 'DESC']]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user profile statistics
exports.getProfileStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const [educationCount, experienceCount, projectCount, websiteCount, contactCount] = await Promise.all([
      Education.count({ where: { userId } }),
      Experience.count({ where: { userId } }),
      Project.count({ where: { userId } }),
      Website.count({ where: { userId } }),
      ContactInfo.count({ where: { userId } })
    ]);

    res.status(200).json({
      success: true,
      data: {
        education: educationCount,
        experience: experienceCount,
        projects: projectCount,
        websites: websiteCount,
        contacts: contactCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete all user profile data
exports.deleteCompleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Due to CASCADE delete in associations, deleting user will delete all related data
    await Promise.all([
      UserProfile.destroy({ where: { userId } }),
      Education.destroy({ where: { userId } }),
      ContactInfo.destroy({ where: { userId } }),
      Website.destroy({ where: { userId } }),
      Experience.destroy({ where: { userId } }),
      Project.destroy({ where: { userId } })
    ]);

    res.status(200).json({
      success: true,
      message: 'Complete profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
