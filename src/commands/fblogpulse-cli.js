/**
 * @fileOverview flgblogplusCli Module
 * @module flgblogplusCli
 * @description
 * The `flgblogplusCli` module is a core service that reads and generate report of the content
 * of a specified log file. It exports a function, `flgblogplusCli`, which takes a file
 * path as input and returns a Promise that resolves with the users session report.
 *
 */

const fileReader = require('../utils/FileReader');
const processLogData = require('../modules/user_data_processor');
const reportDataHandler = require('../modules/report_data_handler');

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

