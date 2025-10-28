import { useState, useEffect } from "react";

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

const SAMPLE_DATA = [
  {
    id: "sample1",
    magnitude: 5.2,
    place: "Sample Earthquake - California",
    time: Date.now() - 3600000,
    updated: Date.now(),
    url: "https://earthquake.usgs.gov/",
    tsunami: 0,
    coordinates: { longitude: -118.2437, latitude: 34.0522, depth: 10 },
  },
  {
    id: "sample2",
    magnitude: 4.1,
    place: "Sample Earthquake - Japan",
    time: Date.now() - 7200000,
    updated: Date.now(),
    url: "https://earthquake.usgs.gov/",
    tsunami: 0,
    coordinates: { longitude: 139.6917, latitude: 35.6895, depth: 35 },
  },
];

export const useEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const transformedData = data.features.map((feature) => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        place: feature.properties.place,
        time: feature.properties.time,
        updated: feature.properties.updated,
        url: feature.properties.url,
        tsunami: feature.properties.tsunami,
        coordinates: {
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          depth: feature.geometry.coordinates[2],
        },
      }));

      setEarthquakes(transformedData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching earthquake data:", err);
      console.log("📝 Using sample data...");
      setEarthquakes(SAMPLE_DATA); // Use sample data as fallback
      setError(null); // Don't show error if we have sample data
      setLastUpdated(new Date());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    earthquakes,
    loading,
    error,
    lastUpdated,
    refetch: fetchEarthquakes,
  };
};
