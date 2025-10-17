import React, { useState } from "react";
import { getAccessToken } from "../api/amadeus";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const token = await getAccessToken(
        import.meta.env.VITE_AMADEUS_CLIENT_ID,
        import.meta.env.VITE_AMADEUS_CLIENT_SECRET
      );

      navigate("/destinations", { state: { city, token } });
    } catch (error) {
      console.error(error);
      alert("Error connecting to API. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 drop-shadow-lg ">
          Plan Your Next Adventure ✈
        </h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-2xl mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-6 py-4 rounded-lg w-full outline-none shadow-md text-lg text-black"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 transition rounded-lg font-semibold shadow-md text-lg"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {loading && (
          <p className="text-lg mt-6 animate-pulse drop-shadow-lg">
            Connecting to API...
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;

















