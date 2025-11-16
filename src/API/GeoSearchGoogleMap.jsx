import React, { useState, useCallback } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Button from "../features/Button";
import Card from "../features/Card";
import CardContent from "../features/CardContent";
import { MapPin, Search } from "lucide-react";

// ----------------------
// CONFIG
// ----------------------
const GOOGLE_API_KEY = "AIzaSyAN4u9CdMX3f5fxnjsDZh32BbF-xxdzin8";

// Map style & default center
const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

// Sydney default
const defaultCenter = { lat: -33.8688, lng: 151.2093 };

// ----------------------
// COMPONENT
// ----------------------
// Export the component so it can be used in other parts of the app
export default function GeoSearchGoogleMap() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    // must enable Maps + Places APIs
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  // Get current location
  const handleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Unable to fetch your location.")
    );
  }, []);

  // ----------------------
  // SEARCH FUNCTION
  // ----------------------
  const handleSearch = useCallback(async () => {
    if (!location) {
      return alert("Please allow location access first.");
    }

    try {
      const { data } = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${location.lat},${location.lng}`,
            radius: 2000,
            keyword: query,
            key: GOOGLE_API_KEY,
          },
        }
      );

      if (data.status !== "OK") {
        return alert(`Google API Error: ${data.status}`);
      }

      setResults(
        data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to fetch nearby places.");
    }
  }, [location, query]);

  if (!isLoaded) return <div>Loading map...</div>;



  // ----------------------
  // UI
  // ----------------------
  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-3xl mx-auto">
      {/* Search Row */}
      <div className="d-flex align-items-center w-100">
        <input
          type="text"
          placeholder="Search nearby..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 me-2"
        />
        <Button onClick={handleSearch} className="bg-blue-600 custom-text-black button me-2">
          <Search className="w-4 h-4 mr-1" /> Search
        </Button>
        <Button onClick={handleLocation} variant="outline" className="custom-text-black border-black hover:bg-gray-200 button me-1">
          <MapPin className="w-4 h-4 mr-1" /> Use my location
        </Button>
      </div>

      <div className="w-full">
        {/* Google Map rendering */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={location || defaultCenter}
        >

          {/* Markers */}
          {location && <Marker position={location} label="📍You" />}
          {results.map((place) => (
            <Marker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Results List */}
      <div className="grid gap-2 w-full">
        {results.map((place) => (
          <Card key={place.id} className="shadow-sm">
            <CardContent className="flex flex-col p-3">
              <span className="font-medium">{place.name}</span>
              <span className="text-sm text-gray-500">{place.address}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}