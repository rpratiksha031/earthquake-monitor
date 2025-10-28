import React from "react";
import { getMagnitudeLabel } from "../utils/helpers";

const Statistics = ({ earthquakes }) => {
  const stats = React.useMemo(() => {
    const total = earthquakes.length;
    const magnitudes = earthquakes.map((eq) => eq.magnitude);
    const maxMagnitude = magnitudes.length ? Math.max(...magnitudes) : 0;
    const avgMagnitude = magnitudes.length
      ? magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length
      : 0;

    const tsunamiWarnings = earthquakes.filter((eq) => eq.tsunami === 1).length;

    return {
      total,
      maxMagnitude,
      avgMagnitude,
      tsunamiWarnings,
    };
  }, [earthquakes]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Earthquakes */}
      <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Events</p>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Maximum Magnitude */}
      <div className="bg-linear-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm font-medium">Max Magnitude</p>
            <p className="text-3xl font-bold mt-2">
              {stats.maxMagnitude.toFixed(1)}
            </p>
            <p className="text-red-100 text-xs mt-1">
              {getMagnitudeLabel(stats.maxMagnitude)}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Average Magnitude */}
      <div className="bg-linear-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Avg Magnitude</p>
            <p className="text-3xl font-bold mt-2">
              {stats.avgMagnitude.toFixed(1)}
            </p>
            <p className="text-yellow-100 text-xs mt-1">Last 24 hours</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tsunami Warnings */}
      <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">
              Tsunami Warnings
            </p>
            <p className="text-3xl font-bold mt-2">{stats.tsunamiWarnings}</p>
            <p className="text-purple-100 text-xs mt-1">Active alerts</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
