// src/pages/DestinationDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFlightOffers, fetchHotels } from "../api/amadeus";
import { motion } from "framer-motion";

function DestinationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination;

  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingHotels, setLoadingHotels] = useState(true);

  useEffect(() => {
    if (!destination) {
      navigate(-1); // go back if no destination
      return;
    }

    async function loadFlights() {
      try {
        setLoadingFlights(true);
        const flightData = await fetchFlightOffers("LON", destination.city, "2024-10-01");
        setFlights(flightData);
      } catch (err) {
        console.error("Error fetching flights:", err);
      } finally {
        setLoadingFlights(false);
      }
    }

    async function loadHotels() {
      try {
        setLoadingHotels(true);
        const hotelData = await fetchHotels(destination.city);
        setHotels(hotelData);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoadingHotels(false);
      }
    }

    loadFlights();
    loadHotels();
  }, [destination, navigate]);

  if (!destination) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center py-20 flex flex-col items-center text-white"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-wide drop-shadow-lg"
        >
          {destination.city}, {destination.country}
        </motion.h1>
        <p className="mt-2 text-sm opacity-80">
          Top Attractions: {destination.attractions?.join(", ") || "Not available"}
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-4 text-sm text-gray-600">
        Home / <span className="text-blue-600 cursor-pointer" onClick={() => navigate(-1)}>Destinations</span> / {destination.city}
      </div>

      {/* Flights Section */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
        {loadingFlights ? (
          <p>Loading flights...</p>
        ) : flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flights.map(flight => (
              <div key={flight.id} className="p-4 bg-white rounded-lg shadow-md">
                <p><strong>Airline:</strong> {flight.airline}</p>
                <p><strong>Price:</strong> {flight.price}</p>
                <p><strong>Departure:</strong> {flight.departure}</p>
                <p><strong>Arrival:</strong> {flight.arrival}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotels Section */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">Hotels & Accommodations</h2>
        {loadingHotels ? (
          <p>Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p>No hotels available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map(hotel => (
              <div key={hotel.id} className="p-4 bg-white rounded-lg shadow-md">
                <p><strong>Name:</strong> {hotel.name}</p>
                <p><strong>Address:</strong> {hotel.address}</p>
                <p><strong>Price:</strong> {hotel.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationDetails;



