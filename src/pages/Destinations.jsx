import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchDestinations } from "../api/amadeus";

function Destinations() {
  const location = useLocation();
  const city = location.state?.city || "";
  const token = location.state?.token || "";
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city || !token) return;

    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const results = await searchDestinations(token, city);
        setDestinations(results);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [city, token]);

  if (!city) {
    return <p className="text-center mt-6 text-white">No city selected</p>;
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-10">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 drop-shadow-lg">
          Destinations in {city}
        </h1>

        {loading && (
          <p className="text-center text-lg animate-pulse drop-shadow-lg">
            Loading destinations...
          </p>
        )}

        {!loading && destinations.length === 0 && (
          <p className="text-center text-lg drop-shadow-lg">
            No destinations found for "{city}"
          </p>
        )}

        {!loading && destinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white bg-opacity-90 text-black rounded-xl p-6 shadow-lg hover:shadow-2xl transition flex flex-col justify-between"
              >
                <h2 className="font-bold text-2xl mb-2">{dest.name}</h2>
                <p className="text-gray-700">
                  {dest.address?.countryName || "Unknown Country"}
                </p>
                {dest.rating && (
                  <p className="mt-2 font-semibold">Rating: {dest.rating}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Destinations;













