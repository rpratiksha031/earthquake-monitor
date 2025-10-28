import React from "react";
import {
  getMagnitudeColor,
  getMagnitudeLabel,
  formatDate,
  getTimeAgo,
  formatDepth,
} from "../utils/helpers";

const EarthquakeList = ({
  earthquakes,
  selectedEarthquake,
  onEarthquakeSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          Recent Earthquakes
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {earthquakes.length} events
        </span>
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#9ca3af #f3f4f6" }}
      >
        {earthquakes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">No earthquakes found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          earthquakes.map((earthquake) => (
            <div
              key={earthquake.id}
              onClick={() => onEarthquakeSelect(earthquake)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedEarthquake?.id === earthquake.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    style={{
                      backgroundColor: getMagnitudeColor(earthquake.magnitude),
                    }}
                  >
                    {earthquake.magnitude.toFixed(1)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                      {earthquake.place}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(earthquake.time)}
                    </p>
                  </div>
                </div>
                {earthquake.tsunami === 1 && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
                    🌊 Tsunami
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{formatDepth(earthquake.coordinates.depth)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{formatDate(earthquake.time).split(",")[1]}</span>
                </div>
              </div>

              <div className="mt-2">
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded"
                  style={{
                    backgroundColor:
                      getMagnitudeColor(earthquake.magnitude) + "20",
                    color: getMagnitudeColor(earthquake.magnitude),
                  }}
                >
                  {getMagnitudeLabel(earthquake.magnitude)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EarthquakeList;
