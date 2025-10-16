import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">Travel Planner</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-semibold">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/destinations" className="hover:text-gray-200">Destinations</Link></li>
          <li><Link to="/itinerary" className="hover:text-gray-200">Itinerary</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      <ul
        className={`md:hidden bg-blue-500 px-6 pb-4 space-y-2 font-semibold transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <li><Link to="/" className="block hover:text-gray-200">Home</Link></li>
        <li><Link to="/destinations" className="block hover:text-gray-200">Destinations</Link></li>
        <li><Link to="/itinerary" className="block hover:text-gray-200">Itinerary</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;









