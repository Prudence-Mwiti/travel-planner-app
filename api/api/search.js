// api/search.js
import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    // ✅ Get access token
    const authResponse = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      })
    );

    const accessToken = authResponse.data.access_token;

    // ✅ Search for destinations (Amadeus API Location Search - City/Airport Lookup)
    const searchResponse = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          keyword: city,
          subType: "CITY",
        },
      }
    );

    // ✅ Format data for frontend
    const formattedData = searchResponse.data.data.map((item, index) => ({
      id: index,
      city: item.name || "Unknown",
      country: item.address?.countryName || "Unknown",
      image: `https://source.unsplash.com/featured/?${item.name},travel`,
      attractions: ["Popular spot", "Famous museum", "Local food market"], // Placeholder (can be upgraded later)
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching destinations:", error.response?.data || error);
    return res.status(500).json({ error: "Failed to fetch destinations" });
  }
}



