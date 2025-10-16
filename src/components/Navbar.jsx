import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Travel Planner</h1>
      <ul className="flex space-x-6">
        <li><a href="/" className="text-gray-700 hover:text-blue-600 transition">Home</a></li>
        <li><a href="/destinations" className="text-gray-700 hover:text-blue-600 transition">Destinations</a></li>
        <li><a href="/itinerary" className="text-gray-700 hover:text-blue-600 transition">Itinerary</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

