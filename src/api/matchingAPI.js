import apiClient from './axiosConfig';

// Applicant Matching APIs
export const matchingAPI = {
  // Match applicants to job/project
  matchApplicants: async (jobData) => {
    try {
      const response = await apiClient.post('/matching/match', jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get matching results
  getMatchingResults: async (jobId) => {
    try {
      const response = await apiClient.get(`/matching/results/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recommended freelancers for company
  getRecommendations: async (companyId) => {
    try {
      const response = await apiClient.get(`/matching/recommendations/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default matchingAPI;