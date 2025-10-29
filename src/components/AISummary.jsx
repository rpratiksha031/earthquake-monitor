import React, { useState } from "react";
import {
  generateGlobalSummary,
  generateSafetyTips,
  analyzeTrends,
} from "../services/aiService";

const AISummary = ({ earthquakes }) => {
  const [summary, setSummary] = useState("");
  const [safetyTips, setSafetyTips] = useState("");
  const [trends, setTrends] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [error, setError] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const generateSummaries = async () => {
    if (earthquakes.length === 0) {
      setError("No earthquake data available to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    setIsExpanded(true);

    try {
      const [summaryText, tipsText, trendsText] = await Promise.all([
        generateGlobalSummary(earthquakes),
        generateSafetyTips(earthquakes),
        analyzeTrends(earthquakes),
      ]);

      setSummary(summaryText);
      setSafetyTips(tipsText);
      setTrends(trendsText);
      setIsGenerated(true);
    } catch (err) {
      setError("Failed to generate AI insights. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (earthquakes.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-2xl p-6 mb-6 border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🤖 AI-Powered Insights
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Intelligent analysis of {earthquakes.length} earthquake
              {earthquakes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Toggle Expand/Collapse */}
        {isGenerated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-white"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Generate Button (shown when not generated or collapsed) */}
      {!isGenerated || !isExpanded ? (
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isGenerated ? "AI Summary Ready" : "Get AI-Powered Analysis"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isGenerated
                ? "Click below to refresh the analysis with latest data"
                : "Generate intelligent insights, safety tips, and trend analysis"}
            </p>
          </div>

          <button
            onClick={generateSummaries}
            disabled={loading}
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
          >
            <svg
              className={`w-6 h-6 ${
                loading
                  ? "animate-spin"
                  : "group-hover:rotate-12 transition-transform"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 7H7v6h6V7z" />
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {loading
                ? "Analyzing Data..."
                : isGenerated
                ? "🔄 Refresh AI Analysis"
                : "✨ Generate AI Summary"}
            </span>
          </button>

          {loading && (
            <div className="mt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                AI is analyzing {earthquakes.length} earthquakes...
              </p>
            </div>
          )}
        </div>
      ) : null}

      {/* Content - Only shown when expanded */}
      {isGenerated && isExpanded && !loading && (
        <>
          {/* Refresh Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={generateSummaries}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
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
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white bg-opacity-50 p-1 rounded-xl">
            {[
              { id: "summary", label: "📊 Summary", icon: "📊" },
              { id: "safety", label: "🛡️ Safety Tips", icon: "🛡️" },
              { id: "trends", label: "📈 Trends", icon: "📈" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:bg-white hover:bg-opacity-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-inner">
            {error ? (
              <div className="text-center py-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-red-600 font-semibold mb-2">{error}</p>
              </div>
            ) : (
              <>
                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">
                          Global Seismic Activity Summary
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Tab */}
                {activeTab === "safety" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">
                          Safety Recommendations
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {safetyTips}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trends Tab */}
                {activeTab === "trends" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">
                          Trend Analysis
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {trends}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>⚠️ Disclaimer:</strong> AI-generated insights are for
              informational purposes only. Always follow official emergency
              guidelines and consult USGS for authoritative information.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AISummary;
