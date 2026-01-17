import React, { useState } from 'react';
import { FaArrowLeft, FaPlus, FaTrash, FaDollarSign, FaCoins, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateProject = ({ userType, userName }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    totalBudget: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    projectStatus: 'draft',
    skills: '',
    projectCategory: 'Web Development'
  });

  const [milestones, setMilestones] = useState([
    { id: 1, name: '', description: '', tokenAllocation: 0, order: 1 }
  ]);

  const [tokens, setTokens] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Calculate tokens from budget (example: $1 = 1 token)
  const calculateTokens = (budget) => {
    return Math.floor(parseFloat(budget) || 0);
  };

  const handleBudgetChange = (e) => {
    const budget = e.target.value;
    setFormData({ ...formData, totalBudget: budget });
    const calculatedTokens = calculateTokens(budget);
    setTokens(calculatedTokens);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMilestoneChange = (id, field, value) => {
    setMilestones(
      milestones.map(milestone =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
    );
  };

  const addMilestone = () => {
    const newId = Math.max(...milestones.map(m => m.id), 0) + 1;
    setMilestones([...milestones, { id: newId, name: '', description: '', tokenAllocation: 0, order: milestones.length + 1 }]);
  };

  const removeMilestone = (id) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  // Auto-distribute tokens across milestones
  const autoDistributeTokens = () => {
    if (milestones.length === 0 || tokens === 0) return;
    
    const baseTokens = Math.floor(tokens / milestones.length);
    const remainder = tokens % milestones.length;
    
    const updatedMilestones = milestones.map((milestone, index) => ({
      ...milestone,
      tokenAllocation: baseTokens + (index === milestones.length - 1 ? remainder : 0)
    }));
    
    setMilestones(updatedMilestones);
  };

  const getTotalAllocatedTokens = () => {
    return milestones.reduce((sum, m) => sum + (parseInt(m.tokenAllocation) || 0), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    if (!formData.totalBudget || parseFloat(formData.totalBudget) <= 0) newErrors.totalBudget = 'Budget must be greater than 0';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    
    // Validate milestones
    milestones.forEach((milestone, index) => {
      if (!milestone.name.trim()) newErrors[`milestone${milestone.id}Name`] = 'Milestone name is required';
      if (milestone.tokenAllocation <= 0) newErrors[`milestone${milestone.id}Tokens`] = 'Token allocation must be greater than 0';
    });
    
    if (getTotalAllocatedTokens() !== tokens) {
      newErrors.tokenAllocation = `Total tokens allocated (${getTotalAllocatedTokens()}) must equal total tokens (${tokens})`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const projectData = {
        ...formData,
        totalTokens: tokens,
        milestones: milestones.map(m => ({
          ...m,
          tokenAllocation: parseInt(m.tokenAllocation)
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        companyName: userName || 'Your Company'
      };
      
      console.log('Project Created:', projectData);
      setSubmitted(true);
      
      // Store in localStorage for demonstration
      const existingProjects = JSON.parse(localStorage.getItem('createdProjects') || '[]');
      existingProjects.push(projectData);
      localStorage.setItem('createdProjects', JSON.stringify(existingProjects));
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/my-projects');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Created Successfully!</h2>
          <p className="text-gray-600 mb-6">Your project has been created with milestone-based token allocation.</p>
          <p className="text-sm text-gray-500">Redirecting to My Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/my-projects')}
          className="flex items-center gap-2 text-gray-900 hover:text-gray-600 mb-8 font-medium transition-all"
        >
          <FaArrowLeft /> Back to My Projects
        </button>

        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Project</h1>
            <p className="text-gray-600">Setup project details, milestones, and token allocation</p>
          </div>

          {/* Company Info Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={userName || 'Your Company'}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Created At</label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString()}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
            
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name *</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleFormChange}
                  placeholder="Enter project name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.projectName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.projectName && <p className="text-red-600 text-sm mt-1">{errors.projectName}</p>}
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description *</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleFormChange}
                  placeholder="Describe your project in detail"
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.projectDescription && <p className="text-red-600 text-sm mt-1">{errors.projectDescription}</p>}
              </div>

              {/* Category and Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Category</label>
                  <select
                    name="projectCategory"
                    value={formData.projectCategory}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                    <option>DevOps</option>
                    <option>Machine Learning</option>
                    <option>Blockchain</option>
                    <option>Cloud Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Required Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleFormChange}
                    placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errors.skills ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills}</p>}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Status</label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Budget & Token Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget & Token Allocation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Budget *</label>
                <div className="flex gap-2">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleFormChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                  <input
                    type="number"
                    name="totalBudget"
                    value={formData.totalBudget}
                    onChange={handleBudgetChange}
                    placeholder="0.00"
                    step="0.01"
                    className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errors.totalBudget ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.totalBudget && <p className="text-red-600 text-sm mt-1">{errors.totalBudget}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Tokens</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <FaCoins className="text-yellow-500 text-xl" />
                  <span className="text-2xl font-bold text-gray-900">{tokens}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Conversion: $1 = 1 Token</p>
              </div>
            </div>

            {/* Auto-distribute button */}
            <button
              type="button"
              onClick={autoDistributeTokens}
              disabled={tokens === 0 || milestones.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all mb-6 font-medium"
            >
              Auto-Distribute Tokens
            </button>

            {errors.tokenAllocation && <p className="text-red-600 text-sm mb-4">{errors.tokenAllocation}</p>}
          </div>

          {/* Milestones Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Project Milestones</h2>
              <button
                type="button"
                onClick={addMilestone}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
              >
                <FaPlus /> Add Milestone
              </button>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Milestone {index + 1}</h3>
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(milestone.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all flex items-center gap-1"
                      >
                        <FaTrash className="text-sm" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Milestone Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Milestone Name *</label>
                      <input
                        type="text"
                        value={milestone.name}
                        onChange={(e) => handleMilestoneChange(milestone.id, 'name', e.target.value)}
                        placeholder="e.g., Setup & Planning"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                          errors[`milestone${milestone.id}Name`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`milestone${milestone.id}Name`] && (
                        <p className="text-red-600 text-sm mt-1">{errors[`milestone${milestone.id}Name`]}</p>
                      )}
                    </div>

                    {/* Token Allocation */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Token Allocation *</label>
                      <div className="flex items-center gap-2">
                        <FaCoins className="text-yellow-500" />
                        <input
                          type="number"
                          value={milestone.tokenAllocation}
                          onChange={(e) => handleMilestoneChange(milestone.id, 'tokenAllocation', e.target.value)}
                          placeholder="0"
                          min="0"
                          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                            errors[`milestone${milestone.id}Tokens`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors[`milestone${milestone.id}Tokens`] && (
                        <p className="text-red-600 text-sm mt-1">{errors[`milestone${milestone.id}Tokens`]}</p>
                      )}
                    </div>
                  </div>

                  {/* Milestone Description */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => handleMilestoneChange(milestone.id, 'description', e.target.value)}
                      placeholder="Describe what needs to be completed in this milestone"
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>

                  {/* Token Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.round((milestone.tokenAllocation / tokens) * 100)}% {milestone.tokenAllocation && tokens ? '(' + milestone.tokenAllocation + '/' + tokens + ')' : ''}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: tokens > 0 ? `${(milestone.tokenAllocation / tokens) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Token Summary */}
            <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">{formData.currency} {formData.totalBudget || '0'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tokens</p>
                  <p className="text-2xl font-bold text-yellow-600">{tokens}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Allocated Tokens</p>
                  <p className={`text-2xl font-bold ${getTotalAllocatedTokens() === tokens ? 'text-green-600' : 'text-red-600'}`}>
                    {getTotalAllocatedTokens()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end mb-8">
            <button
              type="button"
              onClick={() => navigate('/my-projects')}
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-all font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
