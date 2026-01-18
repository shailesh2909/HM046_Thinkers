import apiClient from './axiosConfig';

// Messaging APIs
export const messageAPI = {
  // Get chat history with another user
  getChatHistory: async (otherUserId) => {
    try {
      const response = await apiClient.get(`/chat/history/${otherUserId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Send message (this would typically be done via Socket.IO)
  sendMessage: async (receiverId, content) => {
    try {
      // This endpoint might not exist, as messages are sent via Socket.IO
      const response = await apiClient.post('/chat/send', {
        receiverId,
        content
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      const response = await apiClient.put(`/messages/${messageId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default messageAPI;
