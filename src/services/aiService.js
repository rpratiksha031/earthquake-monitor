/**
 * Rule-based AI Summary Generator
 * No API key required - works offline!
 */

/**
 * Generate global summary based on earthquake data
 */
export const generateGlobalSummary = async (earthquakes) => {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (earthquakes.length === 0) {
    return "No earthquake activity detected in the last 24 hours. Seismic conditions appear calm globally.";
  }

  const stats = calculateStats(earthquakes);

  // Determine activity level
  let activityLevel = "Low";
  if (stats.total > 200 || stats.maxMagnitude >= 6) activityLevel = "High";
  else if (stats.total > 100 || stats.maxMagnitude >= 5)
    activityLevel = "Moderate";

  // Build intelligent summary
  let summary = `**Seismic Activity Level: ${activityLevel}**\n\n`;

  // Key findings
  summary += `In the past 24 hours, ${stats.total} earthquakes have been recorded globally. `;

  if (stats.maxMagnitude >= 6.0) {
    summary += `⚠️ Significant activity detected with a maximum magnitude of ${stats.maxMagnitude.toFixed(
      1
    )}, which is considered major. `;
  } else if (stats.maxMagnitude >= 5.0) {
    summary += `Notable activity with a maximum magnitude of ${stats.maxMagnitude.toFixed(
      1
    )}, classified as strong. `;
  } else {
    summary += `The largest event measured ${stats.maxMagnitude.toFixed(
      1
    )} on the Richter scale. `;
  }

  // Average magnitude context
  if (stats.avgMagnitude < 2.5) {
    summary += `Most events are minor (average magnitude ${stats.avgMagnitude.toFixed(
      1
    )}), typical of normal tectonic activity. `;
  } else if (stats.avgMagnitude < 4.0) {
    summary += `Average magnitude of ${stats.avgMagnitude.toFixed(
      1
    )} indicates moderate seismic activity. `;
  } else {
    summary += `Higher than usual average magnitude (${stats.avgMagnitude.toFixed(
      1
    )}) suggests increased seismic stress. `;
  }

  // Tsunami warnings
  if (stats.tsunamiWarnings > 0) {
    summary += `\n\n🌊 **${stats.tsunamiWarnings} tsunami warning${
      stats.tsunamiWarnings > 1 ? "s" : ""
    } currently active.** Coastal residents should follow local emergency instructions. `;
  }

  // Geographic distribution
  if (stats.topRegions.length > 0) {
    summary += `\n\nMost affected regions: ${stats.topRegions
      .slice(0, 3)
      .join(", ")}. `;
  }

  // Scientific insight
  summary += `\n\nThese seismic events are part of Earth's natural tectonic processes. `;
  if (stats.significantEvents > 5) {
    summary += `The ${stats.significantEvents} significant events (M4.5+) warrant monitoring by seismological institutes.`;
  } else {
    summary += `Activity levels are within normal parameters for global seismic patterns.`;
  }

  return summary;
};

/**
 * Generate earthquake-specific insight
 */
export const generateEarthquakeInsight = async (earthquake) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mag = earthquake.magnitude;
  const depth = earthquake.coordinates.depth;

  let insight = "";

  // Magnitude explanation
  if (mag >= 7.0) {
    insight += `This is a major earthquake that can cause serious damage over large areas. `;
  } else if (mag >= 6.0) {
    insight += `This is a strong earthquake that can cause significant damage in populated areas. `;
  } else if (mag >= 5.0) {
    insight += `This moderate earthquake can cause damage to poorly constructed buildings. `;
  } else if (mag >= 4.0) {
    insight += `This light earthquake is often felt but rarely causes damage. `;
  } else if (mag >= 3.0) {
    insight += `This minor earthquake is typically felt by people but causes minimal damage. `;
  } else {
    insight += `This micro earthquake is usually not felt by people and is detected only by seismographs. `;
  }

  // Depth analysis
  if (depth < 70) {
    insight += `At ${depth.toFixed(
      1
    )}km depth (shallow focus), the energy reaches the surface more intensely, potentially causing stronger shaking. `;
  } else if (depth < 300) {
    insight += `The intermediate depth of ${depth.toFixed(
      1
    )}km means some energy is absorbed before reaching the surface. `;
  } else {
    insight += `This deep earthquake (${depth.toFixed(
      1
    )}km) typically causes less surface damage as energy dissipates over distance. `;
  }

  // Impact assessment
  const expectedImpact = getExpectedImpact(mag, depth);
  insight += expectedImpact;

  return insight;
};

/**
 * Generate safety tips
 */
export const generateSafetyTips = async (earthquakes) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (earthquakes.length === 0) {
    return "No active earthquakes. Stay prepared with emergency supplies and family communication plans.";
  }

  const stats = calculateStats(earthquakes);
  let tips = "";

  if (stats.maxMagnitude >= 5.0) {
    tips += `**High Activity Alert:**\n\n`;
    tips += `• **Drop, Cover, Hold On** - Practice this response immediately during shaking.\n`;
    tips += `• **Prepare emergency kits** with water, food, flashlight, and first aid supplies.\n`;
    tips += `• **Identify safe spots** in each room - under sturdy furniture, away from windows.\n`;
    tips += `• **Secure heavy items** that could fall during aftershocks.\n`;
  } else if (stats.maxMagnitude >= 3.0) {
    tips += `**Moderate Activity - Stay Prepared:**\n\n`;
    tips += `• **Check emergency supplies** - ensure you have 3 days of water and food per person.\n`;
    tips += `• **Review evacuation routes** and meet-up locations with family.\n`;
    tips += `• **Secure breakables** and move heavy items to lower shelves.\n`;
    tips += `• **Keep shoes and flashlight** near your bed in case of nighttime events.\n`;
  } else {
    tips += `**General Preparedness:**\n\n`;
    tips += `• **Create a family emergency plan** including communication and meeting points.\n`;
    tips += `• **Build an emergency kit** with essentials for 72 hours.\n`;
    tips += `• **Learn how to turn off utilities** (gas, water, electricity) in your home.\n`;
    tips += `• **Practice "Drop, Cover, Hold On"** drills regularly.\n`;
  }

  if (stats.tsunamiWarnings > 0) {
    tips += `\n**🌊 Tsunami Alert:**\n`;
    tips += `• **Move to higher ground immediately** if you're in a coastal area.\n`;
    tips += `• **Do NOT return** until authorities declare it safe.\n`;
  }

  tips += `\n\n*Remember: Most earthquake injuries come from falling objects, not building collapse.*`;

  return tips;
};

