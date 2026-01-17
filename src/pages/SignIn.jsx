import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("userName", data.name || data.companyName);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Sign in failed. Please try again.");
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
            <h1 className="text-4xl font-black text-black">Sign In</h1>
            <p className="text-gray-700">Welcome back</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={signInData.email}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={signInData.password}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center border-t pt-4">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black font-semibold hover:underline">
                Join now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
