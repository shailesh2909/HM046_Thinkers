import Navbar from "../components/Navbar";

const FreelancerSignIn = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Freelancer Sign In
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transform transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FreelancerSignIn;
