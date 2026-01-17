import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBriefcase, FaUsers, FaCoins, FaCheckCircle, FaClock, FaUser, FaCalendar, FaTrophy } from 'react-icons/fa';

const ProjectDetails = ({ userType }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Sample project details with milestones
  const [projectDetails] = useState({
    id: projectId || 1,
    name: 'E-Commerce Website Development',
    company: 'Tech Innovations Inc',
    companyLogo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techinnovations',
    description: 'Build a full-stack e-commerce website with React, Node.js, MongoDB, and payment integration. The site needs to support product catalog, shopping cart, user authentication, and payment processing.',
    status: 'In Progress',
    budget: '$5000',
    totalTokens: 5000,
    currency: 'USD',
    startDate: '2024-01-05',
    endDate: '2024-02-05',
    createdAt: '2024-01-05',
    workersCount: 2,
    proposalsCount: 15,
    acceptedProposals: 2,
    skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Stripe', 'Express.js'],
    milestones: [
      {
        id: 1,
        name: 'Setup & Planning',
        description: 'Project setup, architecture design, and database schema planning',
        tokenAllocation: 500,
        status: 'Completed',
        completionDate: '2024-01-10',
        assignedTo: 'Alex Johnson',
        assignedAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        workersOnThisPhase: 1
      },
      {
        id: 2,
        name: 'Frontend Development',
        description: 'Build React components, pages, and integrate with backend APIs',
        tokenAllocation: 1500,
        status: 'In Progress',
        completionDate: null,
        assignedTo: 'Sarah Williams & Mike Chen',
        assignedAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        progress: 65,
        workersOnThisPhase: 2
      },
      {
        id: 3,
        name: 'Backend Development',
        description: 'Create API endpoints, authentication, and database integration',
        tokenAllocation: 1500,
        status: 'In Progress',
        completionDate: null,
        assignedTo: 'Mike Chen',
        assignedAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        progress: 50,
        workersOnThisPhase: 1
      },
      {
        id: 4,
        name: 'Payment Integration & Testing',
        description: 'Integrate Stripe payment gateway, testing, and optimization',
        tokenAllocation: 1000,
        status: 'Pending',
        completionDate: null,
        assignedTo: 'Not Assigned',
        assignedAvatar: null,
        progress: 0,
        workersOnThisPhase: 0
      },
      {
        id: 5,
        name: 'Deployment & Documentation',
        description: 'Deploy to production and create project documentation',
        tokenAllocation: 500,
        status: 'Pending',
        completionDate: null,
        assignedTo: 'Not Assigned',
        assignedAvatar: null,
        progress: 0,
        workersOnThisPhase: 0
      }
    ],
    teamMembers: [
      {
        id: 1,
        name: 'Alex Johnson',
        role: 'Full Stack Developer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        status: 'Active',
        earnings: 500,
        completedMilestones: 1
      },
      {
        id: 2,
        name: 'Sarah Williams',
        role: 'Frontend Developer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        status: 'Active',
        earnings: 975,
        completedMilestones: 0
      },
      {
        id: 3,
        name: 'Mike Chen',
        role: 'Backend Developer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        status: 'Active',
        earnings: 750,
        completedMilestones: 0
      }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Pending':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTotalEarnings = () => {
    return projectDetails.teamMembers.reduce((sum, member) => sum + member.earnings, 0);
  };

  const getCompletedTokens = () => {
    return projectDetails.milestones
      .filter(m => m.status === 'Completed')
      .reduce((sum, m) => sum + m.tokenAllocation, 0);
  };

  const getInProgressTokens = () => {
    return projectDetails.milestones
      .filter(m => m.status === 'In Progress')
      .reduce((sum, m) => sum + m.tokenAllocation, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-900 hover:text-gray-600 mb-8 font-medium transition-all"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex gap-6 items-start flex-1">
              <img
                src={projectDetails.companyLogo}
                alt={projectDetails.company}
                className="w-20 h-20 rounded-lg border-2 border-gray-200"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{projectDetails.name}</h1>
                <p className="text-lg text-gray-600 mb-3">{projectDetails.company}</p>
                <p className="text-gray-700 leading-relaxed mb-4">{projectDetails.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-4 py-2 rounded-lg font-semibold border ${getStatusColor(projectDetails.status)}`}>
                {projectDetails.status}
              </span>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaCoins className="text-yellow-500 text-xl" />
              <p className="text-sm text-gray-600">Total Budget</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{projectDetails.currency} {projectDetails.budget.substring(1)}</p>
            <p className="text-xs text-gray-500 mt-1">{projectDetails.totalTokens} Tokens</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaUsers className="text-blue-500 text-xl" />
              <p className="text-sm text-gray-600">Team Members</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{projectDetails.workersCount}</p>
            <p className="text-xs text-gray-500 mt-1">Active Workers</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaBriefcase className="text-purple-500 text-xl" />
              <p className="text-sm text-gray-600">Proposals</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{projectDetails.proposalsCount}</p>
            <p className="text-xs text-gray-500 mt-1">{projectDetails.acceptedProposals} Accepted</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <FaTrophy className="text-orange-500 text-xl" />
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">${getTotalEarnings()}</p>
            <p className="text-xs text-gray-500 mt-1">To Team</p>
          </div>
        </div>

        {/* Token Distribution Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Token Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Allocated Tokens</p>
              <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FaCoins className="text-yellow-500" />
                {projectDetails.totalTokens}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Completed Tokens</p>
              <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                {getCompletedTokens()}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">In Progress Tokens</p>
              <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                <FaClock className="text-blue-500" />
                {getInProgressTokens()}
              </div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-900">Project Completion</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round((getCompletedTokens() / projectDetails.totalTokens) * 100)}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-linear-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all"
                style={{ width: `${(getCompletedTokens() / projectDetails.totalTokens) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Milestones</h2>
          <div className="space-y-4">
            {projectDetails.milestones.map((milestone, index) => (
              <div key={milestone.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                        Milestone {index + 1}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.name}</h3>
                    <p className="text-gray-600 mb-4">{milestone.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <FaCoins className="text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900">{milestone.tokenAllocation}</span>
                    </div>
                    <p className="text-xs text-gray-500">Tokens</p>
                  </div>
                </div>

                {/* Milestone Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Assigned To</p>
                    <p className="text-sm font-semibold text-gray-900">{milestone.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Workers</p>
                    <p className="text-sm font-semibold text-gray-900">{milestone.workersOnThisPhase}</p>
                  </div>
                  {milestone.completionDate && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Completed</p>
                      <p className="text-sm font-semibold text-green-600">{new Date(milestone.completionDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {milestone.progress !== undefined && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Progress</p>
                      <p className="text-sm font-semibold text-blue-600">{milestone.progress}%</p>
                    </div>
                  )}
                </div>

                {/* Progress Bar for In Progress milestones */}
                {milestone.status === 'In Progress' && milestone.progress !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-semibold text-gray-600">Completion Status</p>
                      <p className="text-xs font-semibold text-gray-900">{milestone.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(milestone.progress)}`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectDetails.teamMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Earnings</span>
                    <span className="text-sm font-bold text-gray-900">${member.earnings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="text-sm font-bold text-gray-900">{member.completedMilestones} Milestone</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
