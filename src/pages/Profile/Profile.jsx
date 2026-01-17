import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaEdit, FaSave, FaTimes, FaFileUpload } from 'react-icons/fa';

const Profile = ({ userName = 'John Doe', userType = 'freelancer' }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    userType === 'freelancer' 
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
      : "https://api.dicebear.com/7.x/initials/svg?seed=TC"
  );
  const [resume, setResume] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    name: userName,
    email: 'john.doe@example.com',
    mobileNumber: '+91 9876543210',
    bio: userType === 'freelancer' ? 'Full Stack Developer with 5+ years experience' : 'Technology Company',
    location: 'India',
  });

  const [tempFormData, setTempFormData] = useState(formData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResume(file.name);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData({ ...tempFormData, [name]: value });
  };

  const handleSave = () => {
    setFormData(tempFormData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempFormData(formData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setTempFormData(formData);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              <FaEdit className="text-sm" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-black text-white p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all">
                    <FaCamera className="text-lg" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 text-center">
                {isEditing ? 'Click camera to change photo' : 'Profile Picture'}
              </p>
            </div>

            {/* Profile Info Section */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{formData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg text-gray-700">{formData.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={tempFormData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg text-gray-700">{formData.mobileNumber}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={tempFormData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg text-gray-700">{formData.location}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={tempFormData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-gray-700">{formData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        {userType === 'freelancer' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume</h2>
            
            {resume ? (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">PDF</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{resume}</p>
                    <p className="text-sm text-gray-500">Resume uploaded</p>
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={() => {
                      setResume(null);
                      setResumeFile(null);
                    }}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Remove
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-all">
                {isEditing ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <FaFileUpload className="text-4xl text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900">Upload Resume</p>
                        <p className="text-sm text-gray-500">Click to select file or drag and drop</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="text-gray-500">
                    <p>No resume uploaded</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center gap-4 justify-end">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaTimes className="text-sm" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
            >
              <FaSave className="text-sm" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
