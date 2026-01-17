import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaEdit, FaSave, FaTimes, FaFileUpload, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaUsers, FaImage } from 'react-icons/fa';
import { userAPI } from '../../api/userAPI';
import { companyAPI } from '../../api/companyAPI';

const Profile = ({ userName = 'John Doe', userType = 'freelancer' }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    userType === 'freelancer' 
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
      : "https://api.dicebear.com/7.x/initials/svg?seed=TC"
  );
  const [bannerImage, setBannerImage] = useState("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop");
  const [resume, setResume] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const [formData, setFormData] = useState(
    userType === 'company' ? {
      companyName: userName,
      headline: '',
      about: '',
      profilePhoto: '',
      bannerPhoto: '',
      industry: '',
      companySize: '11-50',
      contactEmail: '',
      phoneNumber: '',
      phoneType: 'work',
      address: '',
      location: '',
    } : {
      firstName: userName.split(' ')[0] || '',
      lastName: userName.split(' ')[1] || '',
      email: 'user@example.com',
      phone: '+91 9876543210',
      bio: 'Full Stack Developer with 5+ years experience',
      location: 'India',
    }
  );

  const [tempFormData, setTempFormData] = useState(formData);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      if (userType === 'company') {
        const response = await companyAPI.getProfile();
        if (response.data) {
          const data = {
            companyName: response.data.company_name || userName,
            headline: response.data.headline || '',
            about: response.data.about || '',
            profilePhoto: response.data.profile_photo || '',
            bannerPhoto: response.data.banner_photo || '',
            industry: response.data.industry || '',
            companySize: response.data.company_size || '11-50',
            contactEmail: response.data.contact_email || '',
            phoneNumber: response.data.phone_number || '',
            phoneType: response.data.phone_type || 'work',
            address: response.data.address || '',
            location: response.data.location || '',
          };
          setFormData(data);
          setTempFormData(data);
          setCreatedAt(response.data.created_at);
          if (response.data.profile_photo) {
            setProfileImage(response.data.profile_photo);
          }
          if (response.data.banner_photo) {
            setBannerImage(response.data.banner_photo);
          }
        }
      } else {
        const response = await userAPI.getProfile();
        if (response.data) {
          const data = {
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            bio: response.data.bio || '',
            location: response.data.location || 'India',
          };
          setFormData(data);
          setTempFormData(data);
          if (response.data.profileImage) {
            setProfileImage(response.data.profileImage);
          }
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setTempFormData({ ...tempFormData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
        setTempFormData({ ...tempFormData, bannerPhoto: reader.result });
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

  const handleSave = async () => {
    try {
      setLoading(true);
      if (userType === 'company') {
        await companyAPI.updateProfile(tempFormData);
      } else {
        await userAPI.updateProfile(tempFormData);
      }
      setFormData(tempFormData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
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

  if (loading && !formData.companyName && !formData.firstName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {userType === 'company' ? (
          // ============================================
          // COMPANY PROFILE LAYOUT
          // ============================================
          <>
            {/* Banner Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={bannerImage}
                  alt="Company Banner"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2">
                    <FaImage />
                    Change Banner
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Company Logo"
                      className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-xl bg-white"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-all shadow-lg">
                        <FaCamera />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Company Name and Actions */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4 md:mt-0">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          name="companyName"
                          value={tempFormData.companyName}
                          onChange={handleInputChange}
                          className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent"
                          placeholder="Company Name"
                        />
                      ) : (
                        <h1 className="text-3xl font-bold text-gray-900">{formData.companyName || 'Company Name'}</h1>
                      )}
                      
                      {isEditing ? (
                        <input
                          type="text"
                          name="headline"
                          value={tempFormData.headline}
                          onChange={handleInputChange}
                          className="text-gray-600 mt-1 border-b border-gray-300 focus:border-black focus:outline-none bg-transparent w-full"
                          placeholder="Company tagline"
                        />
                      ) : (
                        <p className="text-gray-600 mt-1">{formData.headline || 'Add a headline'}</p>
                      )}
                      
                      {createdAt && (
                        <p className="text-sm text-gray-500 mt-2">
                          Member since {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>

                    {!isEditing && (
                      <button
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all self-start md:self-auto"
                      >
                        <FaEdit />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              
              {/* Left Column - About & Description */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* About Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaBuilding className="text-blue-600" />
                    About Company
                  </h2>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={tempFormData.about}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      placeholder="Tell us about your company..."
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {formData.about || 'No description provided yet.'}
                    </p>
                  )}
                </div>

                {/* Industry & Company Size */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Company Info</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Industry */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaGlobe className="text-blue-600" />
                        Industry
                      </label>
                      {isEditing ? (
                        <select
                          name="industry"
                          value={tempFormData.industry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="">Select Industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Consulting">Consulting</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 font-medium">{formData.industry || 'Not specified'}</p>
                      )}
                    </div>

                    {/* Company Size */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaUsers className="text-blue-600" />
                        Company Size
                      </label>
                      {isEditing ? (
                        <select
                          name="companySize"
                          value={tempFormData.companySize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 font-medium">{formData.companySize} employees</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-6">
                
                {/* Contact Information */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h2>
                  <div className="space-y-4">
                    
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaEnvelope className="text-blue-600" />
                        Contact Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="contactEmail"
                          value={tempFormData.contactEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="email@company.com"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.contactEmail || 'Not provided'}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={tempFormData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                            placeholder="+91 9876543210"
                          />
                          <select
                            name="phoneType"
                            value={tempFormData.phoneType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                          >
                            <option value="work">Work</option>
                            <option value="support">Support</option>
                            <option value="other">Other</option>
                          </select>
                        </>
                      ) : (
                        <div>
                          <p className="text-gray-900">{formData.phoneNumber || 'Not provided'}</p>
                          {formData.phoneNumber && (
                            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                              {formData.phoneType}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={tempFormData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="City, Country"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.location || 'Not specified'}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={tempFormData.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                          placeholder="Enter full address"
                        />
                      ) : (
                        <p className="text-gray-900">{formData.address || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex items-center gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  <FaSave />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </>
        ) : (
          // ============================================
          // FREELANCER PROFILE LAYOUT (Original)
          // ============================================
          <>
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
              
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={tempFormData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{formData.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={tempFormData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{formData.lastName}</p>
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

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tempFormData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                  <p className="text-lg text-gray-700">{formData.phone}</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
