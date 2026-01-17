import apiClient from './axiosConfig';

// Payment & Contract APIs
export const contractAPI = {
  // Create contract after bid acceptance
  createContract: async (contractData) => {
    try {
      const response = await apiClient.post('/contracts', {
        bidId: contractData.bidId,
        projectId: contractData.projectId,
        freelancerId: contractData.freelancerId,
        companyId: contractData.companyId,
        amount: contractData.amount,
        startDate: contractData.startDate,
        endDate: contractData.endDate,
        terms: contractData.terms,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get contract details
  getContractById: async (contractId) => {
    try {
      const response = await apiClient.get(`/contracts/${contractId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's contracts
  getUserContracts: async () => {
    try {
      const response = await apiClient.get('/contracts/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update contract
  updateContract: async (contractId, contractData) => {
    try {
      const response = await apiClient.put(`/contracts/${contractId}`, contractData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Complete contract
  completeContract: async (contractId) => {
    try {
      const response = await apiClient.put(`/contracts/${contractId}/complete`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel contract
  cancelContract: async (contractId, reason) => {
    try {
      const response = await apiClient.put(`/contracts/${contractId}/cancel`, {
        reason,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Milestone Payment APIs
export const milestonePaymentAPI = {
  // Create milestone payment
  createPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments/milestones', {
        milestone_id: paymentData.milestoneId,
        freelancer_auth_id: paymentData.freelancerAuthId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'INR',
        payment_status: paymentData.paymentStatus || 'pending', // pending / released / failed
        transaction_reference: paymentData.transactionReference,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get milestone payments
  getMilestonePayments: async (milestoneId) => {
    try {
      const response = await apiClient.get(`/payments/milestones/${milestoneId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get payment by ID
  getPaymentById: async (paymentId) => {
    try {
      const response = await apiClient.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Release payment (after milestone approval)
  releasePayment: async (paymentId, transactionReference) => {
    try {
      const response = await apiClient.put(`/payments/${paymentId}/release`, {
        payment_status: 'released',
        transaction_reference: transactionReference,
        paid_at: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get freelancer payments
  getFreelancerPayments: async (freelancerAuthId) => {
    try {
      const response = await apiClient.get(`/payments/freelancer/${freelancerAuthId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get company payments
  getCompanyPayments: async () => {
    try {
      const response = await apiClient.get('/payments/company');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update payment status
  updatePaymentStatus: async (paymentId, status) => {
    try {
      const response = await apiClient.patch(`/payments/${paymentId}/status`, {
        payment_status: status, // pending / released / failed
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Payment APIs (General)
export const paymentAPI = {
  // Process payment
  processPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/payments', {
        contractId: paymentData.contractId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        cardDetails: paymentData.cardDetails,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get payment history
  getPaymentHistory: async (pagination = {}) => {
    try {
      const response = await apiClient.get('/payments/history', {
        params: pagination,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get payment details
  getPaymentById: async (paymentId) => {
    try {
      const response = await apiClient.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Refund payment
  refundPayment: async (paymentId, reason) => {
    try {
      const response = await apiClient.post(`/payments/${paymentId}/refund`, {
        reason,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get wallet balance
  getWalletBalance: async () => {
    try {
      const response = await apiClient.get('/payments/wallet/balance');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Withdraw from wallet
  withdrawFromWallet: async (withdrawalData) => {
    try {
      const response = await apiClient.post('/payments/wallet/withdraw', {
        amount: withdrawalData.amount,
        bankAccount: withdrawalData.bankAccount,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default { contractAPI, milestonePaymentAPI, paymentAPI };
