// src/pages/Itinerary.jsx
import React, { useEffect, useState } from "react";

function Itinerary() {
  const [items, setItems] = useState([]);

  // Load itinerary from localStorage when component mounts
  useEffect(() => {
    const savedItinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
    setItems(savedItinerary);
  }, []);

  // Remove item from itinerary
  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("itinerary", JSON.stringify(updatedItems));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">My Itinerary</h1>

      {items.length === 0 ? (
        <p className="text-white text-lg">No items in your itinerary yet.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-3xl">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white bg-opacity-20 rounded-lg p-4 shadow hover:shadow-xl transition flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{item.name}, {item.country}</h2>
                <p className="text-white">Date: {item.date}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Itinerary;





