import React from "react";
import EarthquakeList from "./EarthquakeList";
import Legend from "./Legend";

const Sidebar = ({ earthquakes, selectedEarthquake, onEarthquakeSelect }) => {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex-1 min-h-0">
        <EarthquakeList
          earthquakes={earthquakes}
          selectedEarthquake={selectedEarthquake}
          onEarthquakeSelect={onEarthquakeSelect}
        />
      </div>
      <Legend />
    </div>
  );
};

export default Sidebar;
