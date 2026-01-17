import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center max-w-7xl mx-auto px-6 py-24 gap-10 text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight animate-fadeIn">
          Connect Freelancers with Companies <br /> Effortlessly
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl animate-fadeIn delay-200">
          Build your dream projects by hiring top freelancers, or showcase your skills to get hired by trusted companies worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fadeIn delay-400">
          <Link to="/signin">
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold shadow-lg hover:bg-blue-50 hover:scale-105 transform transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="bg-blue-50 p-6 rounded-xl shadow-lg text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-bold mb-3">Hire Top Talent</h3>
            <p className="text-gray-600">
              Access a curated pool of skilled freelancers for your projects.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow-lg text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-bold mb-3">Showcase Your Skills</h3>
            <p className="text-gray-600">
              Create your profile and get discovered by companies worldwide.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow-lg text-center hover:scale-105 transform transition">
            <h3 className="text-xl font-bold mb-3">Seamless Collaboration</h3>
            <p className="text-gray-600">
              Manage projects, communicate, and deliver efficiently in one platform.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
