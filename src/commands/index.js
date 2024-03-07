/**
 * @fileOverview commands/index
 * @module processFileAndGenerateReport
 * @description
* The `processFileAndGenerateReport` function is analogous to flgblogplusCli, offering
 * the convenience of execution via 'node src/commands/index.js [filepath]'. This allows
 * users to run the functionality directly without the need to install the app as an npm package.
 *
 */

const readFile = require('../utils/file_reader');
const processLogData = require('../modules/user_data_processor');
const reportDataHandler = require('../modules/report_data_handler');

// Extract filePath from command line arguments
const filePath = process.argv[2];

function processFileAndGenerateReport(filePath) {
  readFile(filePath)
    .then((fileContents) => {
      processedUsersSessionData = processLogData(fileContents)
      reportDataHandler.generateCLIReport(processedUsersSessionData)
    })
    .catch((error) => {
      console.error('Error during processing:', error.message);
    });
}

if (!filePath) {

  console.error('Please provide the path to the file as a command line argument.');
} else {
  processFileAndGenerateReport(filePath);

}