/**
 * Analyze trends
 */
export const analyzeTrends = async (earthquakes) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (earthquakes.length === 0) {
    return "Insufficient data to analyze trends. Seismic activity appears minimal.";
  }

  const stats = calculateStats(earthquakes);
  const distribution = stats.distribution;

  let analysis = "";

  // Pattern analysis
  const ratio =
    distribution.minor / Math.max(distribution.major + distribution.strong, 1);

  if (ratio > 100) {
    analysis += `**Normal Seismic Pattern Detected**\n\n`;
    analysis += `The distribution shows a healthy pyramid structure with ${distribution.minor} minor events and few major ones. This follows the Gutenberg-Richter law, which states that for every large earthquake, there are roughly 10 times as many smaller ones. `;
  } else if (ratio > 50) {
    analysis += `**Typical Activity Distribution**\n\n`;
    analysis += `Current distribution (${distribution.minor} minor, ${distribution.strong} strong, ${distribution.major} major) aligns with expected seismic patterns. `;
  } else {
    analysis += `**Unusual Distribution Pattern**\n\n`;
    analysis += `Higher proportion of significant events (${distribution.strong} strong, ${distribution.major} major) compared to minor ones (${distribution.minor}). This may indicate increased tectonic stress in certain regions. `;
  }

  // Depth patterns
  const avgDepth =
    earthquakes.reduce((sum, eq) => sum + eq.coordinates.depth, 0) /
    earthquakes.length;
  if (avgDepth < 50) {
    analysis += `\n\nMost earthquakes are shallow (avg ${avgDepth.toFixed(
      1
    )}km), which typically indicates activity along plate boundaries or fault lines. `;
  } else if (avgDepth > 100) {
    analysis += `\n\nDeeper than average earthquakes (${avgDepth.toFixed(
      1
    )}km) suggest subduction zone activity. `;
  }

  // Geographic clustering
  analysis += `\n\n**Scientific Context:** `;
  if (stats.significantEvents > 10) {
    analysis += `The ${stats.significantEvents} significant events in 24 hours is above baseline, suggesting either aftershock sequences or increased regional stress. Seismologists will monitor for potential larger events.`;
  } else {
    analysis += `This level of seismic activity (${stats.total} events) represents normal Earth dynamics, with tectonic plates constantly adjusting their positions.`;
  }

  return analysis;
};

// Helper Functions

function calculateStats(earthquakes) {
  const magnitudes = earthquakes.map((eq) => eq.magnitude);
  const maxMagnitude = Math.max(...magnitudes);
  const avgMagnitude =
    magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length;

  const distribution = {
    minor: earthquakes.filter((eq) => eq.magnitude < 3).length,
    light: earthquakes.filter((eq) => eq.magnitude >= 3 && eq.magnitude < 4)
      .length,
    moderate: earthquakes.filter((eq) => eq.magnitude >= 4 && eq.magnitude < 5)
      .length,
    strong: earthquakes.filter((eq) => eq.magnitude >= 5 && eq.magnitude < 6)
      .length,
    major: earthquakes.filter((eq) => eq.magnitude >= 6).length,
  };

  const tsunamiWarnings = earthquakes.filter((eq) => eq.tsunami === 1).length;
  const significantEvents = earthquakes.filter(
    (eq) => eq.magnitude >= 4.5
  ).length;

  // Extract regions (simplified)
  const regions = earthquakes.map((eq) => {
    const place = eq.place || "";
    const parts = place.split(",");
    return parts[parts.length - 1]?.trim() || "Unknown";
  });

  const regionCounts = {};
  regions.forEach((region) => {
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  const topRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([region]) => region)
    .filter((r) => r !== "Unknown");

  return {
    total: earthquakes.length,
    maxMagnitude,
    avgMagnitude,
    distribution,
    tsunamiWarnings,
    significantEvents,
    topRegions,
  };
}

function getExpectedImpact(magnitude, depth) {
  let impact = "";

  if (magnitude >= 7.0) {
    impact =
      "Expected impact: Widespread heavy damage, possible casualties. Emergency response critical.";
  } else if (magnitude >= 6.0) {
    impact =
      "Expected impact: Moderate to heavy damage in populated areas, potential injuries.";
  } else if (magnitude >= 5.0) {
    impact =
      "Expected impact: Damage to weak structures, generally safe in modern buildings.";
  } else if (magnitude >= 4.0) {
    impact =
      "Expected impact: Noticeable shaking, minimal risk of structural damage.";
  } else if (magnitude >= 3.0) {
    impact = "Expected impact: Felt indoors, no damage expected.";
  } else {
    impact = "Expected impact: Generally not felt, no damage.";
  }

  if (depth > 100) {
    impact += " Deep focus reduces surface intensity.";
  } else if (depth < 30) {
    impact += " Shallow depth may increase local intensity.";
  }

  return impact;
}
