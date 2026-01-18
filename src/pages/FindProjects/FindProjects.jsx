import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaTag, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { companyProjectAPI } from '../../api/projectAPI';
import { applicationAPI } from '../../api/applicationAPI';
import { resumeAPI } from '../../api/resumeAPI';

const FindProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [applications, setApplications] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [userResumes, setUserResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await companyProjectAPI.getAllProjects();
        setProjects(response.data || []);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUserResumes = async () => {
      try {
        setResumesLoading(true);
        const response = await resumeAPI.getUserResumes();
        setUserResumes(response.data || []);
        // Auto-select the first resume if available
        if (response.data && response.data.length > 0) {
          setSelectedResumeId(response.data[0].id);
        }
      } catch (err) {
        console.error('Error fetching user resumes:', err);
      } finally {
        setResumesLoading(false);
      }
    };

    fetchUserResumes();
  }, []);

  const handleApplyClick = (project) => {
    setSelectedProject(project);
    setCoverLetter('');
    setShowModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!coverLetter.trim()) {
      alert('Please write a cover letter');
      return;
    }

    if (!selectedResumeId) {
      alert('Please select a resume');
      return;
    }

    try {
      // Use applicationAPI to apply
      await applicationAPI.applyToJob({
        projectId: selectedProject.id,
        resumeId: selectedResumeId,
        coverLetter: coverLetter
      });

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
      setSelectedResumeId(userResumes.length > 0 ? userResumes[0].id : '');
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setCoverLetter('');
    setSelectedResumeId(userResumes.length > 0 ? userResumes[0].id : '');
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
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${project.Company?.companyName || 'C'}`}
                    alt={project.Company?.companyName || 'Company'}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 cursor-pointer hover:shadow-md transition-all"
                    onClick={() => navigate(`/view-profile/${project.companyId}/company`)}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{project.Company?.companyName || 'Company'}</p>
                    <p className="text-xs text-gray-500">Company</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.projectCategory === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : project.projectCategory === 'Intermediate'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {project.projectCategory || 'General'}
                </span>
              </div>

              {/* Project Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{project.projectName}</h2>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <FaTag className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-semibold text-gray-900">${project.totalBudget}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-semibold text-gray-900">{project.projectStatus}</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedProject.projectName}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedProject.Company?.companyName || 'Company'}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-gray-900">${selectedProject.totalBudget}</span>
                  <span className="text-sm font-semibold text-gray-900">{selectedProject.projectCategory || 'General'}</span>
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

              {/* Resume Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Resume
                </label>
                {resumesLoading ? (
                  <div className="text-sm text-gray-600">Loading resumes...</div>
                ) : userResumes.length > 0 ? (
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {userResumes.map((resume) => (
                      <option key={resume.id} value={resume.id}>
                        {resume.resume_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    No resumes found. Please upload a resume in your profile first.
                  </div>
                )}
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
                  disabled={coverLetter.length < 50 || !selectedResumeId || userResumes.length === 0}
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
