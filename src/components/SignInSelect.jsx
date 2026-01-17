import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignInSelect = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-full max-w-md animate-fadeIn">
          
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Sign In As
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signin/freelancer">
              <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300 w-full">
                Freelancer
              </button>
            </Link>

            <Link to="/signin/company">
              <button className="px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-lg hover:bg-gray-900 hover:scale-105 transform transition duration-300 w-full">
                Company
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSelect;
