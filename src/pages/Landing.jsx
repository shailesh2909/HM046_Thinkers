import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          
          {/* Left Side - Welcome Message */}
          <div className="text-gray-900">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Welcome to Hackmatrix
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Connect with top talent or showcase your skills. Join thousands of professionals building successful projects together.
            </p>
          </div>

          {/* Right Side - CTA */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
            
            <div className="space-y-4">
              <Link to="/signin" className="block">
                <button className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  Sign In
                </button>
              </Link>

              {/* Create Account with hover dropdown */}
              <div className="relative group">
                <button className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg bg-white hover:bg-indigo-50 transition">
                  Sign Up
                </button>

                <div className="absolute right-0 mt-0 hidden group-hover:block z-10 w-full">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden min-w-max">
                    <Link to="/signup?user=freelancer" className="block">
                      <div className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                        Sign up as Freelancer
                      </div>
                    </Link>
                    <Link to="/signup?user=company" className="block">
                      <div className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                        Sign up as Company
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              Join our platform to hire freelancers or get hired by leading companies.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
