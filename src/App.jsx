import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Itinerary from "./pages/Itinerary";
import NotFound from "./pages/NotFound";
import { getAccessToken } from "./api/amadeus";

function App() {
  const [searchCity, setSearchCity] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (city) => {
    setSearchCity(city);

    try {
      const accessToken = await getAccessToken(
        import.meta.env.VITE_AMADEUS_CLIENT_ID,
        import.meta.env.VITE_AMADEUS_CLIENT_SECRET
      );
      setToken(accessToken);
      navigate("/destinations");
    } catch (error) {
      console.error(error);
      alert("Failed to get access token");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onSearch={handleSearch} />} />
          <Route path="/destinations" element={<Destinations searchCity={searchCity} token={token} />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;







