import apiClient from './axiosConfig';

export const companyAPI = {
  // 1. Get company by auth user ID
  // MATCHES BACKEND: router.get('/user/:authUserId', ...)
  getCompanyByAuthUserId: async (authUserId) => {
    try {
      // FIX: Changed path to match backend route '/user/:authUserId'
      const response = await apiClient.get(`/company/user/${authUserId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 2. Update company profile
  // MATCHES BACKEND: router.put('/profile/update', ...)
  updateProfile: async (companyData) => {
    try {
      const response = await apiClient.put('/company/profile/update', {
        userid:localStorage.getItem('userId'),
        companyName: companyData.companyName, // Ensure casing matches Backend Model
        headline: companyData.headline,
        about: companyData.about,
        profilePhoto: companyData.profilePhoto,
        bannerPhoto: companyData.bannerPhoto,
        industry: companyData.industry,
        companySize: companyData.companySize, 
        contactEmail: companyData.contactEmail,
        phoneNumber: companyData.phoneNumber,
        phoneType: companyData.phoneType,
        address: companyData.address,
        location: companyData.location,
        // Add authUserId if your backend logic requires it in body, 
        // though your controller takes it from req.user
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 3. Get Single Company by ID
  // MATCHES BACKEND: router.get('/:id', ...)
  getCompanyById: async (companyId) => {
    try {
      const response = await apiClient.get(`/company/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 4. Create Company (If you need to call it from frontend)
  // MATCHES BACKEND: router.post('/', ...)
  createCompany: async (companyData) => {
    try {
      const response = await apiClient.post('/company', companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // --- MISSING BACKEND ROUTES WARNING ---
  // The following functions do not have corresponding routes in the file you shared.
  // You need to add routes like router.post('/upload-logo', ...) to backend for these to work.
  
  uploadLogo: async (formData) => {
    try {
      const response = await apiClient.post('/company/upload-logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadBanner: async (formData) => {
    try {
      const response = await apiClient.post('/company/upload-banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const companyWebsitesAPI = {
  // Add website
  addWebsite: async (websiteData) => {
    try {
      const response = await apiClient.post('/company-website', {
        website_url: websiteData.websiteUrl,
        website_type: websiteData.websiteType, 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company websites
  getWebsites: async (companyId) => {
    try {
      const response = await apiClient.get(`/company-website/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update website
  updateWebsite: async (websiteId, websiteData) => {
    try {
      const response = await apiClient.put(`/company-website/${websiteId}`, {
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
      const response = await apiClient.delete(`/company-website/${websiteId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default { companyAPI, companyWebsitesAPI };