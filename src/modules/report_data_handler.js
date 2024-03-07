/**
 * @fileOverview ReportDataHandler Module
 * @module ReportDataHandler
 * @description
 * The `ReportDataHandler` module export functions that transforms data for
 * suitable for presentation.
 *
 */


// This function transforms the data into a format suitable for presentation on the terminal
function generateCLIReport(userData) {
  try {
    if (!Array.isArray(userData)) {
      throw new Error('Invalid input. Expected an array of user data.');
    }

    if (userData.length === 0) {
      console.log('No user data to display.');
      return;
    }

    // Find maximum lengths for each column
    const maxLengths = {
      Name: 4, // Minimum length for "Name"
      'Session Count': 12, // Minimum length for "Session Count"
      Duration: 8, // Minimum length for "Duration"
    };

    // Update maximum lengths based on actual data
    userData.forEach(user => {
      maxLengths.Name = Math.max(maxLengths.Name, user.name.length);
      maxLengths['Session Count'] = Math.max(maxLengths['Session Count'], String(user.sessionCount).length);
      maxLengths.Duration = Math.max(maxLengths.Duration, String(formatDuration(user.duration)).length);
    });

    // Print table header
    console.log(padRight('Name', maxLengths.Name) + '  ' +
      padRight('SessionCount', maxLengths['Session Count']) + '  ' +
      padRight('Duration', maxLengths.Duration));

    // Print each row
    userData.forEach(user => {
      console.log(padRight(user.name, maxLengths.Name) + '  ' +
        padRight(String(user.sessionCount), maxLengths['Session Count']) + '  ' +
        padRight(formatDuration(user.duration), maxLengths.Duration));
    });
  } catch (error) {
    console.error('Error displaying user data:', error.message);
  }
};

// Future enhancement: This function is designed to accommodate additional time format conversions.
function formatDuration(durationInSeconds) {
  return parseInt(durationInSeconds);
}
function padRight(str, length) {
  if (str.length >= length) {
    return str;
  }

  return str + ' '.repeat(length - str.length);
}

module.exports = {
  generateCLIReport,
};
