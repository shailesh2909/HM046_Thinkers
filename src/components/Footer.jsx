const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 text-white relative mt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3 text-white">Lelo</h3>
            <p className="text-gray-100 text-sm">Connecting freelancers with companies worldwide.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Find Talent</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-100 hover:text-white transition text-sm">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-100 text-sm">&copy; {new Date().getFullYear()} Lelo. All rights reserved.</p>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-100 hover:text-white transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.438 9.834 8.207 11.188.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C3.422 17.002 2.633 16.244 2.633 16.244c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.83 24 17.31 24 12c0-6.63-5.37-12-12-12"/></svg>
              </a>
              <a href="#" className="text-gray-100 hover:text-white transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
              <a href="#" className="text-gray-100 hover:text-white transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.08 9.965 9.965 0 01-2.824.856 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a14.1 14.1 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
