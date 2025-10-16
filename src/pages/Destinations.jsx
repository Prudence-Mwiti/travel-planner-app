import React from "react";

function Destinations() {
  // Placeholder data (we'll fetch real data later)
  const dummyDestinations = [
    { id: 1, name: "Paris", country: "France" },
    { id: 2, name: "Tokyo", country: "Japan" },
    { id: 3, name: "New York", country: "USA" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dummyDestinations.map((dest) => (
          <div
            key={dest.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{dest.name}</h2>
            <p className="text-gray-600">{dest.country}</p>
            <div className="mt-2 bg-gray-200 h-40 w-full flex items-center justify-center">
              <span className="text-gray-400">Image placeholder</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;




