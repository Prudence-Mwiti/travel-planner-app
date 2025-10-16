import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    // Navigate to Destinations page with query param
    navigate(`/destinations?city=${encodeURIComponent(city)}`);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Plan Your Next Adventure ✈
        </h1>
        <div className="flex gap-2 justify-center">
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
      </div>
    </div>
  );
}

export default Home;




