import React, { useState } from "react";

function Itinerary() {
  const [items, setItems] = useState([]);

  // Placeholder function for adding items
  const addItem = () => {
    const newItem = {
      name: "Sample Destination",
      date: new Date().toLocaleDateString(),
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Itinerary</h1>

      <button
        onClick={addItem}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded mb-6"
      >
        Add Sample Destination
      </button>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in your itinerary yet.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>Date: {item.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Itinerary;

