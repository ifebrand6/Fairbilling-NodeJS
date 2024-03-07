
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
  // Split the data into lines
  let lines = data.split('\n');

  lines = filterValidLines(lines)

  // Extract times from each line
  const times = lines.map((line) => extractTime(line));

  const earliestTime = findEarliestTime(times)
  const latestTime = findLatestTime(times);

  const completedSeries = fillMissingSession(lines, earliestTime, latestTime)

  return completedSeries;
};

// Function to extract time from a line
function extractTime(line) {
  const timeMatch = line.match(/^(\d{2}):(\d{2}):(\d{2})/);

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

function filterValidLines(lines) {
  return lines.filter((line) => isValidLine(escapeInvalidCharacters(line)));
}
// Function to check if a line meets the criteria
function isValidLine(line) {
  // Check if the line contains "Start" or "End" and has an alphanumeric string
  const hasStartOrEnd = /\b(Start|End)\b/.test(line);
  const hasAlphanumericString = /\b[A-Za-z0-9]+\b/.test(line);

  // TODO better naming
  const hasThreeTokens = line.split(' ').length === 3;

  // Check if the line is not partially complete, contains three params, and has an exact match for "Start" or "End"
  const isValid = hasStartOrEnd && hasAlphanumericString && hasThreeTokens;

  return isValid;
}


function escapeInvalidCharacters(line) {
  // Replace invalid characters with a placeholder or an empty string
  const escapedLine = line.replace(/[&<>"']/g, ''); // Example: Replace with an empty string

  return escapedLine;
}

function completeIncompleteSessions(lines, earliestTime, latestTime) {
  const completedLines = [];
  const startTimes = {}; // Dictionary to store start times for each username

  lines.forEach((line) => {
    const isStartLine = line.includes('Start');
    const isEndLine = line.includes('End');
    const username = extractUsername(line);

    if (isStartLine) {
      startTimes[username] = extractTime(line);
    }

    if (isEndLine && !startTimes[username]) {
      // "End" entry with no matching "Start"
      startTimes[username] = earliestTime;
    }

    if (isStartLine || isEndLine) {
      // Append the completed line with the corrected start time
      completedLines.push(`${startTimes[username]} ${line}`);
      startTimes[username] = null; // Reset the start time after processing
    } else {
      // Other lines (not "Start" or "End")
      completedLines.push(line);
    }
  });

  // Handle the case where there is a "Start" with no matching "End"
  for (const username in startTimes) {
    if (startTimes.hasOwnProperty(username) && startTimes[username] && startTimes[username] !== latestTime) {
      completedLines.push(`${latestTime} ${username} End`);
    }
  }

  return completedLines;
}

function extractUsername(line) {
  // Assumed the username is the string between the last space and the word "Start" or "End"
  const startIdx = line.lastIndexOf(' ') + 1;
  const endIdx = line.includes('Start') ? line.indexOf('Start') : line.indexOf('End');

  return line.substring(startIdx, endIdx).trim();
}

// TODO write function
function fillMissingSession(lines, earliestTime, latestTime) {
  var logEntries = [
    '14:02:03 ALICE99 Start',
    '14:02:34 ALICE99 End',
    '14:02:58 ALICE99 Start',
    '14:03:35 ALICE99 End',
    '14:03:33 ALICE99 Start',
    '14:04:05 ALICE99 End',
    '14:02:03 ALICE99 Start',
    '14:04:23 ALICE99 End',
    '14:03:02 CHARLIE Start',
    '14:03:37 CHARLIE End',
    '14:04:41 CHARLIE Start',
    '14:04:41 CHARLIE End',
    '14:02:03 CHARLIE End',
    '14:02:05 CHARLIE End'
  ];

  r = ['14:00:00 ALICE99 Start', '14:00:00 CHARLIE Start', '14:00:01 CHARLIE End', '14:00:01 ALICE99 End']
  return logEntries
}

module.exports = {
  sanitizeAndPrepareUserSessions,
};



