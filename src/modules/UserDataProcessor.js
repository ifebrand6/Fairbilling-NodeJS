const dataSanitizer = require("./DataSanitizer");
var log =
  [{ name: 'CHARLIE', sessionCount: 4, duration: 400 }, { name: 'Alice', sessionCount: 8, duration: 60 }];

function computeData(file) {
  const sanitizedData = dataSanitizer(file);
  const result = calculateUserSessionData(sanitizedData)
  return result
}


function calculateUserSessionData(dataEntries) {
  var userSessions = {};

  // Function to convert HH:mm:ss to total seconds
  function convertToSeconds(time) {
    var timeComponents = time.split(':').map(Number);
    return timeComponents[0] * 3600 + timeComponents[1] * 60 + timeComponents[2];
  }

  // Process each data entry
  for (var i = 0; i < dataEntries.length; i++) {
    var parts = dataEntries[i].split(' ');
    var time = parts[0];
    var username = parts[1];
    var action = parts[2];

    if (action === 'Start') {
      // Record start time and update ongoing sessions
      if (!userSessions[username]) {
        userSessions[username] = { sessions: [] };
      }
      userSessions[username].start = convertToSeconds(time);
    } else if (action === 'End' && userSessions[username] && userSessions[username].start !== undefined) {
      // Calculate session duration and update user session data
      var end = convertToSeconds(time);
      var duration = end - userSessions[username].start;

      // Update user session data
      userSessions[username].sessions.push({ duration: duration });
      userSessions[username].start = undefined;
    }
  }

  // Format output data
  var userData = Object.keys(userSessions).map(function (name) {
    var data = userSessions[name];
    return {
      name: name,
      sessionCount: data.sessions ? data.sessions.length : 0,
      duration: data.sessions ? data.sessions.reduce(function (total, session) {
        return total + session.duration;
      }, 0) : 0,
    };
  });

  return userData;
}
module.exports = computeData;
