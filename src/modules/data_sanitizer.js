
/**
 * @fileOverview data_sanitizer
 * @module DataSanitizer
 * @description
 * The `DataSanitizer` module exports functions to sanitize and prepare data for processing.
 * These functions collectively address incomplete entries, remove invalid data, and ensure
 * proper formatting to produce clean and usable data.
 *
 */

const {sortEvents} = require("./common/helper");
const { extractTime,findEarliestAndLatestTime } = require("../utils/time");

function sanitizeAndPrepareUserSessions(data) {
  // Split the data into events
  let events = data.split('\n');
  events = filterValidEvents(events)
  events = sortEvents(events)

  if (events.length == 0) {
    return []
  } else {
    // Extract times from each event
    const times = events.map((event) => extractTime(event));

    const { earliestTime, latestTime } = findEarliestAndLatestTime(times);

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

module.exports = {
  sanitizeAndPrepareUserSessions,
};



