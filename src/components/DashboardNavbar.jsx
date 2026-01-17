import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaUsers,
  FaComment, 
  FaBell,
  FaSearch,
  FaUser,
  FaBuilding,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardNavbar = ({ userType = 'freelancer', userName = 'John Doe', userAvatar = null, onLogout = () => {} }) => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  // Different nav items based on user type
  const freelancerNavItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'find-projects', icon: FaBriefcase, label: 'Find Projects', badge: 24 },
    { id: 'applications', icon: FaUsers, label: 'Applications', badge: 5 },
    { id: 'messages', icon: FaComment, label: 'Messages', badge: 3 },
    { id: 'notifications', icon: FaBell, label: 'Notifications', badge: 7 },
  ];

  const companyNavItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'my-projects', icon: FaBriefcase, label: 'My Projects', badge: 3 },
    { id: 'candidates', icon: FaUsers, label: 'Candidates', badge: 12 },
    { id: 'messages', icon: FaComment, label: 'Messages', badge: 5 },
    { id: 'notifications', icon: FaBell, label: 'Notifications', badge: 8 },
  ];

  const navItems = userType === 'freelancer' ? freelancerNavItems : companyNavItems;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    navigate(`/${tabId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/signin');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-900 text-white font-bold text-base sm:text-lg px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                FL
              </div>
              <span className="font-semibold text-gray-900 text-base sm:text-lg hidden sm:block">FreelanceHub</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-gray-900 p-2"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearch}>
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder={userType === 'freelancer' ? 'Search projects, companies...' : 'Search freelancers, skills...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 pl-10 pr-4 py-1.5 rounded-lg text-sm w-48 lg:w-64 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </form>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative flex flex-col items-center px-3 xl:px-4 py-2 hover:bg-gray-50 rounded-lg transition-all ${
                      activeTab === item.id ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    <div className="relative">
                      <Icon className="text-lg xl:text-xl" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1 hidden xl:block font-medium">{item.label}</span>
                    {activeTab === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* User Type Badge */}
            <div className="flex items-center space-x-2 bg-gray-100 px-2 xl:px-3 py-1.5 rounded-lg border border-gray-200">
              {userType === 'freelancer' ? (
                <>
                  <FaUser className="text-gray-700 text-sm" />
                  <span className="text-xs font-semibold text-gray-700 hidden xl:block">Freelancer</span>
                </>
              ) : (
                <>
                  <FaBuilding className="text-gray-700 text-sm" />
                  <span className="text-xs font-semibold text-gray-700 hidden xl:block">Company</span>
                </>
              )}
            </div>

            {/* Profile */}
            <button 
              ref={dropdownRef}
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2 px-2 xl:px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all relative">
              <img
                src={userAvatar || (userType === 'freelancer' 
                  ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  : "https://api.dicebear.com/7.x/initials/svg?seed=TC"
                )}
                alt="Profile"
                className="w-7 h-7 xl:w-8 xl:h-8 rounded-full border-2 border-gray-200"
              />
              <span className="text-xs font-semibold text-gray-900 hidden xl:block">
                {userName || (userType === 'freelancer' ? 'John Doe' : 'TechCorp')}
              </span>
              <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>

              {/* Profile Dropdown */}
              {profileDropdown && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48">
                  <button 
                    onClick={handleViewProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                    View Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Earnings
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg">
                    Logout
                  </button>
                </div>
              )}
            </button>

            <div className="w-px h-8 bg-gray-200"></div>

            {/* Action Button */}
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-2.5 xl:px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm">
              {userType === 'freelancer' ? 'Portfolio' : '+ Post'}
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1.5 rounded-md text-xs font-medium transition-all">
              {userType === 'freelancer' ? 'Portfolio' : '+ Post'}
            </button>
            <img
              src={userType === 'freelancer' 
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                : "https://api.dicebear.com/7.x/initials/svg?seed=TC"
              }
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-56px)] overflow-y-auto">
          {/* Mobile Search */}
          <div className="px-4 py-3 md:hidden border-b border-gray-200">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder={userType === 'freelancer' ? 'Search projects...' : 'Search freelancers...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 pl-10 pr-4 py-2 rounded-lg text-sm w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Mobile Nav Items */}
          <div className="px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-all ${
                    activeTab === item.id ? 'bg-gray-900 text-white' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="text-lg" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold ${
                      activeTab === item.id ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Profile Section */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={userAvatar || (userType === 'freelancer' 
                    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    : "https://api.dicebear.com/7.x/initials/svg?seed=TC"
                  )}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {userName || (userType === 'freelancer' ? 'John Doe' : 'TechCorp')}
                  </p>
                  <div className="flex items-center space-x-1 mt-0.5">
                    {userType === 'freelancer' ? (
                      <>
                        <FaUser className="text-gray-700 text-xs" />
                        <span className="text-xs text-gray-600 font-medium">Freelancer</span>
                      </>
                    ) : (
                      <>
                        <FaBuilding className="text-gray-700 text-xs" />
                        <span className="text-xs text-gray-600 font-medium">Company</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogoutClick}
              className="w-full px-4 py-2 text-sm text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition-all font-medium">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
