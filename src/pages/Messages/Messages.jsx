import React, { useState } from 'react';
import { FaPaperPlane, FaSearch, FaEllipsisV, FaPhone, FaVideo } from 'react-icons/fa';

const Messages = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      companyAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TC',
      lastMessage: 'Thanks for your application!',
      lastMessageTime: '2024-01-15 10:30',
      unread: 2,
      projectTitle: 'E-Commerce Website Development',
      status: 'Under Review',
      messages: [
        { id: 1, sender: 'company', text: 'Hi, thank you for applying!', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Thank you! I\'m excited about this project.', time: '10:05 AM' },
        { id: 3, sender: 'company', text: 'We have reviewed your profile. Looks good!', time: '10:25 AM' },
        { id: 4, sender: 'company', text: 'Thanks for your application!', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      companyName: 'DesignHub Inc',
      companyAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DH',
      lastMessage: 'Can you start next week?',
      lastMessageTime: '2024-01-14 14:15',
      unread: 0,
      projectTitle: 'Mobile App UI/UX Design',
      status: 'Shortlisted',
      messages: [
        { id: 1, sender: 'company', text: 'Your portfolio looks amazing!', time: '2:00 PM' },
        { id: 2, sender: 'me', text: 'Thank you! I loved your design brief.', time: '2:10 PM' },
        { id: 3, sender: 'company', text: 'Can you start next week?', time: '2:15 PM' }
      ]
    },
    {
      id: 3,
      companyName: 'CloudFirst Technologies',
      companyAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CF',
      lastMessage: 'Looking forward to working with you',
      lastMessageTime: '2024-01-12 09:45',
      unread: 0,
      projectTitle: 'AWS Cloud Architecture Setup',
      status: 'Accepted',
      messages: [
        { id: 1, sender: 'company', text: 'Congratulations! You\'re selected for the project.', time: '9:30 AM' },
        { id: 2, sender: 'me', text: 'Thank you so much! I\'m ready to start.', time: '9:35 AM' },
        { id: 3, sender: 'company', text: 'Looking forward to working with you', time: '9:45 AM' }
      ]
    },
    {
      id: 4,
      companyName: 'DataViz Analytics',
      companyAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DA',
      lastMessage: 'Thank you for applying',
      lastMessageTime: '2024-01-10 11:20',
      unread: 0,
      projectTitle: 'Dashboard Development',
      status: 'Rejected',
      messages: [
        { id: 1, sender: 'company', text: 'Thank you for your interest.', time: '11:10 AM' },
        { id: 2, sender: 'company', text: 'Thank you for applying', time: '11:20 AM' }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedConversations, setUpdatedConversations] = useState(conversations);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: selectedConversation.messages.length + 1,
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConv = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageInput,
      lastMessageTime: new Date().toLocaleString()
    };

    setSelectedConversation(updatedConv);
    setUpdatedConversations(
      updatedConversations.map(conv => (conv.id === updatedConv.id ? updatedConv : conv))
    );
    setMessageInput('');
  };

  const filteredConversations = updatedConversations.filter(conv =>
    conv.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto h-screen flex flex-col lg:flex-row">
        {/* Conversations List */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-all text-left ${
                    selectedConversation.id === conv.id ? 'bg-gray-100 border-l-4 border-l-gray-900' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={conv.companyAvatar}
                      alt={conv.companyName}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{conv.companyName}</h3>
                        <span className="text-xs text-gray-500 shrink-0">{conv.lastMessageTime.split(' ')[1]}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeColor(conv.status)}`}>
                          {conv.status}
                        </span>
                        {conv.unread > 0 && (
                          <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden lg:flex flex-1 flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedConversation.companyAvatar}
                    alt={selectedConversation.companyName}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedConversation.companyName}</h2>
                    <p className="text-sm text-gray-500">{selectedConversation.projectTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
                    <FaPhone />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
                    <FaVideo />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-gray-900 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>

        {/* Mobile Chat View */}
        <div className="lg:hidden flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.companyAvatar}
                    alt={selectedConversation.companyName}
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{selectedConversation.companyName}</h2>
                    <p className="text-xs text-gray-500">{selectedConversation.projectTitle}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                        msg.sender === 'me'
                          ? 'bg-gray-900 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-0.5 ${msg.sender === 'me' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Messages;
