import React, { useState } from "react";

function Itinerary() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = {
      name: "Sample Destination",
      date: new Date().toLocaleDateString(),
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">My Itinerary</h1>

      <button
        onClick={addItem}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg mb-6 shadow-md transition"
      >
        Add Sample Destination
      </button>

      {items.length === 0 ? (
        <p className="text-white text-lg">No items in your itinerary yet.</p>
      ) : (
        <ul className="space-y-4 w-full max-w-3xl">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="bg-white bg-opacity-20 rounded-lg p-4 shadow hover:shadow-xl transition"
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



