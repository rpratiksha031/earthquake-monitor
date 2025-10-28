import React from "react";
import { getMagnitudeColor } from "../utils/helpers";

/**
 * Map legend showing magnitude categories
 */
const Legend = () => {
  const categories = [
    { label: "Minor", range: "< 3.0", magnitude: 2 },
    { label: "Light", range: "3.0 - 3.9", magnitude: 3 },
    { label: "Moderate", range: "4.0 - 4.9", magnitude: 4 },
    { label: "Strong", range: "5.0 - 5.9", magnitude: 5 },
    { label: "Major", range: "6.0+", magnitude: 6 },
  ];

  return (
    <div className="card">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Magnitude Scale
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.label} className="flex items-center">
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: getMagnitudeColor(category.magnitude) }}
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm text-gray-800">
                  {category.label}
                </span>
                <span className="text-xs text-gray-500">{category.range}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
