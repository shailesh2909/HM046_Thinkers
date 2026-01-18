import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBell,
  FaUser,
  FaBriefcase,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaStar,
  FaChartLine
} from 'react-icons/fa';
import { freelancerProjectAPI, companyProjectAPI } from '../../api/projectAPI';
import { applicationAPI } from '../../api/applicationAPI';

const Dashboard = ({ userType = 'freelancer', userName = 'User' }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to HackMatrix!", time: "Just now", unread: true },
    { id: 2, text: "Complete your profile to get better matches", time: "1h ago", unread: false }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        if (userType === 'company') {
          // Fetch company projects and applications
          const [projectsResponse, applicationsResponse] = await Promise.all([
            companyProjectAPI.getProjects(userId),
            applicationAPI.getCompanyApplications()
          ]);
          setProjects(projectsResponse.data || []);
          setApplications(applicationsResponse.data || []);
        } else {
          // Fetch freelancer projects and applications
          const [projectsResponse] = await Promise.all([
            freelancerProjectAPI.getProjects(userId)
          ]);
          setProjects(projectsResponse.data || []);
          // For freelancers, applications would be fetched from a different endpoint
          setApplications([]);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, [userType]);

  // Filter applications based on status
  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status.toLowerCase().includes(filterStatus.toLowerCase()));

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Dashboard Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-base text-gray-600 mt-3">
            Welcome back, {userName}! Here's what's happening today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-linear-to-br from-gray-800 to-black rounded-full flex items-center justify-center mb-6 shadow-lg ring-4 ring-gray-200">
                  <FaUser className="text-5xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {userName}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  {userType === 'freelancer' ? 'Full Stack Developer' : 'Technology Company'}
                </p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                  View Profile
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-2 mb-5">
                <FaChartLine className="text-gray-900 text-lg" />
                <h4 className="text-base font-bold text-gray-900">Overview</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 border border-gray-200 hover:border-gray-900 cursor-pointer transition-all">
                  <span className="text-sm text-gray-700 font-medium">
                    {userType === 'freelancer' ? 'Applications' : 'Posted Projects'}
                  </span>
                  <span className="text-lg font-bold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 border border-gray-200 hover:border-gray-900 cursor-pointer transition-all">
                  <span className="text-sm text-gray-700 font-medium">
                    {userType === 'freelancer' ? 'Completed' : 'Active'}
                  </span>
                  <span className="text-lg font-bold text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 border border-gray-200">
                  <span className="text-sm text-gray-700 font-medium">Success Rate</span>
                  <span className="text-lg font-bold text-gray-900">92%</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 text-white border border-gray-900">
                    <span className="text-sm font-medium">Rating</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">4.8</span>
                      <FaStar className="text-white text-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Applications/Projects */}
          <div className={`transition-all duration-300 ${notificationsOpen ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {userType === 'freelancer' ? 'Recent Applications' : 'Active Projects'}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">Track your progress</p>
                </div>
                {userType === 'company' && (
                  <button 
                    onClick={() => {
                      navigate('/create-project');
                      console.log('Create new project');
                    }}
                    className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                    <FaPlus className="text-sm" />
                    <span>Create Project</span>
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="px-6 pt-4 pb-2 flex gap-2 border-b border-gray-200">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('shortlisted')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === 'shortlisted'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Shortlisted
                </button>
                <button
                  onClick={() => setFilterStatus('review')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === 'review'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Under Review
                </button>
              </div>

              <div className="p-6 space-y-4">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                      <div 
                      key={app.id} 
                      onClick={() => {
                        navigate(`/application/${app.id}`);
                        console.log('Clicked application:', app);
                      }}
                      className="border-2 border-gray-200 rounded-xl p-5 hover:border-black hover:shadow-lg transition-all duration-300 group bg-white cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-black transition-colors">{app.title}</h3>
                          <p className="text-sm text-gray-600 font-medium">{app.company}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ml-3 shadow-sm ${
                          app.status === 'Shortlisted' 
                            ? 'bg-black text-white'
                            : app.status === 'Under Review'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}>
                          {app.status === 'Shortlisted' && <FaCheckCircle className="inline mr-1.5 text-sm" />}
                          {app.status === 'Under Review' && <FaClock className="inline mr-1.5 text-sm" />}
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Applied {app.appliedDate}</span>
                          <span className="font-bold text-gray-900 text-base">{app.budget}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/project-details/${app.id}`);
                          }}
                          className="flex items-center space-x-2 text-gray-900 hover:text-black text-sm font-bold group-hover:underline px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                          <FaEye />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No applications found</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button className="w-full text-gray-900 hover:text-black font-bold py-3 text-sm hover:bg-gray-100 rounded-xl transition-all">
                  View All {userType === 'freelancer' ? 'Applications' : 'Projects'} →
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Notifications */}
          {notificationsOpen ? (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl sticky top-6 transition-all duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                  <div className="flex items-center space-x-2">
                    <FaBell className="text-gray-900 text-base" />
                    <h3 className="text-base font-bold text-gray-900">Notifications</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">2</span>
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="text-gray-600 hover:text-gray-900 transition-all text-lg"
                    >
                      {notificationsOpen ? '−' : '+'}
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer border ${
                        notification.unread ? 'bg-gray-50 border-gray-200' : 'border-transparent'
                      }`}>
                      <div className="flex items-start space-x-3">
                        {notification.unread && (
                          <div className="w-2.5 h-2.5 bg-black rounded-full mt-1.5 shrink-0 shadow-sm"></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-relaxed ${notification.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                            {notification.text}
                          </p>
                          <span className="text-xs text-gray-400 mt-1.5 block">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <button className="w-full text-gray-900 hover:text-black font-bold text-sm hover:bg-gray-100 py-3 rounded-xl transition-all">
                    View All →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Collapsed Notification Widget at bottom
            <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8">
              <button
                onClick={() => setNotificationsOpen(true)}
                className="bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg p-4 flex items-center justify-center transition-all duration-300 relative"
              >
                <FaBell className="text-gray-900 text-xl" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">2</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
