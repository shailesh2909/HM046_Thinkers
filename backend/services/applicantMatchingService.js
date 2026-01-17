const axios = require('axios');

// Affinda API Configuration
const AFFINDA_API_KEY = process.env.AFFINDA_API_KEY;
const AFFINDA_BASE_URL = 'https://api.affinda.com/v3';

class ApplicantMatchingService {
  constructor() {
    this.apiKey = AFFINDA_API_KEY;
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Find top N applicants matching a job description
   * @param {Object} jobRequirements - Job requirements and preferences
   * @param {Array} applicants - Array of applicant profiles
   * @param {Number} topN - Number of top applicants to return
   */
  async findTopApplicants(jobRequirements, applicants, topN = 10) {
    try {
      const matchedApplicants = [];

      for (const applicant of applicants) {
        const score = this.calculateMatchScore(jobRequirements, applicant);
        matchedApplicants.push({
          ...applicant,
          matchScore: score,
          matchDetails: this.getMatchDetails(jobRequirements, applicant)
        });
      }

      // Sort by match score descending
      matchedApplicants.sort((a, b) => b.matchScore - a.matchScore);

      // Return top N applicants
      return matchedApplicants.slice(0, topN);
    } catch (error) {
      console.error('Error finding top applicants:', error);
      throw error;
    }
  }

  /**
   * Calculate match score between job requirements and applicant
   */
  calculateMatchScore(jobRequirements, applicant) {
    let score = 0;
    const weights = {
      skills: 0.4,
      experience: 0.3,
      education: 0.2,
      location: 0.1
    };

    // Skills matching
    if (jobRequirements.requiredSkills && applicant.skills) {
      const matchedSkills = this.getMatchingSkills(
        jobRequirements.requiredSkills,
        applicant.skills
      );
      score += (matchedSkills.length / jobRequirements.requiredSkills.length) * weights.skills * 100;
    }

    // Experience matching
    if (jobRequirements.minYearsExperience && applicant.totalExperience) {
      const expScore = Math.min(
        applicant.totalExperience / jobRequirements.minYearsExperience,
        1.5
      );
      score += expScore * weights.experience * 100;
    }

    // Education matching
    if (jobRequirements.educationLevel && applicant.education) {
      const eduScore = this.matchEducation(jobRequirements.educationLevel, applicant.education);
      score += eduScore * weights.education * 100;
    }

    // Location matching
    if (jobRequirements.location && applicant.location) {
      const locationMatch = this.matchLocation(jobRequirements.location, applicant.location);
      score += locationMatch * weights.location * 100;
    }

    return Math.min(Math.round(score), 100);
  }

  /**
   * Get matching skills between required and applicant skills
   */
  getMatchingSkills(requiredSkills, applicantSkills) {
    const normalizedRequired = requiredSkills.map(s => s.toLowerCase());
    const normalizedApplicant = applicantSkills.map(s => s.toLowerCase());
    
    return normalizedRequired.filter(skill => 
      normalizedApplicant.some(appSkill => 
        appSkill.includes(skill) || skill.includes(appSkill)
      )
    );
  }

  /**
   * Match education level
   */
  matchEducation(required, applicantEducation) {
    const educationLevels = {
      'high school': 1,
      'associate': 2,
      'bachelor': 3,
      'master': 4,
      'phd': 5,
      'doctorate': 5
    };

    const requiredLevel = educationLevels[required.toLowerCase()] || 0;
    const applicantLevel = Math.max(
      ...applicantEducation.map(edu => 
        educationLevels[edu.degree?.toLowerCase()] || 0
      )
    );

    return applicantLevel >= requiredLevel ? 1 : 0.5;
  }

  /**
   * Match location (basic string matching)
   */
  matchLocation(required, applicant) {
    if (required.toLowerCase() === 'remote') return 1;
    return required.toLowerCase() === applicant.toLowerCase() ? 1 : 0.5;
  }

  /**
   * Get detailed match information
   */
  getMatchDetails(jobRequirements, applicant) {
    const matchedSkills = jobRequirements.requiredSkills ? 
      this.getMatchingSkills(jobRequirements.requiredSkills, applicant.skills || []) : [];
    
    const missingSkills = jobRequirements.requiredSkills ? 
      jobRequirements.requiredSkills.filter(skill => 
        !matchedSkills.includes(skill.toLowerCase())
      ) : [];

    return {
      matchedSkills,
      missingSkills,
      experienceMatch: applicant.totalExperience >= (jobRequirements.minYearsExperience || 0),
      locationMatch: this.matchLocation(
        jobRequirements.location || '', 
        applicant.location || ''
      ) === 1
    };
  }

  /**
   * Parse resume using Affinda API (if needed)
   */
  async parseResume(resumeFile) {
    try {
      const response = await axios.post(
        `${AFFINDA_BASE_URL}/resumes`,
        resumeFile,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error parsing resume:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Batch process multiple resumes
   */
  async batchParseResumes(resumeFiles) {
    const promises = resumeFiles.map(file => this.parseResume(file));
    return Promise.all(promises);
  }
}

module.exports = new ApplicantMatchingService();
