import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-indigo-600 transition">
          Hackmatrix
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              location.pathname === "/"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              location.pathname === "/signin"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            Sign In
          </Link>

          {/* Sign Up Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-lg font-semibold text-gray-700 hover:text-indigo-600 transition">
              Sign Up
            </button>
            <div className="absolute right-0 mt-0 hidden group-hover:block z-10">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-900 hover:text-indigo-600 focus:outline-none transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 shadow-md px-6 pb-4 flex flex-col gap-2 border-t border-gray-200">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              location.pathname === "/"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:text-indigo-600"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              location.pathname === "/signin"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:text-indigo-600"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <p className="text-gray-600 text-sm font-semibold px-4 py-2">Sign Up</p>
            <Link
              to="/signup?user=freelancer"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition text-sm"
              onClick={() => setMenuOpen(false)}
            >
              As Freelancer
            </Link>
            <Link
              to="/signup?user=company"
              className="block px-4 py-2 text-gray-700 hover:text-indigo-600 transition text-sm"
              onClick={() => setMenuOpen(false)}
            >
              As Company
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
