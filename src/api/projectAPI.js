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
        project_name: projectData.projectName,
        description: projectData.description,
        total_budget: projectData.totalBudget,
        currency: projectData.currency || 'INR',
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        project_status: projectData.projectStatus || 'draft', // draft / open / in_progress / completed / cancelled
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update project (companies only)
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`/projects/${projectId}`, {
        project_name: projectData.projectName,
        description: projectData.description,
        total_budget: projectData.totalBudget,
        currency: projectData.currency,
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        project_status: projectData.projectStatus,
      });
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

// Project Milestones API
export const projectMilestonesAPI = {
  // Create milestone
  createMilestone: async (milestoneData) => {
    try {
      const response = await apiClient.post('/projects/milestones', {
        project_id: milestoneData.projectId,
        milestone_title: milestoneData.milestoneTitle,
        description: milestoneData.description,
        amount: milestoneData.amount,
        order_no: milestoneData.orderNo,
        start_date: milestoneData.startDate,
        end_date: milestoneData.endDate,
        milestone_status: milestoneData.milestoneStatus || 'pending', // pending / in_progress / submitted / approved / paid / rejected
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get project milestones
  getProjectMilestones: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}/milestones`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get milestone by ID
  getMilestoneById: async (milestoneId) => {
    try {
      const response = await apiClient.get(`/projects/milestones/${milestoneId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update milestone
  updateMilestone: async (milestoneId, milestoneData) => {
    try {
      const response = await apiClient.put(`/projects/milestones/${milestoneId}`, {
        milestone_title: milestoneData.milestoneTitle,
        description: milestoneData.description,
        amount: milestoneData.amount,
        order_no: milestoneData.orderNo,
        start_date: milestoneData.startDate,
        end_date: milestoneData.endDate,
        milestone_status: milestoneData.milestoneStatus,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete milestone
  deleteMilestone: async (milestoneId) => {
    try {
      const response = await apiClient.delete(`/projects/milestones/${milestoneId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update milestone status
  updateMilestoneStatus: async (milestoneId, status) => {
    try {
      const response = await apiClient.patch(`/projects/milestones/${milestoneId}/status`, {
        milestone_status: status, // pending / in_progress / submitted / approved / paid / rejected
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Milestone Submissions API
export const milestoneSubmissionsAPI = {
  // Submit work for milestone
  submitWork: async (submissionData) => {
    try {
      const response = await apiClient.post('/projects/milestones/submissions', {
        milestone_id: submissionData.milestoneId,
        submission_url: submissionData.submissionUrl,
        message: submissionData.message,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get milestone submissions
  getMilestoneSubmissions: async (milestoneId) => {
    try {
      const response = await apiClient.get(`/projects/milestones/${milestoneId}/submissions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get submission by ID
  getSubmissionById: async (submissionId) => {
    try {
      const response = await apiClient.get(`/projects/milestones/submissions/${submissionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Review submission (company)
  reviewSubmission: async (submissionId, reviewData) => {
    try {
      const response = await apiClient.put(`/projects/milestones/submissions/${submissionId}/review`, {
        reviewed_at: new Date().toISOString(),
        ...reviewData,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Project Assignments API
export const projectAssignmentsAPI = {
  // Assign freelancer to project
  assignFreelancer: async (assignmentData) => {
    try {
      const response = await apiClient.post('/projects/assignments', {
        project_id: assignmentData.projectId,
        freelancer_auth_id: assignmentData.freelancerAuthId,
        assignment_status: assignmentData.assignmentStatus || 'active', // active / completed / terminated
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get project assignments
  getProjectAssignments: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}/assignments`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get freelancer assignments
  getFreelancerAssignments: async (freelancerAuthId) => {
    try {
      const response = await apiClient.get(`/freelancers/${freelancerAuthId}/assignments`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update assignment status
  updateAssignmentStatus: async (assignmentId, status) => {
    try {
      const response = await apiClient.patch(`/projects/assignments/${assignmentId}/status`, {
        assignment_status: status, // active / completed / terminated
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Terminate assignment
  terminateAssignment: async (assignmentId, reason) => {
    try {
      const response = await apiClient.put(`/projects/assignments/${assignmentId}/terminate`, {
        assignment_status: 'terminated',
        reason: reason,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default projectAPI;
