import apiClient from './axiosConfig';

// Authentication APIs
export const authAPI = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        userType: userData.userType,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Sign in existing user
  signin: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/signin', {
        email: credentials.email,
        password: credentials.password,
        userType: credentials.userType,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Confirm password reset
  confirmPasswordReset: async (token, newPassword) => {
    try {
      const response = await apiClient.post('/auth/confirm-password-reset', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authAPI;
