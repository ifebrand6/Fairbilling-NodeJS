/**
 * @fileOverview ReportDataHandler Module
 * @module ReportDataHandler
 * @description
 * The `ReportDataHandler` module export functions that transforms data for
 * suitable for presentation.
 *
 */


// This function transforms the data into a format suitable for presentation on the terminal
function generateCLIReport(usersData) {
  try {
    if (!Array.isArray(usersData)) {
      throw new Error('Invalid input. Expected an array of user data.');
    }

    if (usersData.length === 0) {
      throw new Error('Invalid or empty data file.');
    }

    // Find maximum lengths for each column
    const maxLengths = {
      Name: 4, // Minimum length for "Name"
      Sessions: 8, // Minimum length for "Sessions"
      TotalTime: 8, // Minimum length for "TotalTime"
    };

    // Update maximum lengths based on actual data
    usersData.forEach(user => {
      maxLengths.Name = Math.max(maxLengths.Name, user.name.length);
      maxLengths.Sessions = Math.max(maxLengths['Sessions'], String(user.sessionCount).length);
      maxLengths.TotalTime = Math.max(maxLengths.TotalTime, String(formatTotalTime(user.duration)).length);
    });

    // Print table header
    console.log(padRight('Name', maxLengths.Name) + '  ' +
      padRight('Sessions', maxLengths.Sessions) + '  ' +
      padRight('TotalTime', maxLengths.TotalTime));

    // Print each row
    usersData.forEach(user => {
      console.log(padRight(user.name, maxLengths.Name) + '  ' +
        padRight(String(user.sessionCount), maxLengths['Sessions']) + '  ' +
        padRight(formatTotalTime(user.duration), maxLengths.TotalTime));
    });
  } catch (error) {
    console.error('Error displaying user data:', error.message);
  }
};

// Future enhancement: This function is designed to accommodate additional time format conversions.
function formatTotalTime(durationInSeconds) {
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
