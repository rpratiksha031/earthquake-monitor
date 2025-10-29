export const generateGlobalSummary = async (earthquakes) => {
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

  // Build intelligent summary with clean formatting
  let summary = `SEISMIC ACTIVITY LEVEL: ${activityLevel.toUpperCase()}\n\n`;

  // Key findings
  summary += `In the past 24 hours, ${stats.total} earthquakes have been recorded globally. `;

  if (stats.maxMagnitude >= 6.0) {
    summary += `⚠️ Significant activity detected with a maximum magnitude of ${stats.maxMagnitude.toFixed(
      1
    )}, which is considered MAJOR. `;
  } else if (stats.maxMagnitude >= 5.0) {
    summary += `Notable activity with a maximum magnitude of ${stats.maxMagnitude.toFixed(
      1
    )}, classified as STRONG. `;
  } else {
    summary += `The largest event measured ${stats.maxMagnitude.toFixed(
      1
    )} on the Richter scale. `;
  }

  // Average magnitude context
  if (stats.avgMagnitude < 2.5) {
    summary += `Most events are minor (average magnitude ${stats.avgMagnitude.toFixed(
      1
    )}), typical of normal tectonic activity.\n\n`;
  } else if (stats.avgMagnitude < 4.0) {
    summary += `Average magnitude of ${stats.avgMagnitude.toFixed(
      1
    )} indicates moderate seismic activity.\n\n`;
  } else {
    summary += `Higher than usual average magnitude (${stats.avgMagnitude.toFixed(
      1
    )}) suggests increased seismic stress.\n\n`;
  }

  // Tsunami warnings
  if (stats.tsunamiWarnings > 0) {
    summary += `🌊 TSUNAMI ALERT: ${stats.tsunamiWarnings} tsunami warning${
      stats.tsunamiWarnings > 1 ? "s" : ""
    } currently active. Coastal residents should follow local emergency instructions immediately.\n\n`;
  }

  // Geographic distribution
  if (stats.topRegions.length > 0) {
    summary += `MOST AFFECTED REGIONS:\n${stats.topRegions
      .slice(0, 3)
      .map((r) => `• ${r}`)
      .join("\n")}\n\n`;
  }

  // Scientific insight
  summary += `SCIENTIFIC CONTEXT:\n`;
  summary += `These seismic events are part of Earth's natural tectonic processes. `;
  if (stats.significantEvents > 5) {
    summary += `The ${stats.significantEvents} significant events (M4.5+) warrant monitoring by seismological institutes. `;
  } else {
    summary += `Activity levels are within normal parameters for global seismic patterns. `;
  }

  // Additional context
  if (stats.maxMagnitude >= 5.0) {
    summary += `\n\nRECOMMENDATION: Residents in affected areas should review emergency preparedness plans and maintain awareness of aftershock potential.`;
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
    insight += `MAJOR EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis is a major earthquake that can cause serious damage over large areas. Buildings may suffer structural damage, and ground rupture is possible. `;
  } else if (mag >= 6.0) {
    insight += `STRONG EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis is a strong earthquake that can cause significant damage in populated areas. Modern buildings should withstand the shaking, but older structures may be vulnerable. `;
  } else if (mag >= 5.0) {
    insight += `MODERATE EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis moderate earthquake can cause damage to poorly constructed buildings. Well-built structures should remain largely intact. `;
  } else if (mag >= 4.0) {
    insight += `LIGHT EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis light earthquake is often felt by many people but rarely causes significant damage. Objects may shake, and some items might fall. `;
  } else if (mag >= 3.0) {
    insight += `MINOR EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis minor earthquake is typically felt by people indoors but causes minimal to no damage. `;
  } else {
    insight += `MICRO EARTHQUAKE (M${mag.toFixed(
      1
    )})\n\nThis micro earthquake is usually not felt by people and is detected only by sensitive seismographs. `;
  }

  // Depth analysis
  insight += `\n\nDEPTH ANALYSIS:\n`;
  if (depth < 70) {
    insight += `At ${depth.toFixed(
      1
    )} kilometers depth, this is classified as a shallow-focus earthquake. The energy reaches the surface more directly, potentially causing stronger shaking and more damage. Shallow earthquakes are generally more hazardous to structures and populations.`;
  } else if (depth < 300) {
    insight += `The intermediate depth of ${depth.toFixed(
      1
    )} kilometers means some seismic energy is absorbed by rock layers before reaching the surface. This typically results in less intense surface shaking compared to shallow earthquakes.`;
  } else {
    insight += `This deep earthquake (${depth.toFixed(
      1
    )} kilometers) is classified as deep-focus. At this depth, most energy dissipates before reaching the surface, usually causing less damage despite potentially high magnitude.`;
  }

  // Impact assessment
  insight += `\n\n${getExpectedImpact(mag, depth)}`;

  return insight;
};

