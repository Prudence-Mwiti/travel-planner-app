import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Destinations() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city");

  // State for fetched destinations
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    // For now, simulate fetching
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setDestinations([
        { name: `${city} Central Park`, country: "Country A" },
        { name: `${city} Museum`, country: "Country B" },
        { name: `${city} Beach`, country: "Country C" },
      ]);
      setLoading(false);
    }, 1000);
  }, [city]);

  if (!city) return <p className="p-8 text-xl">No city selected</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Destinations in {city}</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {destinations.map((dest, index) => (
          <div key={index} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{dest.name}</h2>
            <p>{dest.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;



