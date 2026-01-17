import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const SignUp = () => {
  const [userType, setUserType] = useState("freelancer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("user");
    if (type) setUserType(type);
  }, [location.search]);

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-black rounded-lg p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-black">Create Account</h1>
            <p className="text-gray-700">Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={signUpData.name}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={signUpData.email}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-black">I am a</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="freelancer"
                    checked={userType === "freelancer"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Freelancer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="company"
                    checked={userType === "company"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Company</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center border-t pt-4">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/signin" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
