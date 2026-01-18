import apiClient from './axiosConfig';

// Freelancer Projects API
export const freelancerProjectAPI = {
  // Create new freelancer project
  createProject: async (userId, projectData) => {
    try {
      const response = await apiClient.post(`/project/${userId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all projects for a freelancer
  getProjects: async (userId) => {
    try {
      const response = await apiClient.get(`/project/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single project by ID
  getProjectById: async (projectId) => {
    try {
      const response = await apiClient.get(`/project/single/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/project/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      const response = await apiClient.delete(`/project/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Company Projects API
export const companyProjectAPI = {
  // Create new company project
  createProject: async (companyId, projectData) => {
    try {
      const response = await apiClient.post(`/company-project/${companyId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all projects for a company
  getProjects: async (companyId) => {
    try {
      const response = await apiClient.get(`/company-project/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all projects by auth user ID
  getProjectsByAuthUser: async (authUserId) => {
    try {
      const response = await apiClient.get(`/company-project/user/${authUserId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get projects by status
  getProjectsByStatus: async (companyId, status) => {
    try {
      const response = await apiClient.get(`/company-project/${companyId}/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single project by ID
  getProjectById: async (projectId) => {
    try {
      const response = await apiClient.get(`/company-project/single/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/company-project/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete project
  deleteProject: async (projectId) => {
    try {
      const response = await apiClient.delete(`/company-project/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all projects from all companies (for freelancers)
  getAllProjects: async () => {
    try {
      const response = await apiClient.get('/company-project/all');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Project Milestones API
export const projectMilestoneAPI = {
  // Create milestone
  createMilestone: async (projectId, milestoneData) => {
    try {
      const response = await apiClient.post(`/milestone/${projectId}`, milestoneData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get milestones for a project
  getMilestones: async (projectId) => {
    try {
      const response = await apiClient.get(`/milestone/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single milestone by ID
  getMilestoneById: async (milestoneId) => {
    try {
      const response = await apiClient.get(`/milestone/single/${milestoneId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update milestone
  updateMilestone: async (milestoneId, milestoneData) => {
    try {
      const response = await apiClient.put(`/milestone/${milestoneId}`, milestoneData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update milestone status
  updateMilestoneStatus: async (milestoneId, status) => {
    try {
      const response = await apiClient.patch(`/milestone/${milestoneId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get milestones by status
  getMilestonesByStatus: async (projectId, status) => {
    try {
      const response = await apiClient.get(`/milestone/${projectId}/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete milestone
  deleteMilestone: async (milestoneId) => {
    try {
      const response = await apiClient.delete(`/milestone/${milestoneId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default {
  freelancerProjectAPI,
  companyProjectAPI,
  projectMilestoneAPI
};
