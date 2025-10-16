import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Travel Planner</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/destinations" className="hover:underline">Destinations</Link>
        <Link to="/itinerary" className="hover:underline">Itinerary</Link>
      </div>
    </nav>
  );
}

export default Navbar;


