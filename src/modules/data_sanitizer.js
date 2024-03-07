
/**
 * @fileOverview data_sanitizer
 * @module DataSanitizer
 * @description
 * The `DataSanitizer` module exports functions to sanitize and prepare data for processing.
 * These functions collectively address incomplete entries, remove invalid data, and ensure
 * proper formatting to produce clean and usable data.
 *
 */

function sanitizeAndPrepareUserSessions(data) {
  // Split the data into events
  let events = data.split('\n');
  events = filterValidEvents(events)

  if (events.length == 0) {
    return []
  } else {
    // Extract times from each event
    const times = events.map((event) => extractTime(event));

    const earliestTime = formatTime(findEarliestTime(times));
    const latestTime = formatTime(findLatestTime(times));

    const completedEventSeries = fillMissingSessions(events, earliestTime, latestTime)

    return completedEventSeries;
  }

}

// Assuming that there can be only one missing  event in session pair/user
function fillMissingSessions(events, earliestTime, latestTime) {
  const ST = earliestTime; // Constant start time
  const ET = latestTime; // Constant end time

  const sessions = new Map(); // Map to store active sessions

  const result = [];

  for (const event of events) {
    const [time, user, action] = event.split(" ");
    const key = `${user} ${action}`;

    if (action === "Start") {
      // Start event: add to active sessions
      sessions.set(user, time);
    } else if (action === "End") {
      // End event: check if matching start exists
      if (sessions.has(user)) {
        // Matching start found
        result.push(`${sessions.get(user)} ${user} Start`);
        result.push(`${time} ${user} End`);
        sessions.delete(user);
      } else {
        // No matching start, use constant start time
        result.push(`${ST} ${user} Start`);
        result.push(`${time} ${user} End`);
      }
    }
  }

  // Add remaining active sessions
  for (const [user, startTime] of sessions) {
    result.push(`${startTime} ${user} Start`);
    result.push(`${ET} ${user} End`);
  }

  return result;
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

function findEarliestTime(times) {
  const filteredTimes = times.filter((time) => time !== null);

  if (filteredTimes.length === 0) {
    return null; // No valid times
  }

  const earliestHours = Math.min(...filteredTimes.map((time) => time.hours));
  const earliestMinutes = Math.min(...filteredTimes.map((time) => time.minutes));
  const earliestSeconds = Math.min(...filteredTimes.map((time) => time.seconds));

  return {
    hours: earliestHours,
    minutes: earliestMinutes,
    seconds: earliestSeconds,
  };
}

function findLatestTime(times) {
  const filteredTimes = times.filter((time) => time !== null);

  if (filteredTimes.length === 0) {
    return null; // No valid times
  }

  const latestHours = Math.max(...filteredTimes.map((time) => time.hours));
  const latestMinutes = Math.max(...filteredTimes.map((time) => time.minutes));
  const latestSeconds = Math.max(...filteredTimes.map((time) => time.seconds));

  return {
    hours: latestHours,
    minutes: latestMinutes,
    seconds: latestSeconds,
  };
}

function filterValidEvents(events) {
  return events.filter((event) => isValidEvent(escapeInvalidCharacters(event)));
}
// Function to check if a event meets the criteria
function isValidEvent(event) {
  event = removeExtraSpaces(event)
  // Check if the event contains "Start" or "End" and has an alphanumeric string
  const hasStartOrEnd = /\b(Start|End)\b/.test(event);
  const hasAlphanumericString = /\b[A-Za-z0-9]+\b/.test(event);

 // Check if the event has a valid time format (HH:MM:SS)
  const hasValidTimeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(event.split(' ')[0]);

  const hasThreeTokens = event.split(' ').length === 3;

  // Check if the event is not partially complete, contains three token, and has an exact match for "Start" or "End"
  const isValid = hasStartOrEnd && hasAlphanumericString && hasThreeTokens && hasValidTimeFormat;

  return isValid;
}

function removeExtraSpaces(inputString) {
  // Replace multiple spaces with a single space
  const trimmedString = inputString.replace(/\s+/g, " ");

  // Remove leading and trailing spaces
  const finalString = trimmedString.trim();

  return finalString;
}


function escapeInvalidCharacters(event) {
  // Replace invalid characters with a placeholder or an empty string
  const escapedEvent = event.replace(/[&<>"']/g, ''); // Example: Replace with an empty string

  return escapedEvent;
}

function extractUsername(event) {
  // Assumed the username is the string between the last space and the word "Start" or "End"
  const startIdx = event.lastIndexOf(' ') + 1;
  const endIdx = event.includes('Start') ? event.indexOf('Start') : event.indexOf('End');

  return event.substring(startIdx, endIdx).trim();
}

function formatTime(timeObj) {

  const { hours, minutes, seconds } = timeObj;

  const formattedHours = hours < 10 ? '0' + hours : (hours < 24 ? hours : hours % 12);
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


module.exports = {
  sanitizeAndPrepareUserSessions,
};



