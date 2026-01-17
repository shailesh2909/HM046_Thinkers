import apiClient from './axiosConfig';

// Messaging APIs
export const messageAPI = {
  // Get all conversations
  getConversations: async (pagination = {}) => {
    try {
      const response = await apiClient.get('/messages/conversations', {
        params: pagination,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get messages in a conversation
  getMessages: async (conversationId, pagination = {}) => {
    try {
      const response = await apiClient.get(`/messages/conversations/${conversationId}`, {
        params: pagination,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Send message
  sendMessage: async (conversationId, messageData) => {
    try {
      const response = await apiClient.post(`/messages/conversations/${conversationId}`, {
        content: messageData.content,
        attachments: messageData.attachments,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new conversation
  startConversation: async (userId) => {
    try {
      const response = await apiClient.post('/messages/conversations', {
        userId,
      });
      return response.data;
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
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const response = await apiClient.delete(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search messages
  searchMessages: async (conversationId, searchTerm) => {
    try {
      const response = await apiClient.get(
        `/messages/conversations/${conversationId}/search`,
        { params: { q: searchTerm } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default messageAPI;
