import apiClient from './axiosConfig';

// Job Application APIs
export const applicationAPI = {
  // Apply to a job
  applyToJob: async (applicationData) => {
    try {
      const response = await apiClient.post('/application/apply', applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all applications for a company
  getCompanyApplications: async () => {
    try {
      const response = await apiClient.get('/application/view-all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get my applications (for freelancers)
  getMyApplications: async () => {
    try {
      const response = await apiClient.get('/application/my-applications');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Download resume
  downloadResume: async (resumeId) => {
    try {
      const response = await apiClient.get(`/application/download/${resumeId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default applicationAPI;