import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaCheckCircle, FaClock as FaClockReview, FaStar, FaEye, FaTimes } from 'react-icons/fa';
import { applicationAPI } from '../../api/applicationAPI';

 const Applications = ({ userType = 'freelancer', userName = 'User' }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        let data;
        if (userType === 'company') {
          data = await applicationAPI.getCompanyApplications();
        } else {
          data = await applicationAPI.getMyApplications();
        }
        setApplications(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch applications');
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userType]);

  const normalizeApplicationData = (application) => {
    if (userType === 'company') {
      return {
        id: application.id,
        projectTitle: application.CompanyProject?.projectName || 'Unknown Project',
        companyName: application.User?.email || 'Unknown User',
        appliedDate: application.createdAt,
        status: 'Under Review', // Default status since we don't have status field yet
        budget: `$${application.CompanyProject?.totalBudget || 'N/A'}`,
        level: 'Intermediate', // Default level
        image: 'https://api.dicebear.com/7.x/initials/svg?seed=' + (application.User?.email || 'U'),
        coverLetter: application.coverLetter,
        resumeName: application.Resume?.resume_name,
        resumeId: application.resumeId
      };
    } else {
      return {
        id: application.id,
        projectTitle: application.CompanyProject?.projectName || 'Unknown Project',
        companyName: 'Company', // We don't have company name in freelancer view
        appliedDate: application.createdAt,
        status: 'Under Review', // Default status
        budget: `$${application.CompanyProject?.totalBudget || 'N/A'}`,
        level: 'Intermediate', // Default level
        image: 'https://api.dicebear.com/7.x/initials/svg?seed=C',
        coverLetter: application.coverLetter,
        resumeName: application.Resume?.resume_name,
        resumeId: application.resumeId
      };
    }
  };

  const normalizedApplications = applications.map(normalizeApplicationData);

  const filteredApplications = normalizedApplications.filter(app => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') return app.status === 'Under Review';
    if (selectedFilter === 'shortlisted') return app.status === 'Shortlisted';
    if (selectedFilter === 'accepted') return app.status === 'Accepted';
    if (selectedFilter === 'rejected') return app.status === 'Rejected';
    return true;
  });

  const stats = {
    total: normalizedApplications.length,
    recent: normalizedApplications.filter(a => a.status === 'Under Review').length,
    shortlisted: normalizedApplications.filter(a => a.status === 'Shortlisted').length,
    accepted: normalizedApplications.filter(a => a.status === 'Accepted').length,
    rejected: normalizedApplications.filter(a => a.status === 'Rejected').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Review':
        return <FaClock className="text-blue-600" />;
      case 'Shortlisted':
        return <FaStar className="text-purple-600" />;
      case 'Accepted':
        return <FaCheckCircle className="text-green-600" />;
      case 'Rejected':
        return <FaTimes className="text-red-600" />;
      default:
        return null;
    }
  };

  const handleDeleteApplication = (id) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications(applications.filter(app => app.id !== id));
      setExpandedApp(null);
    }
  };

  const handleViewDetails = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {userType === 'company' ? 'Project Applications' : 'My Applications'}
          </h1>
          <p className="text-gray-600">
            {userType === 'company' 
              ? 'Review and manage applications for your projects' 
              : 'Track your project applications and their status'
            }
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading applications...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <p className="text-red-800 font-medium">Error loading applications</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && (
        <>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600 mt-1">Total</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.recent}</p>
              <p className="text-xs text-gray-600 mt-1">Under Review</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-purple-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.shortlisted}</p>
              <p className="text-xs text-gray-600 mt-1">Shortlisted</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-green-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
              <p className="text-xs text-gray-600 mt-1">Accepted</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-red-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-xs text-gray-600 mt-1">Rejected</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setSelectedFilter('recent')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'recent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              Under Review ({stats.recent})
            </button>
            <button
              onClick={() => setSelectedFilter('shortlisted')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'shortlisted'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              Shortlisted ({stats.shortlisted})
            </button>
            <button
              onClick={() => setSelectedFilter('accepted')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'accepted'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
            >
              Accepted ({stats.accepted})
            </button>
            <button
              onClick={() => setSelectedFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                {/* Application Card */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex gap-4 flex-1">
                      <img
                        src={application.image}
                        alt={application.companyName}
                        className="w-16 h-16 rounded-xl border-2 border-gray-200 shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{application.companyName}</p>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {application.projectTitle}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FaBriefcase className="text-gray-500" />
                            <span>{application.level}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock className="text-gray-500" />
                            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span>{application.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Content - Status and Actions */}
                    <div className="flex flex-col gap-3 md:items-end">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="font-semibold text-sm">{application.status}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(application.id)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-500 transition-all text-sm font-medium"
                      >
                        <FaEye />
                        {expandedApp === application.id ? 'Hide' : 'Details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedApp === application.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Your Cover Letter</h4>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {application.coverLetter}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Application Timeline</h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Applied</p>
                                <p className="text-xs text-gray-500">{new Date(application.appliedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${
                                application.status !== 'Under Review' ? 'bg-blue-500' : 'bg-gray-300'
                              }`}></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Under Review</p>
                                <p className="text-xs text-gray-500">{application.status !== 'Under Review' ? 'Completed' : 'In progress'}</p>
                              </div>
                            </div>
                            {application.status !== 'Under Review' && (
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{application.status}</p>
                                  <p className="text-xs text-gray-500">Final status</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                        <button className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all">
                          Message Company
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(application.id)}
                          className="flex-1 px-4 py-2 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all"
                        >
                          Withdraw Application
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
              <FaBriefcase className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No applications found</p>
              <p className="text-gray-500 text-sm mt-2">
                {userType === 'company' 
                  ? 'No one has applied to your projects yet' 
                  : 'Start applying to projects to see them here'
                }
              </p>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Applications;
