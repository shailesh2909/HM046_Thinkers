import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [userType, setUserType] = useState("freelancer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", userType);
        navigate("/dashboard");
      } else {
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-400 rounded-bl-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300 rounded-tr-3xl opacity-60"></div>
        
        <div className="w-full max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Left Side - Sign Up Form */}
            <div className="p-12 flex flex-col justify-center bg-gray-50">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-teal-600 mb-1">Create Account</h1>
              </div>

              {/* Social Login */}
              <div className="flex gap-4 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.438 9.834 8.207 11.188.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C3.422 17.002 2.633 16.244 2.633 16.244c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.83 24 17.31 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" fill="#1F2937" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or use your email account</span>
                </div>
              </div>

              {/* User Type Toggle */}
              <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setUserType("freelancer")}
                  className={`flex-1 py-2 rounded font-semibold transition duration-300 ${
                    userType === "freelancer"
                      ? "bg-teal-500 text-white shadow-md"
                      : "text-gray-700 hover:text-teal-600"
                  }`}
                >
                  Freelancer
                </button>
                <button
                  onClick={() => setUserType("company")}
                  className={`flex-1 py-2 rounded font-semibold transition duration-300 ${
                    userType === "company"
                      ? "bg-teal-500 text-white shadow-md"
                      : "text-gray-700 hover:text-teal-600"
                  }`}
                >
                  Company
                </button>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder={userType === "company" ? "Company Name" : "Full Name"}
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  required
                />

                <div className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 rounded border-gray-300 cursor-pointer"
                    required
                  />
                  <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-500 text-white py-3 rounded-full font-semibold hover:bg-teal-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "CREATE ACCOUNT"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a href="/signin" className="text-teal-600 font-semibold hover:text-teal-700 transition">
                    Sign In
                  </a>
                </p>
              </div>
            </div>

            {/* Right Side - Sign In Promo */}
            <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 p-12 flex flex-col justify-center items-center text-white overflow-hidden">
              {/* Background Design Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full"></div>

              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-lg mb-8 text-white/90">Already have an account? Sign in to continue</p>
                <a
                  href="/signin"
                  className="inline-block px-10 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-teal-500 transition duration-300 transform hover:scale-105"
                >
                  SIGN IN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
