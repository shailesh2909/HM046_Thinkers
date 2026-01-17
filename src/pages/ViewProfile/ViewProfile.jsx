import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaBriefcase, FaMapMarkerAlt, FaArrowLeft, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

const ViewProfile = ({ userType }) => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  // Sample company data
  const companyProfiles = {
    1: {
      name: 'Tech Innovations Inc',
      title: 'Software Development Company',
      rating: 4.8,
      reviews: 245,
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techinnovations',
      bio: 'Leading software development company specializing in web and mobile applications. We have 50+ employees and have completed 200+ projects across various industries.',
      location: 'San Francisco, USA',
      email: 'info@techinnovations.com',
      phone: '+1 (415) 555-0123',
      website: 'www.techinnovations.com',
      employees: '50-100',
      founded: '2015',
      specialties: ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI/ML', 'DevOps'],
      portfolio: [
        { title: 'E-Commerce Platform', description: 'Built a scalable e-commerce platform for a retail company' },
        { title: 'SaaS Dashboard', description: 'Developed a comprehensive analytics dashboard' },
        { title: 'Mobile Banking App', description: 'Created a secure mobile banking application' }
      ],
      linkedin: 'linkedin.com/company/tech-innovations',
      github: 'github.com/techinnovations'
    },
    2: {
      name: 'Digital Design Studio',
      title: 'Creative Design Agency',
      rating: 4.9,
      reviews: 189,
      logo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designstudio',
      bio: 'Award-winning design studio creating stunning digital experiences. Specializing in UI/UX design, branding, and digital marketing.',
      location: 'New York, USA',
      email: 'contact@designstudio.com',
      phone: '+1 (212) 555-0456',
      website: 'www.designstudio.com',
      employees: '20-50',
      founded: '2018',
      specialties: ['UI/UX Design', 'Branding', 'Digital Marketing', 'Animation', 'Illustration'],
      portfolio: [
        { title: 'Brand Identity Design', description: 'Complete brand redesign for a tech startup' },
        { title: 'Web Interface Design', description: 'Designed user interfaces for SaaS product' },
        { title: 'Mobile App Design', description: 'End-to-end design for fitness tracking app' }
      ],
      linkedin: 'linkedin.com/company/digital-design-studio',
      github: 'github.com/designstudio'
    }
  };

  // Sample freelancer data
  const freelancerProfiles = {
    1: {
      name: 'Alex Johnson',
      title: 'Full Stack Developer',
      rating: 4.8,
      reviews: 156,
      hourlyRate: '$45-$60',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      bio: 'Experienced full-stack developer with 5+ years in React, Node.js, and MongoDB. Passionate about building scalable web applications.',
      location: 'Los Angeles, USA',
      email: 'alex@freelancer.com',
      phone: '+1 (323) 555-0789',
      experience: '5+ years',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'PostgreSQL', 'Vue.js', 'JavaScript'],
      languages: ['English', 'Spanish'],
      education: [
        { degree: 'B.S. Computer Science', university: 'University of California', year: '2018' }
      ],
      portfolio: [
        { title: 'E-Commerce Platform', description: 'Full-stack MERN application with Stripe integration', url: 'github.com/alex/ecommerce' },
        { title: 'Real-time Chat App', description: 'Built with Socket.io and React', url: 'github.com/alex/chatapp' },
        { title: 'Project Management Tool', description: 'Collaborated with team to build productivity app', url: 'github.com/alex/pmtool' }
      ],
      resume: 'https://example.com/alex-resume.pdf',
      linkedin: 'linkedin.com/in/alexjohnson',
      github: 'github.com/alexjohnson'
    },
    2: {
      name: 'Sarah Williams',
      title: 'UI/UX Designer',
      rating: 4.9,
      reviews: 203,
      hourlyRate: '$50-$75',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      bio: 'Creative designer with 7+ years of experience. Specializing in mobile and web interfaces with a focus on user-centered design.',
      location: 'Seattle, USA',
      email: 'sarah@freelancer.com',
      phone: '+1 (206) 555-0123',
      experience: '7+ years',
      skills: ['Figma', 'UI Design', 'Prototyping', 'Illustrator', 'Adobe XD', 'UX Research', 'Wireframing', 'Design Systems'],
      languages: ['English', 'French'],
      education: [
        { degree: 'BFA Graphic Design', university: 'Rhode Island School of Design', year: '2016' }
      ],
      portfolio: [
        { title: 'FinTech App Design', description: 'Complete UI/UX redesign for mobile banking app', url: 'dribbble.com/sarah/fintech' },
        { title: 'E-Learning Platform', description: 'Designed interfaces for educational platform', url: 'dribbble.com/sarah/elearning' },
        { title: 'Healthcare Dashboard', description: 'Created design system for medical records app', url: 'dribbble.com/sarah/healthcare' }
      ],
      resume: 'https://example.com/sarah-resume.pdf',
      linkedin: 'linkedin.com/in/sarahwilliams',
      github: 'dribbble.com/sarahwilliams'
    }
  };

  const profile = type === 'company' ? companyProfiles[id] : freelancerProfiles[id];

  if (!profile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 mb-8 font-medium"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-900 hover:text-gray-600 mb-8 font-medium transition-all"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 h-32"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row gap-6 -mt-16 relative z-10">
              <img
                src={profile.logo || profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1 pt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-lg text-gray-600 mt-1">{profile.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold text-gray-900">{profile.rating}</span>
                      <span className="text-gray-500">({profile.reviews} reviews)</span>
                    </div>
                    {profile.hourlyRate && <span className="text-lg font-bold text-gray-900">{profile.hourlyRate}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-gray-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-gray-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-900 font-medium">{profile.phone}</p>
              </div>
            </div>
            {profile.website && (
              <div className="flex items-center gap-4">
                <FaBriefcase className="text-gray-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <p className="text-gray-900 font-medium">{profile.website}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{profile.bio}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            {type === 'company' ? (
              <>
                <div>
                  <p className="text-sm text-gray-600">Employees</p>
                  <p className="text-lg font-bold text-gray-900">{profile.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Founded</p>
                  <p className="text-lg font-bold text-gray-900">{profile.founded}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="text-lg font-bold text-gray-900">{profile.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Languages</p>
                  <p className="text-lg font-bold text-gray-900">{profile.languages.join(', ')}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Specialties/Skills */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {type === 'company' ? 'Specialties' : 'Skills'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.specialties?.map((specialty, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
                {specialty}
              </span>
            )) || profile.skills?.map((skill, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.portfolio?.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                {item.url && (
                  <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 hover:text-gray-600 font-medium">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center justify-center gap-2">
            <FaEnvelope className="text-sm" />
            Send Message
          </button>
          {type === 'freelancer' && (
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2"
            >
              <FaFileDownload className="text-sm" />
              Download Resume
            </a>
          )}
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-all font-medium">
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
