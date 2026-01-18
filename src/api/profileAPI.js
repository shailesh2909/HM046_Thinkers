import apiClient from './axiosConfig';

// Profile APIs
export const profileAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Complete user profile
  completeProfile: async (profileData) => {
    try {
      const response = await apiClient.post('/user/complete-profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Education APIs
export const educationAPI = {
  // Add education
  addEducation: async (educationData) => {
    try {
      const response = await apiClient.post('/education', educationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user education
  getEducation: async () => {
    try {
      const response = await apiClient.get('/education');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update education
  updateEducation: async (educationId, educationData) => {
    try {
      const response = await apiClient.put(`/education/${educationId}`, educationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete education
  deleteEducation: async (educationId) => {
    try {
      const response = await apiClient.delete(`/education/${educationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Contact APIs
export const contactAPI = {
  // Add contact info
  addContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user contacts
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update contact
  updateContact: async (contactId, contactData) => {
    try {
      const response = await apiClient.put(`/contact/${contactId}`, contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete contact
  deleteContact: async (contactId) => {
    try {
      const response = await apiClient.delete(`/contact/${contactId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Website APIs
export const websiteAPI = {
  // Add website
  addWebsite: async (websiteData) => {
    try {
      const response = await apiClient.post('/website', websiteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user websites
  getWebsites: async () => {
    try {
      const response = await apiClient.get('/website');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update website
  updateWebsite: async (websiteId, websiteData) => {
    try {
      const response = await apiClient.put(`/website/${websiteId}`, websiteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete website
  deleteWebsite: async (websiteId) => {
    try {
      const response = await apiClient.delete(`/website/${websiteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Experience APIs
export const experienceAPI = {
  // Add experience
  addExperience: async (experienceData) => {
    try {
      const response = await apiClient.post('/experience', experienceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user experience
  getExperience: async () => {
    try {
      const response = await apiClient.get('/experience');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update experience
  updateExperience: async (experienceId, experienceData) => {
    try {
      const response = await apiClient.put(`/experience/${experienceId}`, experienceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete experience
  deleteExperience: async (experienceId) => {
    try {
      const response = await apiClient.delete(`/experience/${experienceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default {
  profileAPI,
  educationAPI,
  contactAPI,
  websiteAPI,
  experienceAPI
};