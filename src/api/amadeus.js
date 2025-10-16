// src/api/amadeus.js

const BASE_URL = "https://test.api.amadeus.com";

// Get the client ID and secret from environment variables
const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

/**
 * Get an access token from Amadeus
 */
export async function getAccessToken() {
  const response = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token from Amadeus");
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Search destinations by keyword (city)
 * @param {string} token - Access token from getAccessToken()
 * @param {string} keyword - City name to search
 * @returns {Array} - Array of destination objects
 */
export async function searchDestinations(token, keyword) {
  const response = await fetch(
    `${BASE_URL}/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search destinations");
  }

  const data = await response.json();
  return data.data || []; // returns array of cities
}

