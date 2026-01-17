import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl w-full items-center">
          
          {/* Left Side - Text */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight">
              Connect with Top Talent
            </h1>
            <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
              Find your perfect freelancer or land your dream project. Join thousands of professionals building successful projects together.
            </p>
            
            <div className="flex flex-col gap-4 pt-4">
              <Link to="/signin" className="w-full lg:w-auto">
                <button className="w-full px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" className="w-full lg:w-auto">
                <button className="w-full px-8 py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200">
                  Join Now
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center">
            <img 
              src="/img/landing.avif" 
              alt="Professional freelancer connecting with clients"
              className="w-full h-auto rounded-lg border-2 border-black object-cover"
            />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gray-50 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-black">Fast</h3>
              <p className="text-gray-700">Find projects and professionals quickly</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-black">Secure</h3>
              <p className="text-gray-700">Verified professionals and safe transactions</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-black">Quality</h3>
              <p className="text-gray-700">Access top talent and deliver excellence</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
