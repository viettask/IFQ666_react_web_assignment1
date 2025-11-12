import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Button from "./Button";
import Card from "./Card"; 
import CardContent from "./CardContent";
import { MapPin, Search } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const defaultCenter = { lat: -33.8688, lng: 151.2093 }; // Sydney default

export default function GeoSearchGoogleMap() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAN4u9CdMX3f5fxnjsDZh32BbF-xxdzin8", // must enable Maps + Places APIs
  });

  // Get current location
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error(err);
          alert("Unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  // Search nearby places
  const handleSearch = async () => {
    if (!location) {
      alert("Please allow location access first.");
      return;
    }

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${location.lat},${location.lng}`,
            radius: 2000,
            keyword: query,
            key: "AIzaSyAN4u9CdMX3f5fxnjsDZh32BbF-xxdzin8",
          },
        }
      );

      const data = response.data;
      if (data.status !== "OK") {
        console.error(data);
        alert(`Google API Error: ${data.status}`);
        return;
      }

      setResults(
        data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          address: place.vicinity,
        }))
      );
    } catch (error) {
      console.error("Axios error:", error);
      alert("Failed to fetch nearby places.");
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex items-center w-full space-x-2">
        <input
          type="text"
          placeholder="Search nearby..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSearch} className="bg-blue-600 custom-text-black">
          <Search className="w-4 h-4 mr-1" /> Search
        </Button>
        <Button onClick={handleLocation} variant="outline" className="custom-text-black border-black hover:bg-gray-200">
          <MapPin className="w-4 h-4 mr-1" /> Use my location
        </Button>
      </div>

      <div className="w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={location || defaultCenter}
        >
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