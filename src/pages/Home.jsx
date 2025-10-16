// src/pages/Home.jsx
import React, { useState } from "react";
import { getAccessToken, searchDestinations } from "../api/amadeus";

function Home() {
  const [city, setCity] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setDestinations([]); // clear previous results

    try {
      // 1. Get access token
      const token = await getAccessToken();

      // 2. Fetch destinations
      const results = await searchDestinations(token, city);

      setDestinations(results);
    } catch (error) {
      console.error(error);
      alert("Error fetching destinations. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      {/* Transparent overlay */}
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Plan Your Next Adventure ✈
        </h1>

        {/* Search Bar */}
        <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-64 md:w-80 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-semibold"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-lg">Loading destinations...</p>}

        {/* Destinations List */}
        {!loading && destinations.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md"
              >
                <h2 className="font-bold text-xl mb-2">{dest.name}</h2>
                <p className="text-gray-700">{dest.address?.countryName}</p>
                {/* You can add more details or top attractions later */}
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && destinations.length === 0 && city.trim() !== "" && (
          <p className="text-lg mt-4">No destinations found for "{city}"</p>
        )}
      </div>
    </div>
  );
}

export default Home;





