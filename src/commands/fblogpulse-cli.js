const fileReader = require('../utils/FileReader');
const processLogData = require('../modules/UserDataProcessor');
const reportDataHandler = require('../modules/ReportDataHandler');

function flgblogplusCli(filePath) {
  fileReader(filePath)
    .then((fileContents) => {
      processedUsersSessionData = processLogData(fileContents)
      reportDataHandler.generateCLIReport(processedUsersSessionData)
    })
    .catch((error) => {
      console.error('Error during processing:', error.message);
    });
}

module.exports = flgblogplusCli;

