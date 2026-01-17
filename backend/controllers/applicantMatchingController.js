const applicantMatchingService = require('../services/applicantMatchingService');
const { User, UserProfile, Education, Experience, Project } = require('../models');

/**
 * Find top N applicants for a job/project
 */
exports.findTopApplicants = async (req, res) => {
  try {
    const { 
      requiredSkills, 
      minYearsExperience, 
      educationLevel, 
      location,
      topN = 10 
    } = req.body;

    // Validate input
    if (!requiredSkills || !Array.isArray(requiredSkills)) {
      return res.status(400).json({
        success: false,
        message: 'requiredSkills array is required'
      });
    }

    // Fetch all users with their complete profiles
    const users = await User.findAll({
      include: [
        {
          model: UserProfile,
          as: 'UserProfile'
        },
        {
          model: Education,
          as: 'Educations'
        },
        {
          model: Experience,
          as: 'Experiences'
        },
        {
          model: Project,
          as: 'Projects'
        }
      ]
    });

    // Transform users to applicant format
    const applicants = users.map(user => {
      const profile = user.UserProfile || {};
      const experiences = user.Experiences || [];
      const educations = user.Educations || [];
      
      // Calculate total years of experience
      const totalExperience = experiences.reduce((total, exp) => {
        if (exp.startDate) {
          const start = new Date(exp.startDate);
          const end = exp.endDate ? new Date(exp.endDate) : new Date();
          const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
          return total + years;
        }
        return total;
      }, 0);

      // Collect all skills from experiences and projects
      const allSkills = new Set();
      experiences.forEach(exp => {
        if (exp.skills) exp.skills.forEach(skill => allSkills.add(skill));
      });
      user.Projects?.forEach(project => {
        if (project.skills) project.skills.forEach(skill => allSkills.add(skill));
      });

      return {
        userId: user.id,
        email: user.email,
        profileName: profile.profileName,
        headline: profile.headline,
        currentPosition: profile.currentPosition,
        location: profile.address,
        totalExperience: Math.round(totalExperience * 10) / 10,
        skills: Array.from(allSkills),
        education: educations,
        experiences: experiences,
        projects: user.Projects || []
      };
    });

    // Find top applicants using matching service
    const jobRequirements = {
      requiredSkills,
      minYearsExperience,
      educationLevel,
      location
    };

    const topApplicants = await applicantMatchingService.findTopApplicants(
      jobRequirements,
      applicants,
      parseInt(topN)
    );

    res.status(200).json({
      success: true,
      message: `Found top ${topApplicants.length} matching applicants`,
      data: {
        jobRequirements,
        totalApplicants: applicants.length,
        topApplicants
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Find applicants for a specific company project
 */
exports.findApplicantsForProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { topN = 10 } = req.body;

    const { CompanyProject } = require('../models');
    
    // Get project details
    const project = await CompanyProject.findByPk(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Extract requirements from project description
    // In a real scenario, this would use NLP to extract requirements
    const jobRequirements = {
      requiredSkills: req.body.requiredSkills || [],
      minYearsExperience: req.body.minYearsExperience || 0,
      educationLevel: req.body.educationLevel || 'bachelor',
      location: req.body.location || 'remote'
    };

    // Fetch all applicants
    const users = await User.findAll({
      include: [
        { model: UserProfile, as: 'UserProfile' },
        { model: Education, as: 'Educations' },
        { model: Experience, as: 'Experiences' },
        { model: Project, as: 'Projects' }
      ]
    });

    const applicants = users.map(user => ({
      userId: user.id,
      email: user.email,
      profileName: user.UserProfile?.profileName,
      headline: user.UserProfile?.headline,
      totalExperience: user.Experiences?.reduce((total, exp) => {
        if (exp.startDate) {
          const years = (new Date() - new Date(exp.startDate)) / (1000 * 60 * 60 * 24 * 365);
          return total + years;
        }
        return total;
      }, 0) || 0,
      skills: [...new Set([
        ...(user.Experiences?.flatMap(e => e.skills || []) || []),
        ...(user.Projects?.flatMap(p => p.skills || []) || [])
      ])],
      education: user.Educations || [],
      location: user.UserProfile?.address
    }));

    const topApplicants = await applicantMatchingService.findTopApplicants(
      jobRequirements,
      applicants,
      parseInt(topN)
    );

    res.status(200).json({
      success: true,
      data: {
        project: {
          id: project.id,
          name: project.projectName,
          description: project.description
        },
        requirements: jobRequirements,
        topApplicants
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get applicant ranking for multiple candidates
 */
exports.rankApplicants = async (req, res) => {
  try {
    const { userIds, jobRequirements } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userIds array is required'
      });
    }

    const users = await User.findAll({
      where: { id: userIds },
      include: [
        { model: UserProfile, as: 'UserProfile' },
        { model: Education, as: 'Educations' },
        { model: Experience, as: 'Experiences' },
        { model: Project, as: 'Projects' }
      ]
    });

    const applicants = users.map(user => ({
      userId: user.id,
      email: user.email,
      profileName: user.UserProfile?.profileName,
      totalExperience: user.Experiences?.reduce((total, exp) => {
        if (exp.startDate) {
          const years = (new Date() - new Date(exp.startDate)) / (1000 * 60 * 60 * 24 * 365);
          return total + years;
        }
        return total;
      }, 0) || 0,
      skills: [...new Set([
        ...(user.Experiences?.flatMap(e => e.skills || []) || []),
        ...(user.Projects?.flatMap(p => p.skills || []) || [])
      ])],
      education: user.Educations || [],
      location: user.UserProfile?.address
    }));

    const rankedApplicants = await applicantMatchingService.findTopApplicants(
      jobRequirements,
      applicants,
      applicants.length
    );

    res.status(200).json({
      success: true,
      data: rankedApplicants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
