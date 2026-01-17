import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaClock, FaComment, FaBriefcase, FaStar, FaTrash, FaCheck } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application_status',
      title: 'Application Status Updated',
      message: 'TechCorp Solutions has moved your application to shortlist',
      project: 'E-Commerce Website Development',
      time: '10 minutes ago',
      read: false,
      icon: FaCheckCircle,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 2,
      type: 'new_message',
      title: 'New Message',
      message: 'DesignHub Inc: Can you start next week?',
      project: 'Mobile App UI/UX Design',
      time: '1 hour ago',
      read: false,
      icon: FaComment,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      type: 'project_accepted',
      title: 'Project Accepted!',
      message: 'Congratulations! Your application for AWS Cloud Architecture Setup has been accepted.',
      project: 'AWS Cloud Architecture Setup',
      time: '3 hours ago',
      read: false,
      icon: FaCheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      type: 'application_status',
      title: 'Application Status Updated',
      message: 'DataViz Analytics has updated your application status',
      project: 'Dashboard Development',
      time: '1 day ago',
      read: true,
      icon: FaClock,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      type: 'recommendation',
      title: 'New Project Recommendation',
      message: 'We found a project matching your skills: React Developer Needed',
      project: 'React Developer Needed',
      time: '2 days ago',
      read: true,
      icon: FaStar,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 6,
      type: 'new_message',
      title: 'New Message',
      message: 'CloudFirst Technologies: Project details attached',
      project: 'AWS Cloud Architecture Setup',
      time: '2 days ago',
      read: true,
      icon: FaComment,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 7,
      type: 'application_status',
      title: 'Application Rejected',
      message: 'Your application for Security Audit & Testing has been declined',
      project: 'Security Audit & Testing',
      time: '3 days ago',
      read: true,
      icon: FaClock,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 8,
      type: 'system',
      title: 'Profile Incomplete',
      message: 'Complete your profile to get more project recommendations',
      project: 'Profile Update',
      time: '1 week ago',
      read: true,
      icon: FaBriefcase,
      color: 'bg-gray-100 text-gray-600'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  let filteredNotifications = notifications;

  if (filter !== 'all') {
    filteredNotifications = notifications.filter(notif => notif.type === filter);
  }

  if (sortBy === 'unread') {
    filteredNotifications = [...filteredNotifications].sort((a, b) => a.read - b.read);
  }

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getTypeLabel = (type) => {
    switch (type) {
      case 'application_status':
        return 'Application';
      case 'new_message':
        return 'Message';
      case 'project_accepted':
        return 'Project';
      case 'recommendation':
        return 'Recommendation';
      case 'system':
        return 'System';
      default:
        return 'Notification';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filter and Sort */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Type</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Notifications</option>
                <option value="application_status">Application Updates</option>
                <option value="new_message">Messages</option>
                <option value="project_accepted">Projects</option>
                <option value="recommendation">Recommendations</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="latest">Latest First</option>
                <option value="unread">Unread First</option>
              </select>
            </div>
            {notifications.length > 0 && (
              <div className="flex items-end">
                <button
                  onClick={handleClearAll}
                  className="w-full sm:w-auto px-4 py-2 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl border-2 p-4 shadow-sm hover:shadow-md transition-all ${
                    notification.read ? 'border-gray-200' : 'border-gray-900 bg-blue-50'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`${notification.color} rounded-full p-3 shrink-0 h-fit`}>
                      <IconComponent className="text-lg" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-gray-900 rounded-full shrink-0 mt-2"></div>
                        )}
                      </div>

                      {/* Project and Time */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full ${notification.color}`}>
                            {getTypeLabel(notification.type)}
                          </span>
                          <span>{notification.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-600 hover:text-gray-900"
                              title="Mark as read"
                            >
                              <FaCheck className="text-sm" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-all text-gray-600 hover:text-red-600"
                            title="Delete"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
              <FaBell className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No notifications yet</p>
              <p className="text-gray-500 text-sm mt-2">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Empty State for Filters */}
        {filteredNotifications.length === 0 && notifications.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">No notifications match your filter.</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
