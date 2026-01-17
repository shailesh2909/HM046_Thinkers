import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-black hover:opacity-70 transition">
          Hackmatrix
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-semibold transition ${
              location.pathname === "/"
                ? "text-black border-b-2 border-black"
                : "text-gray-700 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="px-6 py-2 text-black font-semibold border-2 border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
          >
            Join now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 pb-4 flex flex-col gap-2">
          <Link
            to="/"
            className="px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Join now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
