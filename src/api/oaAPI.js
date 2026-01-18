import apiClient from './axiosConfig';

// Online Assessment APIs
export const oaAPI = {
  // Create new assessment
  createAssessment: async (assessmentData) => {
    try {
      const response = await apiClient.post('/oa/create-assessment', assessmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get questions for an assessment
  getQuestions: async (assessmentId) => {
    try {
      const response = await apiClient.get(`/oa/questions/${assessmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Submit code for evaluation
  submitCode: async (submissionData) => {
    try {
      const response = await apiClient.post('/oa/submit', submissionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get leaderboard for assessment
  getLeaderboard: async (assessmentId) => {
    try {
      const response = await apiClient.get(`/oa/leaderboard/${assessmentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default oaAPI;