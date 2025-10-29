import React, { useState } from "react";
import { generateEarthquakeInsight } from "../services/aiService";

const AIInsightButton = ({ earthquake }) => {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGetInsight = async () => {
    setShowModal(true);

    // Only generate if not already generated
    if (!hasGenerated) {
      setLoading(true);
      const insightText = await generateEarthquakeInsight(earthquake);
      setInsight(insightText);
      setHasGenerated(true);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const insightText = await generateEarthquakeInsight(earthquake);
    setInsight(insightText);
    setLoading(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={handleGetInsight}
        className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
        Ask AI About This Event
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🤖 AI Insight
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <strong>M {earthquake.magnitude.toFixed(1)}</strong> -{" "}
                {earthquake.place}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-600">AI is analyzing...</p>
                </div>
              </div>
            ) : insight ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {insight}
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  className="w-full mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
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
                  Refresh Analysis
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Click generate to get AI insights
                </p>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIInsightButton;
