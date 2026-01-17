import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaUsers, FaEye, FaEdit, FaTrash, FaCheckCircle, FaPlus } from 'react-icons/fa';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Website Development',
      description: 'Build a full-stack e-commerce website with React and Node.js',
      budget: '$2000-$5000',
      duration: '30 days',
      status: 'Active',
      applicants: 12,
      hired: 1,
      skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      postedDate: '2024-01-05',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=EC'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Design a modern mobile application interface',
      budget: '$1500-$3000',
      duration: '20 days',
      status: 'Active',
      applicants: 8,
      hired: 1,
      skills: ['Figma', 'UI Design', 'UX Research'],
      postedDate: '2024-01-10',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=MA'
    },
    {
      id: 3,
      title: 'AWS Cloud Architecture Setup',
      description: 'Setup and configure AWS infrastructure for scalable microservices',
      budget: '$3000-$7000',
      duration: '45 days',
      status: 'Closed',
      applicants: 5,
      hired: 1,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      postedDate: '2023-12-15',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=AW'
    },
    {
      id: 4,
      title: 'Dashboard Development',
      description: 'Create interactive data visualization dashboards',
      budget: '$1800-$3500',
      duration: '25 days',
      status: 'Active',
      applicants: 15,
      hired: 0,
      skills: ['React', 'D3.js', 'Chart.js'],
      postedDate: '2024-01-12',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=DD'
    },
    {
      id: 5,
      title: 'Blog Platform Development',
      description: 'Build a feature-rich blogging platform with CMS',
      budget: '$1200-$2500',
      duration: '40 days',
      status: 'Active',
      applicants: 20,
      hired: 1,
      skills: ['React', 'Express.js', 'PostgreSQL'],
      postedDate: '2024-01-08',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=BP'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'all') return true;
    return project.status.toLowerCase() === selectedFilter;
  });

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    closed: projects.filter(p => p.status === 'Closed').length,
    totalApplicants: projects.reduce((sum, p) => sum + p.applicants, 0),
    totalHired: projects.reduce((sum, p) => sum + p.hired, 0)
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Projects</h1>
            <p className="text-gray-600">Manage and track your posted projects</p>
          </div>
          <button 
            onClick={() => navigate('/create-project')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center gap-2"
          >
            <FaPlus /> Post Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600 mt-1">Total Projects</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-green-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-gray-600 mt-1">Active</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
              <p className="text-xs text-gray-600 mt-1">Closed</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalApplicants}</p>
              <p className="text-xs text-gray-600 mt-1">Applicants</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-purple-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.totalHired}</p>
              <p className="text-xs text-gray-600 mt-1">Hired</p>
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
              onClick={() => setSelectedFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setSelectedFilter('closed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'closed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Closed ({stats.closed})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)} shrink-0 ml-2`}>
                  {project.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold text-sm">{project.budget}</span>
                  <span className="text-xs text-gray-500">Budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-500 text-sm" />
                  <span className="text-xs text-gray-500">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gray-500 text-sm" />
                  <span className="text-xs text-gray-500">{project.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600 text-sm" />
                  <span className="text-xs text-gray-500">{project.hired} hired</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-sm flex items-center justify-center gap-2">
                  <FaEye className="text-sm" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center justify-center gap-2">
                  <FaEdit className="text-sm" />
                  Edit
                </button>
                <button className="px-3 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all text-sm">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
