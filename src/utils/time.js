function formatTimeComponent(component) {
  // Add a leading zero if the component is less than 10
  return component < 10 ? '0' + component : component.toString();
}

function findEarliestAndLatestTime(timeArray) {
  let earliestHours = 24; // Initialize with a value greater than possible hours
  let earliestMinutes = 60; // Initialize with a value greater than possible minutes
  let earliestSeconds = 60; // Initialize with a value greater than possible seconds
  let latestHours = -1;
  let latestMinutes = -1;
  let latestSeconds = -1;

  for (const timeObj of timeArray) {
    const { hours, minutes, seconds } = timeObj;

    // Check for earliest time
    if (hours < earliestHours ||
      (hours === earliestHours && minutes < earliestMinutes) ||
      (hours === earliestHours && minutes === earliestMinutes && seconds < earliestSeconds)) {
      earliestHours = hours;
      earliestMinutes = minutes;
      earliestSeconds = seconds;
    }

    // Check for latest time
    if (hours > latestHours ||
      (hours === latestHours && minutes > latestMinutes) ||
      (hours === latestHours && minutes === latestMinutes && seconds > latestSeconds)) {
      latestHours = hours;
      latestMinutes = minutes;
      latestSeconds = seconds;
    }
  }

  // Format the results as HH:MM:SS
  const formattedEarliestTime = `${formatTimeComponent(earliestHours)}:${formatTimeComponent(earliestMinutes)}:${formatTimeComponent(earliestSeconds)}`;
  const formattedLatestTime = `${formatTimeComponent(latestHours)}:${formatTimeComponent(latestMinutes)}:${formatTimeComponent(latestSeconds)}`;

  return { earliestTime: formattedEarliestTime, latestTime: formattedLatestTime };
}

// Function to extract time from a event
function extractTime(event) {
  const timeMatch = event.match(/^(\d{2}):(\d{2}):(\d{2})/);

  if (timeMatch) {
    // Extract hours, minutes, and seconds separately
    const [fullMatch, hours, minutes, seconds] = timeMatch;

    return {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10),
    };
  }

  return null;
}
module.exports = { findEarliestAndLatestTime, extractTime }
