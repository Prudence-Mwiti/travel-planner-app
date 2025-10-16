import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full min-h-screen bg-red-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-red-500 font-semibold rounded shadow hover:shadow-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;