/**
 * Generate safety tips
 */
export const generateSafetyTips = async (earthquakes) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (earthquakes.length === 0) {
    return "No active earthquakes detected. Maintain general preparedness:\n\n• Keep emergency supplies stocked\n• Review family communication plans\n• Secure heavy furniture and objects\n• Know how to Drop, Cover, and Hold On";
  }

  const stats = calculateStats(earthquakes);
  let tips = "";

  if (stats.maxMagnitude >= 5.0) {
    tips += `⚠️ HIGH ACTIVITY ALERT - IMMEDIATE ACTIONS:\n\n`;
    tips += `DROP, COVER, HOLD ON:\n`;
    tips += `• During shaking: Drop to hands and knees immediately\n`;
    tips += `• Take cover under sturdy furniture\n`;
    tips += `• Hold on until shaking stops\n`;
    tips += `• Stay away from windows and heavy objects\n\n`;

    tips += `EMERGENCY PREPAREDNESS:\n`;
    tips += `• Prepare emergency kits with 3-day supply of water (1 gallon per person per day)\n`;
    tips += `• Stock non-perishable food, flashlight, battery radio, first aid supplies\n`;
    tips += `• Charge all mobile devices immediately\n`;
    tips += `• Fill bathtubs with water for emergency use\n\n`;

    tips += `STRUCTURAL SAFETY:\n`;
    tips += `• Identify safe spots in each room (under desks, against interior walls)\n`;
    tips += `• Secure heavy items that could fall during aftershocks\n`;
    tips += `• Move beds away from windows and heavy furniture\n`;
    tips += `• Know location of utility shutoffs (gas, water, electricity)\n\n`;

    tips += `AFTERSHOCK AWARENESS:\n`;
    tips += `• Expect aftershocks - they can occur hours, days, or weeks later\n`;
    tips += `• Inspect your home for damage before re-entering\n`;
    tips += `• Be prepared to evacuate if instructed by authorities`;
  } else if (stats.maxMagnitude >= 3.0) {
    tips += `MODERATE ACTIVITY - STAY PREPARED:\n\n`;
    tips += `EMERGENCY SUPPLIES:\n`;
    tips += `• Verify you have 72-hour emergency kit ready\n`;
    tips += `• Water: 1 gallon per person per day for 3 days\n`;
    tips += `• Food: Non-perishable items for 3 days\n`;
    tips += `• Supplies: Flashlight, batteries, radio, first aid kit\n`;
    tips += `• Documents: Copies of important papers in waterproof container\n\n`;

    tips += `FAMILY PLANNING:\n`;
    tips += `• Review evacuation routes with all family members\n`;
    tips += `• Establish out-of-area contact person\n`;
    tips += `• Designate family meeting locations (near home and outside neighborhood)\n`;
    tips += `• Ensure everyone knows how to text (uses less bandwidth than calls)\n\n`;

    tips += `HOME SAFETY:\n`;
    tips += `• Secure breakables and move heavy items to lower shelves\n`;
    tips += `• Install safety latches on cabinet doors\n`;
    tips += `• Strap water heaters and anchor heavy appliances\n`;
    tips += `• Keep shoes and flashlight near your bed`;
  } else {
    tips += `GENERAL EARTHQUAKE PREPAREDNESS:\n\n`;
    tips += `CREATE FAMILY EMERGENCY PLAN:\n`;
    tips += `• Discuss earthquake risks with all family members\n`;
    tips += `• Choose emergency meeting places (one near home, one outside neighborhood)\n`;
    tips += `• Identify out-of-area contact for family communication\n`;
    tips += `• Practice "Drop, Cover, Hold On" drills regularly\n\n`;

    tips += `BUILD EMERGENCY KIT:\n`;
    tips += `• Water: 1 gallon per person per day (3-day supply)\n`;
    tips += `• Food: Non-perishable items for 3 days\n`;
    tips += `• Battery-powered or hand crank radio\n`;
    tips += `• Flashlight and extra batteries\n`;
    tips += `• First aid kit and essential medications\n`;
    tips += `• Whistle to signal for help\n`;
    tips += `• Dust masks and plastic sheeting\n\n`;

    tips += `HOME SAFETY MEASURES:\n`;
    tips += `• Learn how to shut off gas, water, and electricity\n`;
    tips += `• Secure heavy items and tall furniture to walls\n`;
    tips += `• Store hazardous materials safely\n`;
    tips += `• Identify safe spots in each room of your home`;
  }

  if (stats.tsunamiWarnings > 0) {
    tips += `\n\n🌊 TSUNAMI WARNING PROTOCOL:\n`;
    tips += `• Move to higher ground IMMEDIATELY if in coastal area\n`;
    tips += `• Travel inland at least 2 miles or 100 feet above sea level\n`;
    tips += `• Do NOT wait for official warning if you feel strong shaking\n`;
    tips += `• Stay away from coast until authorities declare all-clear\n`;
    tips += `• Remember: Tsunamis can arrive in multiple waves hours apart`;
  }

  tips += `\n\n📱 STAY INFORMED:\n`;
  tips += `• Monitor local news and emergency alerts\n`;
  tips += `• Follow official social media channels\n`;
  tips += `• Sign up for community warning systems\n`;
  tips += `• Keep battery-powered radio available`;

  tips += `\n\n⚠️ REMEMBER: Most earthquake injuries result from falling objects, not structural collapse. Preparation saves lives.`;

  return tips;
};

