import apiClient from './axiosConfig';

// Resume APIs
export const resumeAPI = {
  // Upload and parse resume
  uploadResume: async (formData) => {
    try {
      const response = await apiClient.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get parsed resume data
  getParsedResume: async (resumeId) => {
    try {
      const response = await apiClient.get(`/resume/${resumeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's resumes
  getUserResumes: async () => {
    try {
      const response = await apiClient.get('/resume');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete resume
  deleteResume: async (resumeId) => {
    try {
      const response = await apiClient.delete(`/resume/${resumeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default resumeAPI;