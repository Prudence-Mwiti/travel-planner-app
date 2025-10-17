// src/pages/Destinations.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchDestinations } from "../api/amadeus";
import { motion } from "framer-motion";

function Destinations() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get city and token from state passed via navigate()
  const city = location.state?.city || "Unknown";
  const token = location.state?.token || "";

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city || city === "Unknown") {
      setError("No valid city provided.");
      setLoading(false);
      return;
    }

    async function fetchDestinations() {
      try {
        setLoading(true);
        setError("");
        console.log("🔍 Fetching destinations for:", city);

        const data = await searchDestinations(city, token); // pass token if needed
        console.log("✅ API Response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          setError("No destinations found.");
        } else {
          setDestinations(data);
        }
      } catch (err) {
        console.error("❌ Error fetching destinations:", err);
        setError("Failed to load destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, [city, token]);

  if (loading)
    return <div className="text-center py-20 text-lg font-medium">Loading destinations...</div>;

  if (error)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* HERO Section */}
      <div
        className="w-full bg-cover bg-center py-20 flex flex-col items-center text-white"
        style={{ backgroundImage: `url(https://source.unsplash.com/featured/?${city},travel)` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-wide drop-shadow-lg"
        >
          Destinations for "{city}"
        </motion.h1>
        <p className="mt-2 text-sm opacity-80">Explore top travel spots around the world</p>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-4 text-sm text-gray-600">
        Home / <span className="text-blue-600">Destinations</span> / {city}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300"
          >
            <img
              src={dest.image || `https://source.unsplash.com/featured/?${dest.city},travel`}
              alt={dest.city}
              className="h-48 w-full object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
            />
            <div className="p-5">
              <h2 className="text-lg font-bold">
                {dest.city}, <span className="text-gray-500">{dest.country}</span>
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Top Attractions:{" "}
                <span className="text-blue-500">
                  {dest.attractions?.length > 0 ? dest.attractions.join(", ") : "Not available"}
                </span>
              </p>
              <button
                onClick={() =>
                  navigate("/destination-details", { state: { destination: dest } })
                }
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Explore Destination →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;



























