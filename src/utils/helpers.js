export const getMagnitudeColor = (magnitude) => {
  if (magnitude >= 6) return "#a855f7";
  if (magnitude >= 5) return "#ef4444";
  if (magnitude >= 4) return "#f97316";
  if (magnitude >= 3) return "#f59e0b";
  return "#10b981";
};

export const getMagnitudeSize = (magnitude) => {
  return Math.max(6, magnitude * 4);
};

export const getMagnitudeLabel = (magnitude) => {
  if (magnitude >= 6) return "Major";
  if (magnitude >= 5) return "Strong";
  if (magnitude >= 4) return "Moderate";
  if (magnitude >= 3) return "Light";
  return "Minor";
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

export const formatDepth = (depth) => {
  return `${depth.toFixed(1)} km`;
};
