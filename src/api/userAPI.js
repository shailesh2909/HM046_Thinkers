import apiClient from './axiosConfig';

// User Profile APIs
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/users/profile', {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        bio: profileData.bio,
        profileImage: profileData.profileImage,
        location: profileData.location,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.put('/users/password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (formData) => {
    try {
      const response = await apiClient.post('/users/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user ratings and reviews
  getUserRatings: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/ratings`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete account
  deleteAccount: async (password) => {
    try {
      const response = await apiClient.delete('/users/account', {
        data: { password },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get freelancer details
  getFreelancerDetails: async (freelancerId) => {
    try {
      const response = await apiClient.get(`/users/freelancer/${freelancerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company details
  getCompanyDetails: async (companyId) => {
    try {
      const response = await apiClient.get(`/users/company/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update company profile
  updateCompanyProfile: async (companyData) => {
    try {
      const response = await apiClient.put('/companies/profile', {
        company_name: companyData.companyName,
        headline: companyData.headline,
        about: companyData.about,
        profile_photo: companyData.profilePhoto,
        banner_photo: companyData.bannerPhoto,
        industry: companyData.industry,
        company_size: companyData.companySize,
        contact_email: companyData.contactEmail,
        phone_number: companyData.phoneNumber,
        phone_type: companyData.phoneType,
        address: companyData.address,
        location: companyData.location,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company profile
  getCompanyProfile: async () => {
    try {
      const response = await apiClient.get('/companies/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Company Websites API
export const companyWebsitesAPI = {
  // Add company website
  addWebsite: async (websiteData) => {
    try {
      const response = await apiClient.post('/companies/websites', {
        website_url: websiteData.websiteUrl,
        website_type: websiteData.websiteType, // official / blog / portfolio / product
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company websites
  getWebsites: async (companyId) => {
    try {
      const response = await apiClient.get(`/companies/${companyId}/websites`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update website
  updateWebsite: async (websiteId, websiteData) => {
    try {
      const response = await apiClient.put(`/companies/websites/${websiteId}`, {
        website_url: websiteData.websiteUrl,
        website_type: websiteData.websiteType,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete website
  deleteWebsite: async (websiteId) => {
    try {
      const response = await apiClient.delete(`/companies/websites/${websiteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default userAPI;
