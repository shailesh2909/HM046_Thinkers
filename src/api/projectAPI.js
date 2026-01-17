import apiClient from './axiosConfig';

// Project APIs for both freelancers and companies
export const projectAPI = {
  // Get all projects (with pagination and filters)
  getAllProjects: async (filters = {}) => {
    try {
      const response = await apiClient.get('/projects', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single project by ID
  getProjectById: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new project (companies only)
  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', {
        title: projectData.title,
        description: projectData.description,
        budget: projectData.budget,
        deadline: projectData.deadline,
        skills: projectData.skills,
        category: projectData.category,
        attachment: projectData.attachment,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update project (companies only)
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete project (companies only)
  deleteProject: async (projectId) => {
    try {
      const response = await apiClient.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get freelancer's projects
  getFreelancerProjects: async (freelancerId) => {
    try {
      const response = await apiClient.get(`/projects/freelancer/${freelancerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company's projects
  getCompanyProjects: async (companyId) => {
    try {
      const response = await apiClient.get(`/projects/company/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search projects
  searchProjects: async (searchTerm) => {
    try {
      const response = await apiClient.get('/projects/search', {
        params: { q: searchTerm },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default projectAPI;
