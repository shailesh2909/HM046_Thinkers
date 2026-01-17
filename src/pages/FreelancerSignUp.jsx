import Navbar from "../components/Navbar";

const FreelancerSignUp = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
          
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Freelancer Sign Up
          </h2>

          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition" />
            <input type="text" placeholder="Skills (React, UI/UX…)" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition" />
            <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition">
              <option value="">Experience</option>
              <option value="0-1">0–1 Years</option>
              <option value="1-3">1–3 Years</option>
              <option value="3-5">3–5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transform transition duration-300">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FreelancerSignUp;
