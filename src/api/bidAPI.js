import apiClient from './axiosConfig';

// Bid/Proposal APIs
export const bidAPI = {
  // Submit bid/proposal for a project
  submitBid: async (bidData) => {
    try {
      const response = await apiClient.post('/bids', {
        projectId: bidData.projectId,
        freelancerId: bidData.freelancerId,
        bidAmount: bidData.bidAmount,
        coverLetter: bidData.coverLetter,
        estimatedDays: bidData.estimatedDays,
        attachments: bidData.attachments,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all bids for a project (company only)
  getProjectBids: async (projectId) => {
    try {
      const response = await apiClient.get(`/bids/project/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get freelancer's bids
  getFreelancerBids: async (freelancerId) => {
    try {
      const response = await apiClient.get(`/bids/freelancer/${freelancerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single bid
  getBidById: async (bidId) => {
    try {
      const response = await apiClient.get(`/bids/${bidId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Accept bid (company only)
  acceptBid: async (bidId) => {
    try {
      const response = await apiClient.put(`/bids/${bidId}/accept`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reject bid (company only)
  rejectBid: async (bidId) => {
    try {
      const response = await apiClient.put(`/bids/${bidId}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update bid (freelancer only)
  updateBid: async (bidId, bidData) => {
    try {
      const response = await apiClient.put(`/bids/${bidId}`, bidData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Withdraw bid (freelancer only)
  withdrawBid: async (bidId) => {
    try {
      const response = await apiClient.delete(`/bids/${bidId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default bidAPI;
