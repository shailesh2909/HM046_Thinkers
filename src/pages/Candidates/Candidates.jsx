import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaBriefcase, FaMapMarkerAlt, FaCheckCircle, FaTimes, FaPhone, FaEnvelope, FaEye } from 'react-icons/fa';

const Candidates = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Full Stack Developer',
      rating: 4.8,
      reviews: 156,
      hourlyRate: '$45-$60',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      bio: 'Experienced full-stack developer with 5+ years in React, Node.js, and MongoDB',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      appliedProject: 'E-Commerce Website Development',
      appliedDate: '2024-01-15',
      status: 'Under Review'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      title: 'UI/UX Designer',
      rating: 4.9,
      reviews: 203,
      hourlyRate: '$50-$75',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      bio: 'Creative designer specializing in mobile and web interfaces',
      skills: ['Figma', 'UI Design', 'Prototyping', 'Illustrator'],
      appliedProject: 'Mobile App UI/UX Design',
      appliedDate: '2024-01-14',
      status: 'Shortlisted'
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'DevOps Engineer',
      rating: 4.7,
      reviews: 89,
      hourlyRate: '$55-$80',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      bio: 'AWS certified DevOps engineer with expertise in Kubernetes and Docker',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      appliedProject: 'AWS Cloud Architecture Setup',
      appliedDate: '2024-01-10',
      status: 'Hired'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      title: 'Frontend Developer',
      rating: 4.6,
      reviews: 134,
      hourlyRate: '$35-$50',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      bio: 'Passionate about creating beautiful, responsive web applications',
      skills: ['React', 'Vue.js', 'Tailwind CSS', 'JavaScript'],
      appliedProject: 'Dashboard Development',
      appliedDate: '2024-01-12',
      status: 'Under Review'
    },
    {
      id: 5,
      name: 'David Park',
      title: 'Full Stack Developer',
      rating: 4.5,
      reviews: 112,
      hourlyRate: '$40-$60',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      bio: 'Versatile developer with strong portfolio in e-commerce projects',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
      appliedProject: 'Blog Platform Development',
      appliedDate: '2024-01-08',
      status: 'Shortlisted'
    },
    {
      id: 6,
      name: 'Jessica Smith',
      title: 'Product Designer',
      rating: 4.8,
      reviews: 167,
      hourlyRate: '$60-$85',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica',
      bio: 'Product-focused designer with experience in SaaS and mobile apps',
      skills: ['Figma', 'UX Research', 'Prototyping', 'Design Thinking'],
      appliedProject: 'Mobile App UI/UX Design',
      appliedDate: '2024-01-13',
      status: 'Under Review'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(candidate => {
    if (selectedFilter === 'all') return true;
    return candidate.status.toLowerCase().replace(' ', '-') === selectedFilter;
  });

  const stats = {
    total: candidates.length,
    underReview: candidates.filter(c => c.status === 'Under Review').length,
    shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
    hired: candidates.filter(c => c.status === 'Hired').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Hired':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setCandidates(
      candidates.map(candidate =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Candidates</h1>
          <p className="text-gray-600">Review and manage freelancers who applied to your projects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600 mt-1">Total</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.underReview}</p>
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
              <p className="text-3xl font-bold text-green-600">{stats.hired}</p>
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
              onClick={() => setSelectedFilter('under-review')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'under-review'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              Under Review ({stats.underReview})
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
              onClick={() => setSelectedFilter('hired')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'hired'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              }`}
            >
              Hired ({stats.hired})
            </button>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all overflow-hidden">
                {/* Main Info */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Avatar and Basic Info */}
                    <div className="flex gap-4 flex-1">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-200 shrink-0 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => navigate(`/view-profile/${candidate.id}/freelancer`)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{candidate.title}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" />
                            <span className="font-semibold">{candidate.rating}</span>
                            <span className="text-xs">({candidate.reviews} reviews)</span>
                          </div>
                          <span>•</span>
                          <span>{candidate.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-2 md:items-end">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium text-sm flex items-center justify-center gap-2">
                        <FaEye className="text-sm" />
                        View Profile
                      </button>
                      <div className="text-xs text-gray-500">
                        Applied {candidate.appliedDate}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedCandidate === candidate.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-700 mb-4">{candidate.bio}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Applied for</p>
                        <p className="text-sm text-gray-600">{candidate.appliedProject}</p>
                      </div>

                      {/* Status Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                        {candidate.status !== 'Shortlisted' && (
                          <button
                            onClick={() => handleStatusChange(candidate.id, 'Shortlisted')}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium text-sm"
                          >
                            Shortlist
                          </button>
                        )}
                        {candidate.status !== 'Hired' && (
                          <button
                            onClick={() => handleStatusChange(candidate.id, 'Hired')}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium text-sm"
                          >
                            Hire
                          </button>
                        )}
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center gap-2">
                          <FaPhone className="text-sm" />
                          Call
                        </button>
                        <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center gap-2">
                          <FaEnvelope className="text-sm" />
                          Message
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Toggle Details */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
                  <button
                    onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                    className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-all"
                  >
                    {expandedCandidate === candidate.id ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
              <p className="text-gray-600 text-lg">No candidates found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
