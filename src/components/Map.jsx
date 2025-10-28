import React, { useMemo, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import {
  getMagnitudeColor,
  getMagnitudeSize,
  formatDate,
  formatDepth,
  getTimeAgo,
} from "../utils/helpers";

// Simple map controller
const MapController = ({ selectedEarthquake }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquake) {
      map.setView(
        [
          selectedEarthquake.coordinates.latitude,
          selectedEarthquake.coordinates.longitude,
        ],
        6
      );
    }
  }, [selectedEarthquake, map]);

  return null;
};

// Lightweight marker component
const QuickMarker = React.memo(({ earthquake, isSelected, onSelect }) => {
  const position = [
    earthquake.coordinates.latitude,
    earthquake.coordinates.longitude,
  ];
  const color = getMagnitudeColor(earthquake.magnitude);
  const size = getMagnitudeSize(earthquake.magnitude);

  return (
    <CircleMarker
      center={position}
      radius={size}
      pathOptions={{
        fillColor: color,
        fillOpacity: isSelected ? 0.9 : 0.6,
        color: "#fff",
        weight: isSelected ? 2 : 1,
      }}
      eventHandlers={{
        click: () => onSelect(earthquake),
      }}
    >
      <Popup>
        <div className="min-w-60">
          {/* Simple header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow"
              style={{ backgroundColor: color }}
            >
              {earthquake.magnitude.toFixed(1)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-gray-800 leading-tight">
                {earthquake.place}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {getTimeAgo(earthquake.time)}
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="space-y-1.5 text-xs mb-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium text-gray-800">
                {formatDate(earthquake.time).split(",")[1]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Depth:</span>
              <span className="font-medium text-gray-800">
                {formatDepth(earthquake.coordinates.depth)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-800 text-right">
                {earthquake.coordinates.latitude.toFixed(2)}°,{" "}
                {earthquake.coordinates.longitude.toFixed(2)}°
              </span>
            </div>
          </div>

          {/* Tsunami warning */}
          {earthquake.tsunami === 1 && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded text-center font-semibold mb-2">
              ⚠️ Tsunami Warning
            </div>
          )}

          {/* Link */}
          <a
            href={earthquake.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            More Details →
          </a>
        </div>
      </Popup>
    </CircleMarker>
  );
});

QuickMarker.displayName = "QuickMarker";

// Main Map Component
const Map = ({ earthquakes, selectedEarthquake, onEarthquakeSelect }) => {
  // Only show earthquakes above a certain magnitude for better performance
  const visibleEarthquakes = useMemo(() => {
    // Limit to 500 markers for performance
    return earthquakes.slice(0, 500);
  }, [earthquakes]);

  const handleMarkerClick = useCallback(
    (earthquake) => {
      onEarthquakeSelect(earthquake);
    },
    [onEarthquakeSelect]
  );

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-xl border-2 border-gray-200 relative">
      {/* Simple stats overlay */}
      <div className="absolute top-3 right-3 z-1000 bg-white rounded-lg shadow-lg px-3 py-2">
        <div className="text-xs text-gray-600">Showing</div>
        <div className="text-xl font-bold text-gray-800">
          {visibleEarthquakes.length}
        </div>
        <div className="text-xs text-gray-500">events</div>
      </div>

      {/* Simple legend */}
      <div className="absolute bottom-3 right-3 z-1000 bg-white rounded-lg shadow-lg p-2">
        <div className="text-xs font-bold text-gray-700 mb-1.5">Magnitude</div>
        <div className="space-y-1">
          {[
            { label: "6.0+", mag: 6 },
            { label: "5.0+", mag: 5 },
            { label: "4.0+", mag: 4 },
            { label: "3.0+", mag: 3 },
            { label: "<3.0", mag: 2 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: getMagnitudeColor(item.mag) }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        className="h-full w-full"
        scrollWheelZoom={true}
        zoomControl={true}
        preferCanvas={true} // Better performance
      >
        {/* Simple, fast map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          updateWhenIdle={true}
          keepBuffer={2}
        />

        <MapController selectedEarthquake={selectedEarthquake} />

        {/* Simple markers */}
        {visibleEarthquakes.map((earthquake) => (
          <QuickMarker
            key={earthquake.id}
            earthquake={earthquake}
            isSelected={selectedEarthquake?.id === earthquake.id}
            onSelect={handleMarkerClick}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
