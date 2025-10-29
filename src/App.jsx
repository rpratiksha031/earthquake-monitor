import React, { useState, useMemo } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import Statistics from "./components/Statistics";
import { useEarthquakes } from "./hooks/useEarthquakes";
import AISummary from "./components/AISummary";

function App() {
  const { earthquakes, loading, error, lastUpdated, refetch } =
    useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [filters, setFilters] = useState({
    minMagnitude: 0,
    maxMagnitude: 10,
    searchText: "",
    showTsunamiOnly: false,
    showSignificantOnly: false,
  });

  // FIXED: Better search filtering
  const filteredEarthquakes = useMemo(() => {
    return earthquakes.filter((eq) => {
      // Magnitude filter
      if (
        eq.magnitude < filters.minMagnitude ||
        eq.magnitude > filters.maxMagnitude
      ) {
        return false;
      }

      // FIXED Search text filter - case insensitive
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase().trim();
        const placeLower = (eq.place || "").toLowerCase();

        if (!placeLower.includes(searchLower)) {
          return false;
        }
      }

      // Tsunami filter
      if (filters.showTsunamiOnly && eq.tsunami !== 1) {
        return false;
      }

      // Significant events filter
      if (filters.showSignificantOnly && eq.magnitude < 4.5) {
        return false;
      }

      return true;
    });
  }, [earthquakes, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      minMagnitude: 0,
      maxMagnitude: 10,
      searchText: "",
      showTsunamiOnly: false,
      showSignificantOnly: false,
    });
  };

  if (loading && earthquakes.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-8 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-30">
            <p className="text-3xl font-bold text-white mb-3">
              Loading Earthquake Data
            </p>
            <p className="text-white text-opacity-90 text-lg mb-4">
              Fetching latest information from USGS...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Oops! Error Loading Data
            </h2>
            <p className="text-gray-600 mb-6 text-lg">{error}</p>
            <button
              onClick={refetch}
              className="w-full bg-linear-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white bg-opacity-80 backdrop-blur-lg shadow-xl border-b-4 border-linear-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 p-4 rounded-2xl shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🌍 Earthquake Monitor
                </h1>
                <p className="text-sm text-gray-600 font-semibold mt-1 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Real-time tracking • {earthquakes.length} events loaded
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="hidden md:block text-right bg-linear-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border-2 border-blue-200 shadow-md">
                  <p className="text-xs text-gray-600 font-semibold flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Last updated
                  </p>
                  <p className="text-base font-bold text-gray-800">
                    {lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              )}
              <button
                onClick={refetch}
                disabled={loading}
                className="group relative bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg
                  className={`w-6 h-6 ${
                    loading
                      ? "animate-spin"
                      : "group-hover:rotate-180 transition-transform duration-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8">
        {/* Statistics */}
        <Statistics earthquakes={filteredEarthquakes} />

        <AISummary earthquakes={filteredEarthquakes} />

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Results count */}
        {filteredEarthquakes.length !== earthquakes.length && (
          <div className="mb-6 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                  <svg
                    className="w-6 h-6"
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
                <div>
                  <p className="font-bold text-lg">
                    Showing {filteredEarthquakes.length} of {earthquakes.length}{" "}
                    earthquakes
                  </p>
                  <p className="text-sm text-white text-opacity-90">
                    {earthquakes.length - filteredEarthquakes.length} filtered
                    out
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Map and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 h-[600px] transform hover:scale-[1.01] transition-transform duration-300">
            <Map
              earthquakes={filteredEarthquakes}
              selectedEarthquake={selectedEarthquake}
              onEarthquakeSelect={setSelectedEarthquake}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 h-[600px]">
            <Sidebar
              earthquakes={filteredEarthquakes}
              selectedEarthquake={selectedEarthquake}
              onEarthquakeSelect={setSelectedEarthquake}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-16 shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                About
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Real-time earthquake monitoring system powered by USGS data.
                Track seismic activity worldwide with interactive
                visualizations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Data Source
              </h3>
              <a
                href="https://earthquake.usgs.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 font-semibold text-sm block mb-2 transition-colors"
              >
                → USGS Earthquake Hazards Program
              </a>
              <p className="text-gray-400 text-xs">Updated every 5 minutes</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Features
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✓ Real-time updates</li>
                <li>✓ Interactive map</li>
                <li>✓ Advanced filtering</li>
                <li>✓ Tsunami warnings</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Earthquake Monitor. Earthquakes from the last 24 hours.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
