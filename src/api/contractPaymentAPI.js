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

// Payment APIs
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

export default { contractAPI, paymentAPI };
