import apiClient from './axiosConfig';

// Company Profile API
export const companyAPI = {
  // Get company profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/companies/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company by ID
  getCompanyById: async (companyId) => {
    try {
      const response = await apiClient.get(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update company profile
  updateProfile: async (companyData) => {
    try {
      const response = await apiClient.put('/companies/profile', {
        company_name: companyData.companyName,
        headline: companyData.headline,
        about: companyData.about,
        profile_photo: companyData.profilePhoto,
        banner_photo: companyData.bannerPhoto,
        industry: companyData.industry,
        company_size: companyData.companySize, // e.g., "11-50", "51-200"
        contact_email: companyData.contactEmail,
        phone_number: companyData.phoneNumber,
        phone_type: companyData.phoneType, // work / support / other
        address: companyData.address,
        location: companyData.location,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload company logo
  uploadLogo: async (formData) => {
    try {
      const response = await apiClient.post('/companies/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload company banner
  uploadBanner: async (formData) => {
    try {
      const response = await apiClient.post('/companies/upload-banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Company Websites API
export const companyWebsitesAPI = {
  // Add website
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

  // Get current company's websites
  getMyWebsites: async () => {
    try {
      const response = await apiClient.get('/companies/websites');
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

export default { companyAPI, companyWebsitesAPI };