/**
 * Analyze trends
 */
export const analyzeTrends = async (earthquakes) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (earthquakes.length === 0) {
    return "Insufficient data to analyze trends. Current seismic activity appears minimal with no significant patterns detected.";
  }

  const stats = calculateStats(earthquakes);
  const distribution = stats.distribution;

  let analysis = "";

  // Pattern analysis
  const ratio =
    distribution.minor / Math.max(distribution.major + distribution.strong, 1);

  analysis += `EARTHQUAKE DISTRIBUTION ANALYSIS\n\n`;
  analysis += `24-Hour Event Breakdown:\n`;
  analysis += `• Minor (M<3.0): ${distribution.minor} events\n`;
  analysis += `• Light (M3.0-3.9): ${distribution.light} events\n`;
  analysis += `• Moderate (M4.0-4.9): ${distribution.moderate} events\n`;
  analysis += `• Strong (M5.0-5.9): ${distribution.strong} events\n`;
  analysis += `• Major (M6.0+): ${distribution.major} events\n\n`;

  // Gutenberg-Richter Analysis
  analysis += `PATTERN ASSESSMENT:\n`;
  if (ratio > 100) {
    analysis += `The current distribution follows the Gutenberg-Richter law closely, showing a normal pyramid structure. For every magnitude increase, there are approximately 10 times fewer earthquakes. This indicates typical tectonic plate behavior with no unusual stress patterns.\n\n`;
  } else if (ratio > 50) {
    analysis += `The distribution aligns with expected seismic patterns. The ratio of minor to major events falls within normal parameters for global tectonic activity. This suggests stable, predictable earthquake occurrence.\n\n`;
  } else {
    analysis += `UNUSUAL PATTERN DETECTED: Higher proportion of significant events compared to minor ones. This deviation from the Gutenberg-Richter relationship may indicate:\n`;
    analysis += `• Aftershock sequence from a major earthquake\n`;
    analysis += `• Increased tectonic stress in specific regions\n`;
    analysis += `• Swarm activity in volcanic areas\n`;
    analysis += `• Cluster of independent large events (statistically rare)\n\n`;
  }

  // Depth patterns
  const avgDepth =
    earthquakes.reduce((sum, eq) => sum + eq.coordinates.depth, 0) /
    earthquakes.length;
  analysis += `DEPTH CHARACTERISTICS:\n`;
  if (avgDepth < 50) {
    analysis += `Average depth: ${avgDepth.toFixed(1)} kilometers (SHALLOW)\n`;
    analysis += `Most earthquakes are occurring at shallow depths, typically indicating:\n`;
    analysis += `• Activity along plate boundaries or transform faults\n`;
    analysis += `• Crustal deformation in continental regions\n`;
    analysis += `• Higher potential for surface damage\n`;
    analysis += `• More intense ground shaking in affected areas\n\n`;
  } else if (avgDepth > 100) {
    analysis += `Average depth: ${avgDepth.toFixed(1)} kilometers (DEEP)\n`;
    analysis += `Deeper than average earthquakes suggest:\n`;
    analysis += `• Subduction zone activity (oceanic plate diving under continental plate)\n`;
    analysis += `• Energy dissipation before reaching surface\n`;
    analysis += `• Typically less surface damage despite magnitude\n`;
    analysis += `• Characteristic of Pacific Ring of Fire regions\n\n`;
  } else {
    analysis += `Average depth: ${avgDepth.toFixed(
      1
    )} kilometers (INTERMEDIATE)\n`;
    analysis += `Moderate depths indicate mixed tectonic processes with balanced surface impact potential.\n\n`;
  }

  // Scientific context
  analysis += `SCIENTIFIC CONTEXT:\n`;
  if (stats.significantEvents > 10) {
    analysis += `The ${stats.significantEvents} significant events (M4.5+) in 24 hours exceeds typical daily global average. `;
    analysis += `This elevated activity warrants monitoring for:\n`;
    analysis += `• Potential aftershock sequences\n`;
    analysis += `• Regional stress buildup\n`;
    analysis += `• Possible precursor patterns\n\n`;
    analysis += `Seismological institutes worldwide are tracking these events for pattern evolution.`;
  } else if (stats.significantEvents > 5) {
    analysis += `Current activity with ${stats.significantEvents} significant events represents slightly elevated but manageable seismic activity. `;
    analysis += `This is within the normal range of Earth's tectonic variability.`;
  } else {
    analysis += `With ${stats.total} total events, current activity represents normal Earth dynamics. `;
    analysis += `Tectonic plates are constantly adjusting their positions through these small energy releases, `;
    analysis += `which actually helps prevent larger stress accumulation.`;
  }

  // Global context
  analysis += `\n\nGLOBAL PERSPECTIVE:\n`;
  analysis += `Earth experiences approximately 50 earthquakes per day that are large enough to be felt, and about 20,000 per year total. `;
  analysis += `The current ${stats.total} events in 24 hours ${
    stats.total > 50 ? "is above" : "is within"
  } normal daily patterns.`;

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
  let impact = "EXPECTED IMPACT:\n";

  if (magnitude >= 7.0) {
    impact += "Severity: CRITICAL\n";
    impact += "• Widespread heavy damage to buildings and infrastructure\n";
    impact += "• Potential for casualties and injuries\n";
    impact += "• Emergency response and disaster relief critical\n";
    impact += "• Long-term recovery efforts likely needed";
  } else if (magnitude >= 6.0) {
    impact += "Severity: HIGH\n";
    impact += "• Moderate to heavy damage in populated areas\n";
    impact += "• Potential for injuries, especially in older buildings\n";
    impact += "• Infrastructure disruption possible\n";
    impact += "• Emergency services should be on alert";
  } else if (magnitude >= 5.0) {
    impact += "Severity: MODERATE\n";
    impact += "• Damage to weak or poorly constructed buildings\n";
    impact += "• Modern buildings generally safe\n";
    impact += "• Possible minor injuries from falling objects\n";
    impact += "• Check for structural damage after event";
  } else if (magnitude >= 4.0) {
    impact += "Severity: LOW\n";
    impact += "• Noticeable shaking, items may fall from shelves\n";
    impact += "• Minimal risk of structural damage\n";
    impact += "• Some people may be frightened\n";
    impact += "• Generally safe, minor precautions advised";
  } else if (magnitude >= 3.0) {
    impact += "Severity: MINIMAL\n";
    impact += "• Felt indoors by many people\n";
    impact += "• No structural damage expected\n";
    impact += "• Hanging objects may swing\n";
    impact += "• No safety concerns for buildings";
  } else {
    impact += "Severity: NEGLIGIBLE\n";
    impact += "• Generally not felt by people\n";
    impact += "• Detected only by seismographs\n";
    impact += "• No damage or safety concerns\n";
    impact += "• Part of normal seismic background activity";
  }

  if (depth > 100) {
    impact +=
      "\n\nDEPTH FACTOR: Deep focus earthquake - Surface intensity significantly reduced due to depth.";
  } else if (depth < 30) {
    impact +=
      "\n\nDEPTH FACTOR: Shallow earthquake - Local surface intensity may be amplified.";
  }

  return impact;
}
