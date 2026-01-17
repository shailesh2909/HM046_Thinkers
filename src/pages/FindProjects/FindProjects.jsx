import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaTag, FaCheckCircle, FaTimes } from 'react-icons/fa';

const FindProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      projectTitle: 'E-Commerce Website Development',
      description: 'We need a full-stack e-commerce website built with React and Node.js',
      budget: '$2000-$5000',
      deadline: '30 days',
      skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      level: 'Intermediate',
      applications: 12,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=TC'
    },
    {
      id: 2,
      companyName: 'DesignHub Inc',
      projectTitle: 'Mobile App UI/UX Design',
      description: 'Design a modern mobile application interface for our fitness tracking app',
      budget: '$1500-$3000',
      deadline: '20 days',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      level: 'Beginner',
      applications: 8,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=DH'
    },
    {
      id: 3,
      companyName: 'CloudFirst Technologies',
      projectTitle: 'AWS Cloud Architecture Setup',
      description: 'Setup and configure AWS infrastructure for scalable microservices application',
      budget: '$3000-$7000',
      deadline: '45 days',
      skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
      level: 'Advanced',
      applications: 5,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=CF'
    },
    {
      id: 4,
      companyName: 'DataViz Analytics',
      projectTitle: 'Dashboard Development',
      description: 'Create interactive data visualization dashboards for business analytics',
      budget: '$1800-$3500',
      deadline: '25 days',
      skills: ['React', 'D3.js', 'Chart.js', 'API Integration'],
      level: 'Intermediate',
      applications: 15,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=DA'
    },
    {
      id: 5,
      companyName: 'SecureNet Corp',
      projectTitle: 'Security Audit & Testing',
      description: 'Perform comprehensive security testing and penetration testing for our web application',
      budget: '$2500-$5000',
      deadline: '35 days',
      skills: ['Security Testing', 'Penetration Testing', 'OWASP'],
      level: 'Advanced',
      applications: 3,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=SN'
    },
    {
      id: 6,
      companyName: 'ContentFlow Media',
      projectTitle: 'Blog Platform Development',
      description: 'Build a feature-rich blogging platform with CMS capabilities',
      budget: '$1200-$2500',
      deadline: '40 days',
      skills: ['React', 'Express.js', 'PostgreSQL', 'Stripe'],
      level: 'Intermediate',
      applications: 20,
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=CM'
    }
  ]);

  const [applications, setApplications] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');

  const handleApplyClick = (project) => {
    setSelectedProject(project);
    setCoverLetter('');
    setShowModal(true);
  };

  const handleSubmitApplication = () => {
    if (!coverLetter.trim()) {
      alert('Please write a cover letter');
      return;
    }

    setApplications({
      ...applications,
      [selectedProject.id]: {
        status: 'Applied',
        coverLetter: coverLetter,
        appliedAt: new Date().toLocaleDateString()
      }
    });

    setShowModal(false);
    setCoverLetter('');
    setSelectedProject(null);
    alert('Application submitted successfully!');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setCoverLetter('');
  };

  const isApplied = (projectId) => {
    return applications[projectId]?.status === 'Applied';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Projects</h1>
          <p className="text-gray-600">Browse and apply to projects that match your skills</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search projects..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option>All Budgets</option>
              <option>Under $1000</option>
              <option>$1000 - $5000</option>
              <option>$5000+</option>
            </select>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium">
              Filter
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all"
            >
              {/* Company Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={project.image}
                    alt={project.companyName}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 cursor-pointer hover:shadow-md transition-all"
                    onClick={() => navigate(`/view-profile/${project.id}/company`)}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{project.companyName}</p>
                    <p className="text-xs text-gray-500">Company</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.level === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : project.level === 'Intermediate'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {project.level}
                </span>
              </div>

              {/* Project Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{project.projectTitle}</h2>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <FaTag className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-semibold text-gray-900">{project.budget}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="text-sm font-semibold text-gray-900">{project.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <FaBriefcase className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Applications</p>
                    <p className="text-sm font-semibold text-gray-900">{project.applications} freelancers applied</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              {isApplied(project.id) ? (
                <button
                  disabled
                  className="w-full py-2.5 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-not-allowed"
                >
                  <FaCheckCircle />
                  <span>Applied on {applications[project.id].appliedAt}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleApplyClick(project)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all"
                >
                  Apply Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Apply for Project</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Project Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Project</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedProject.projectTitle}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedProject.companyName}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-gray-900">{selectedProject.budget}</span>
                  <span className="text-sm font-semibold text-gray-900">{selectedProject.deadline}</span>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the company why you're the perfect fit for this project... (minimum 50 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  rows="6"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {coverLetter.length} characters (minimum 50)
                </p>
              </div>

              {/* Your Profile Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Note:</span> Your profile, portfolio, and resume will be automatically sent with your application.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  disabled={coverLetter.length < 50}
                  className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindProjects;
