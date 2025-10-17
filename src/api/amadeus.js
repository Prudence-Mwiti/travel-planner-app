// src/api/amadeus.js
import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

// ✅ Get Auth Token
export async function getAccessToken() {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken; // Use cached token if valid
  }

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_AMADEUS_CLIENT_ID,
      client_secret: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
    })
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;
  return cachedToken;
}

// ✅ Search for destinations by city keyword
export async function searchDestinations(city) {
  const token = await getAccessToken();

  const response = await axios.get(
    "https://test.api.amadeus.com/v1/reference-data/locations",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { keyword: city, subType: "CITY,AIRPORT", page: { limit: 10 } },
    }
  );

  return response.data.data.map((item, index) => ({
    id: index,
    city: item.name,
    country: item.address?.countryName || "Unknown",
    image: `https://source.unsplash.com/featured/?${item.name},travel`,
    attractions: ["Popular Spot 1", "Popular Spot 2"], // Placeholder
  }));
}

// ✅ Fetch Flight Offers (mocked for now, can later call real Amadeus API)
export async function fetchFlightOffers(origin, destination, departureDate, adults = 1) {
  const token = await getAccessToken();

  // TODO: Replace with real API call if needed
  return [
    { id: 1, airline: "Air France", price: "$500", departure: "10:00", arrival: "14:00" },
    { id: 2, airline: "Emirates", price: "$650", departure: "12:00", arrival: "16:00" },
  ];
}

// ✅ Fetch Hotels (mocked for now, can later call real Amadeus API)
export async function fetchHotels(city) {
  const token = await getAccessToken();

  // TODO: Replace with real API call if needed
  return [
    { id: 1, name: "Hotel Parisian", address: "123 Paris St", price: "$200/night" },
    { id: 2, name: "Eiffel Stay", address: "456 Champs Elysees", price: "$250/night" },
  ];
}



