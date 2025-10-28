import React, { useState, useEffect } from "react";

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const [searchInput, setSearchInput] = useState(filters.searchText);

  // Debounce search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange("searchText", searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, onFilterChange]);

  return (
    <div className="bg-linear-to-r from-white to-gray-50 rounded-2xl shadow-xl p-6 mb-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <div className="bg-linear-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Filter Earthquakes
        </h2>
        <button
          onClick={onReset}
          className="group relative px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold text-sm hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Reset All
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Minimum Magnitude */}
        <div className="group">
          <label className=" text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Min Magnitude
            </span>
            <span className="px-3 py-1 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
              {filters.minMagnitude.toFixed(1)}
            </span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.minMagnitude}
              onChange={(e) =>
                onFilterChange("minMagnitude", parseFloat(e.target.value))
              }
              className="w-full h-3 bg-linear-to-r from-green-200 to-green-400 rounded-full appearance-none cursor-pointer accent-green-600 shadow-inner"
              style={{
                background: `linear-linear(to right, #10b981 0%, #10b981 ${
                  filters.minMagnitude * 10
                }%, #e5e7eb ${filters.minMagnitude * 10}%, #e5e7eb 100%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-semibold">
            <span>0.0</span>
            <span>5.0</span>
            <span>10.0</span>
          </div>
        </div>

        {/* Maximum Magnitude */}
        <div className="group">
          <label className=" text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Max Magnitude
            </span>
            <span className="px-3 py-1 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-md">
              {filters.maxMagnitude.toFixed(1)}
            </span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.maxMagnitude}
              onChange={(e) =>
                onFilterChange("maxMagnitude", parseFloat(e.target.value))
              }
              className="w-full h-3 bg-linear-to-r from-red-200 to-red-400 rounded-full appearance-none cursor-pointer accent-red-600 shadow-inner"
              style={{
                background: `linear-linear(to right, #ef4444 0%, #ef4444 ${
                  filters.maxMagnitude * 10
                }%, #e5e7eb ${filters.maxMagnitude * 10}%, #e5e7eb 100%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-semibold">
            <span>0.0</span>
            <span>5.0</span>
            <span>10.0</span>
          </div>
        </div>

        {/* Search Location - FIXED */}
        <div className="group">
          <label className=" text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Search Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="e.g., California, Japan, India"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white hover:border-blue-300 shadow-sm"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchInput && (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Searching for: <strong>{searchInput}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Filters */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <div className="flex flex-wrap gap-4">
          {/* Tsunami Filter */}
          <label className="relative inline-flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.showTsunamiOnly}
              onChange={(e) =>
                onFilterChange("showTsunamiOnly", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 shadow-inner"></div>
            <span className="ml-3 text-sm font-bold text-gray-700 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
              <span className="text-2xl">🌊</span>
              <span>Tsunami Warnings Only</span>
            </span>
          </label>

          {/* Significant Events Filter */}
          <label className="relative inline-flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.showSignificantOnly}
              onChange={(e) =>
                onFilterChange("showSignificantOnly", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-yellow-500 peer-checked:to-orange-500 shadow-inner"></div>
            <span className="ml-3 text-sm font-bold text-gray-700 flex items-center gap-2 group-hover:text-yellow-600 transition-colors">
              <span className="text-2xl">⭐</span>
              <span>Significant Events (M 4.5+)</span>
            </span>
          </label>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.minMagnitude > 0 ||
        filters.maxMagnitude < 10 ||
        filters.searchText ||
        filters.showTsunamiOnly ||
        filters.showSignificantOnly) && (
        <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
          <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Active Filters:
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.minMagnitude > 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold border border-green-300">
                Min: {filters.minMagnitude.toFixed(1)}
              </span>
            )}
            {filters.maxMagnitude < 10 && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold border border-red-300">
                Max: {filters.maxMagnitude.toFixed(1)}
              </span>
            )}
            {filters.searchText && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold border border-blue-300">
                📍 {filters.searchText}
              </span>
            )}
            {filters.showTsunamiOnly && (
              <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold border border-cyan-300">
                🌊 Tsunami
              </span>
            )}
            {filters.showSignificantOnly && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold border border-yellow-300">
                ⭐ Significant
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
